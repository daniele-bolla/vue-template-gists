const isNil = val => val == null;

const isPostCode = val => /^([a-z0-9]\s*){5,7}$/i.test(val);

const isEmpty = val => isNil(val) || val === "";

const validationRules = {
  isPostCode: {
    check(val) {
      return isPostCode(val);
    },
    error:
      "Enter a valid postal code with 5 to 7 characters (spaces are allowed)."
  },
  required: {
    check(val) {
      return !isEmpty(val);
    },
    error: "This field is required."
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
    onSubmit: {
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
      return Object.keys(this.formModels).reduce((acc, fieldName) => {
        const inputScheme = this.scheme[fieldName];
        const inputValidations = inputScheme.validations;

        const invalidRules = inputValidations.filter(rule => {
          return !validationRules[rule].check(this.formModels[fieldName]);
        });

        const errors = invalidRules.map(rule => {
          return validationRules[rule].error;
        });

        const mapInput = {
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
    isDirty(fieldName) {
      this.scheme[fieldName].isDirty = true;
    },
    submit() {
      this.beforeValidate(this.formModels);
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
