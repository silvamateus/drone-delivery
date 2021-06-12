<template>
  <b-form-group
    :id="`select-${label}`"
    :label="label"
    :label-for="`select-${label}`"
    label-size="sm"
    label-align="left"
  >
    <b-form-select
      value="value"
      @submit="updateSelect($event)"
      :id="`select-${label}`"
      :options="options"
    ></b-form-select>
  </b-form-group>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() value!: string;
  @Prop() label!: string;
  @Prop() options!: string[];

  @Emit("input")
  updateSelect(e: string): string {
    return e;
  }
}
</script>

<style scoped></style>
