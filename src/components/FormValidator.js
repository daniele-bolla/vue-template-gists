const parseValidations = fields => {
  return Object.keys(fields).reduce((validations, field) => {
    validations[field] = parseValidationRules(fields[field]);
    if (fields[field].each) {
      validations[field].$each = parseValidations(fields[field].each);
    }
    return validations;
  }, {});
};
const parseValidationRules = field => {
  return field.rules
    .filter(({ async }) => !async)
    .reduce((rules, rule) => {
      rules[rule.name] = rule.fun;
      return rules;
    }, {});
};

const parseErrorMessages = fields => {
  return Object.keys(fields).reduce((errorMessages, field) => {
    if (fields[field].each) {
      const eachErrors = Object.keys(fields[field].each).reduce(
        (subErrors, eachField) => {
          subErrors[eachField] = parseFieldErrors(
            fields[field].each[eachField]
          );
          return subErrors;
        },
        {}
      );
      errorMessages = { ...errorMessages, ...eachErrors };
    }
    errorMessages[field] = parseFieldErrors(fields[field]);
    return errorMessages;
  }, {});
};

const parseFieldErrors = field => {
  return field.rules.reduce((fieldErrors, rule) => {
    fieldErrors[rule.name] = rule.error;
    return fieldErrors;
  }, {});
};

import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

export default {
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    beforeValidate: {
      type: Function,
      default: () => function() {}
    },
    send: {
      type: Function,
      default: () => function() {}
    }
  },
  data() {
    return {
      initData: cloneDeep(this.formData),
      inputsScheme: [],
      serverErrors: {}
    };
  },
  validations() {
    return { formData: parseValidations(this.fields) };
  },
  computed: {
    errorMessages() {
      return parseErrorMessages(this.fields);
    },
    formErrors() {
      return Object.keys(this.fields).reduce((errors, fieldName) => {
        if (this.fields[fieldName].each) {
          const eachErrors = Object.keys(this.fields[fieldName].each).reduce(
            (eachErrors, eachFieldName) => {
              eachErrors[fieldName] = this.validationErrors(
                fieldName,
                eachFieldName
              );
              return eachErrors;
            },
            {}
          );
          errors = { ...errors, ...eachErrors };
        }
        errors[fieldName] = this.validationErrors(fieldName);
        return errors;
      }, {});
    },
    isValid() {
      return !Object.keys(this.formErrors).some(field =>
        Object.keys(this.formErrors[field]).some(
          error => this.formErrors[field][error].length
        )
      );
    },
    hasNoChanges() {
      return isEqual(this.formData, this.initData);
    }
  },
  methods: {
    scrollIntoView(id) {
      const el = document.getElementById(id);
      el && el.scrollIntoView();
      el && window.scrollBy(0, -50);
    },
    createInputScheme(fieldName) {
      const field = this.fields[fieldName];
      const input = this.$v.formData[fieldName];
      const each = input.$each;
      const inputScheme = [
        {
          input: input,
          checkIf: field.checkIf ? field.checkIf() : undefined,
          el: fieldName
        }
      ];
      if (each) {
        const eachInputsScheme = input.$model.reduce(
          (acc, eachModel, eachIndex) => {
            acc[eachIndex] = Object.keys(field.each).map(eachField => {
              const subModel = input.$each[eachIndex];
              const subInput = subModel[eachField];
              return {
                input: subInput,
                el: `${eachField}-${eachIndex}`
              };
            });
            return acc;
          },
          []
        );

        return [...eachInputsScheme, ...inputScheme];
      }
      return inputScheme;
    },
    createInputSchemeFromFields() {
      return Object.keys(this.fields)
        .reduce((acc, field, index) => {
          acc[index] = this.createInputScheme(field);
          return acc;
        }, [])
        .flat(2);
    },
    createEachErrors(fieldName, subFieldName, index) {
      const model = this.$v.formData[fieldName].$each[index];
      if (!this.$v.formData[fieldName].$each[index]) {
        return [];
      }
      const subInput = this.$v.formData[fieldName].$each[index][subFieldName];
      const fieldErrors = this.errorMessages[subFieldName];
      const errors = [];
      if (subInput.$dirty && !subInput.$pending) {
        Object.keys(fieldErrors).forEach(name => {
          !subInput[name] && errors.push(fieldErrors[name]);
        });
      }
      return errors;
    },
    clientErrors(fieldName, eachFieldName) {
      const fieldValidation = this.$v.formData[fieldName];
      if (!fieldValidation) return [];
      const fieldErrors = this.errorMessages[fieldName];
      const errors = [];
      if (eachFieldName) {
        const eachFields = fieldValidation.$each.$iter;
        Object.keys(eachFields).forEach(eachField => {
          !fieldValidation.$each[eachField][name] &&
            errors.push(fieldErrors[name]);
        });
      }
      if (fieldValidation.$dirty) {
        Object.keys(fieldErrors).forEach(name => {
          !fieldValidation[name] &&
            fieldValidation[name] !== undefined &&
            errors.push(fieldErrors[name]);
        });
      }
      return errors;
    },
    validationErrors(fieldName, eachFieldName = null) {
      return {
        sse: this.getServerErrors(fieldName),
        cse: this.clientErrors(fieldName, eachFieldName)
      };
    },
    getServerErrors(fieldName) {
      return this.serverErrors[fieldName] || [];
    },
    validateInputRule(input, validationName) {
      const value = this.formData[input];
      const errorMessage = this.errorMessages[input][validationName];
      const rule = this.fields[input].rules.find(
        ({ name }) => name == validationName
      );
      this.$v.formData[input].$touch();
      if (!this.$v.formData[input].$error && rule) {
        this.$set(this.serverErrors, input, ["Checking..."]);
        const runAsyncRule = () => {
          rule
            .fun(value)
            .then(() => {
              this.$set(this.serverErrors, input, []);
            })
            .catch(() => {
              this.$set(this.serverErrors, input, [errorMessage]);
            });
        };
        setTimeout(runAsyncRule, 2000);
      }
    },
    formatField(field) {
      const format = this.fields[field].format;
      this.formData[field] = format(this.formData[field]);
    },
    runValidation(inputsScheme) {
      const inputToCheck = inputsScheme.filter(
        ({ checkIf }) => typeof checkIf === "undefined" || checkIf
      );
      const invalidInputs = inputToCheck.filter(({ input }) => {
        input.$touch();
        return input.$error || input.$pending;
      });
      const { 0: { el: firstEl } = {}, length } = invalidInputs;
      if (firstEl) {
        this.scrollIntoView(firstEl);
        console.log(firstEl);
      }
      return length == 0;
    },
    validate() {
      const inputScheme = this.createInputSchemeFromFields();
      return this.runValidation(inputScheme);
    },
    submit() {
      this.beforeValidate(this.formData);
      if (!this.validate()) {
        return;
      }
      if (!this.isValid) {
        return;
      }
      if (this.hasNoChanges) {
        return;
      }
      if (!this.validate() || !this.isValid || this.hasNoChanges) {
        return;
      }
      return this.send(this.formData);
    }
  },
  render() {
    return this.$scopedSlots.default({
      formData: this.formData,
      formErrors: this.formErrors,
      validateInputRule: this.validateInputRule,
      formatField: this.formatField,
      createEachErrors: this.createEachErrors,
      isValid: this.isValid,
      submit: this.submit
    });
  }
};
