import BaseAlert from "@/components/BaseAlert.vue";

export default {
  component: BaseAlert,
  title: "Alerts"
};

export const danger = () => ({
  components: { BaseAlert },
  template: `<base-alert type="danger">Hello alert</base-alert>`
});
export const success = () => ({
  components: { BaseAlert },
  template: `<base-alert type="success">Hello alert</base-alert>`
});
