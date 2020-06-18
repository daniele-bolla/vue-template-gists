import BaseButton from "@/components/BaseButton.vue";

export default {
  component: BaseButton,
  title: "Buttons"
};

export const danger = () => ({
  components: { BaseButton },
  template: `<base-button type="danger">Hello button</base-button>`
});
export const success = () => ({
  components: { BaseButton },
  template: `<base-button type="success">Hello button</base-button>`
});
