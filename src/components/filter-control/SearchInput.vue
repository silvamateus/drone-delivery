<template>
  <b-form-group
    :id="`field-${label}`"
    :label="label"
    :label-for="`search-label-${label}`"
    label-size="sm"
    label-align="left"
  >
    <b-form-input
      :id="`search-label-${label}`"
      :value="value"
      @input="updateValue($event)"
    ></b-form-input>
  </b-form-group>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() private value!: string;
  @Prop() private label!: string;

  @Emit("input")
  updateValue(e: string): string {
    return e;
  }
}
</script>

<style scoped></style>
