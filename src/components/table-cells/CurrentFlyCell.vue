<template>
  <div @mouseenter="showDirections()" @mouseleave="hideDirections()" class="direction-container">
    <div v-if="statusInHalt()" class="halt"></div>
    <div v-else class="flying" :class="{ 'flying-back': isFlyingBack() }">
      <span class="progress" :style="{ left: `calc(${flyingProgress()}% - 10px)` }"></span>
      <transition name="fade">
        <div
          v-if="showDirection"
          class="fly-progress-message"
          :class="{ 'flying-back': isFlyingBack() }"
          :style="{ left: `calc(${flyingProgress()}% - 50px)` }"
        >
          <span>{{ flyDirection }} {{ flyingProgress() }}%</span>
        </div>
      </transition>
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
  showDirection = false;

  statusInHalt(): boolean {
    return this.halt.includes(this.status);
  }
  isFlyingBack(): boolean {
    return this.fly > 50;
  }
  flyingProgress(): number {
    const progress = ((this.fly % 51) / 50) * 100;
    return progress;
  }

  showDirections(): void {
    this.showDirection = true;
  }
  hideDirections(): void {
    this.showDirection = false;
  }

  get flyDirection(): string {
    return this.fly > 50 ? "coming" : "going";
  }
}
</script>

<style scoped>
.direction-container {
  position: relative;
}
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

.fly-progress-message {
  background-color: #acc4d4cc;
  position: absolute;
  top: -25px;
  border-radius: 1rem;
  padding: 0 0.5rem;
  font-size: 0.7rem;
}
.fly-progress-message::before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  border-style: solid;
  border-width: 5px 3.5px 0 3.5px;
  border-color: #acc4d4cc transparent transparent transparent;
  bottom: -4px;
  left: 45%;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
