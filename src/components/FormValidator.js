const isNil = val => val == null;

const isPostCode = val => /^([a-z0-9]\s*){5,7}$/i.test(val);

const isEmpty = val => isNil(val) || val === "";

const isEmail = val => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val).toLowerCase());
};

const validationRules = {
  postcode: {
    check(val) {
      return isPostCode(val);
    },
    error:
      "Enter a valid postal code with 5 to 7 characters (spaces are allowed)."
  },
  email: {
    check(val) {
      return isEmail(val);
    },
    error: "Enter a valid email."
  },
  required: {
    check(val) {
      return !isEmpty(val) || val;
    },
    error: "This field is required."
  },
  checked: {
    check(val) {
      return val;
    },
    error: "Check this field"
  }
};

export default {
  props: {
    scheme: {
      type: Object,
      default: () => ({})
    },
    formModels: {
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
  // watch: Object.keys(this.formModels).reduce((acc, fieldName) => {
  //   acc[fieldName] = () => {
  //     this.scheme[fieldName].isDirty = true;
  //   };
  //   return acc;
  // }, {}),
  computed: {
    isValid() {
      return Object.values(this.fieldsValidationMap).every(
        field => field.isValid && field.isDirty
      );
    },
    fieldsValidationMap() {
      return Object.keys(this.formModels)
        .filter(({ checkIf }) => typeof checkIf === "undefined" || checkIf)
        .reduce((acc, fieldName) => {
          const inputScheme = this.scheme[fieldName];
          const inputValidations = inputScheme.validations;

          const invalidRules = inputValidations.filter(rule => {
            return !validationRules[rule].check(this.formModels[fieldName]);
          });

          const errors = invalidRules.map(rule => {
            return validationRules[rule].error;
          });

          const mapInput = {
            name: fieldName,
            isDirty: inputScheme.isDirty,
            isValid: invalidRules.length == 0,
            isInvalid: invalidRules.length > 0,
            isRequired: !!inputValidations.find(rule => rule == "required"),
            showErrors: inputScheme.isDirty && invalidRules.length > 0,
            errors: errors.length > 0 ? errors : undefined
          };

          acc[fieldName] = mapInput;
          return acc;
        }, {});
    },
    hasNoChanges() {
      // return isEqual(this.formModels, this.initData);
    }
  },
  methods: {
    scrollIntoView(id) {
      const el = document.getElementById(id);
      el && el.scrollIntoView();
      el && window.scrollBy(0, -50);
    },
    createInputSchemeFromFields() {
      return Object.keys(this.scheme)
        .reduce((acc, field, index) => {
          acc[index] = this.createInputScheme(field);
          return acc;
        }, [])
        .flat(2);
    },
    runValidation() {
      const invalidInputs = Object.values(this.fieldsValidationMap).filter(
        ({ isInvalid }) => {
          return isInvalid;
        }
      );
      const { 0: { name: firstEl } = {} } = invalidInputs;
      if (firstEl) {
        this.scrollIntoView(firstEl);
      }
    },
    isDirty(fieldName) {
      this.scheme[fieldName].isDirty = true;
    },
    validateAndSubmit() {
      this.beforeValidate(this.formModels);

      Object.keys(this.scheme).forEach(fieldName => {
        this.scheme[fieldName].isDirty = true;
      });
      if (!this.isValid) {
        this.runValidation();
        return;
      }
      // if (this.hasNoChanges) {
      //   return;
      // }
      return this.send(this.formModels);
    }
  },
  render() {
    return this.$scopedSlots.default({
      fieldsValidationMap: this.fieldsValidationMap,
      formModels: this.formModels,
      isValid: this.isValid,
      validateAndSubmit: this.validateAndSubmit,
      isDirty: this.isDirty
    });
  }
};
