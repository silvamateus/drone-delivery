<template>
  <div class="home">
    <search-filter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchFilter from "@/components/SearchFilter.vue";
@Component({
  components: {
    SearchFilter,
  },
})
export default class Home extends Vue {}
</script>
