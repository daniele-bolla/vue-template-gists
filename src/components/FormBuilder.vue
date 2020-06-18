<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>User Details</h4>
    </div>
    <form class="panel-body">
      <div
        v-for="field in fields"
        :id="field.name"
        :key="field.name"
        class="form-group row"
      >
        <label :for="field.name" class="col-sm-4 col-form-label">{{
          field.label
        }}</label>
        <div class="col-sm-8">
          <component
            :is="loadComponent(field.type)"
            :id="field.name"
            v-model="formData[field.name]"
            values="formData[field.name]"
            type="text"
            :name="field.name"
            :errors="createErrorsField(field)"
            v-bind="{ ...field.options.attrs }"
          />
          <pre>{{ formData[field.name] }}</pre>
        </div>
      </div>
      <ajax-button :classes="'btn btn-primary btn-lg'" :request="sendForm">
        <i class="fas fa-edit"></i> Submit
      </ajax-button>
    </form>
  </div>
</template>

<script>
const createVuelidation = scheme => {
  return scheme.reduce((acc, field) => {
    acc[field.name] = field.validations.reduce((acc, validation) => {
      acc[validation.name] = validation.fun;
      return acc;
    }, {});
    return acc;
  }, {});
};

const switchcase = (cases, key) => (key in cases ? cases[key] : null);
const mapComponentbyType = {
  text: "BaseInput",
  file: "BaseFileInput",
  list: "BaseSelect"
};

export default {
  // components: {
  //   EqInput,
  //   EqSelect,
  //   AjaxButton
  // },
  // mixins: [validation],
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    url: {
      type: String,
      default: () => ""
    },
    method: {
      type: String,
      default: () => ""
    }
  },
  validations() {
    return { formData: createVuelidation(this.fields) };
  },
  methods: {
    validate() {
      const inputsSchemeFromVuelidation = Object.keys(
        this.$v.formData.$params
      ).map(key => ({
        input: this.$v.formData[key],
        el: key
      }));
      return this.runValidation(inputsSchemeFromVuelidation);
    },
    loadComponent(key) {
      return switchcase(mapComponentbyType, key);
    },
    createErrorsField(field) {
      const errors = [];
      if (this.$v.formData[field.name].$dirty) {
        field.validations.forEach(({ name, error }) => {
          !this.$v.formData[field.name][name] && errors.push(error);
        });
      }
      return {
        sse: this.serverErrors(this.$data.$s, field.name),
        cse: errors
      };
    },
    async onSubmit() {
      try {
        const { data } = await axios[this.method](this.url, this.formData);
        this.$flash.success(data, "Profile update successful");
      } catch (error) {
        this.$flash.error(error, "Profile update failed");
      } finally {
        this.submittingPassword = false;
      }
    },
    sendForm() {
      const isValid = this.validate();
      if (isValid) {
        return this.onSubmit();
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
