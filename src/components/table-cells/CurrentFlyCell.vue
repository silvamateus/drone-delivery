<template>
  <div>
    <div v-if="statusInHalt()" class="halt"></div>
    <div v-else class="flying" :class="{ 'flying-back': isFlyingBack() }">
      <span class="progress" :style="{ left: `calc(${flyingProgress()}% - 15px)` }"></span>
    </div>
    <div v-if="showDirection">
      <span>{{ flyDirection }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() fly!: number;
  @Prop() status!: string;

  halt: string[] = ["offline", "charging", "repair"];
  progress = 0;
  showDirection = false;

  statusInHalt(): boolean {
    return this.halt.includes(this.status);
  }
  isFlyingBack(): boolean {
    return this.fly > 50;
  }
  flyingProgress(): number {
    this.progress = ((this.fly % 50) / 50) * 100;
    return this.progress;
  }

  get flyDirection(): string {
    return this.fly > 50 ? "coming" : "going";
  }
}
</script>

<style scoped>
.halt {
  position: relative;
  width: 100%;
}
.halt::before {
  content: "";
  position: absolute;
  width: 100%;
  border-bottom: 2px dashed black;
  top: 23px;
  left: 0;
  right: 0;
  bottom: 0;
}

.flying {
  position: relative;
  width: 100%;
  border-bottom: 2px solid black;
  top: 20px;
}
.flying::after {
  height: 0;
  width: 0;
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 5px 0 5px 8px;
  border-color: transparent transparent transparent black;
  top: -4px;
  right: -3px;
}

.flying-back {
  transform: rotateY(180deg);
}

.progress {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 2px solid black;
  background-color: white;
  top: -4px;
}
</style>
