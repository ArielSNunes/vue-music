<script>

import CompositionItem from "@/components/CompositionItem.vue"

export default {
  name: "MySongs",
  components: { CompositionItem },
  props: {
    songs: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div
    class="bg-white rounded border border-gray-200 relative flex flex-col"
  >
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">My Songs</span>
      <i
        class="fa fa-compact-disc float-right text-green-400text-2xl"
      ></i>
    </div>
    <div class="p-6">
      <!-- Composition Items -->
      <composition-item v-for="(song, index) in songs" :song="song" :key="song.docId" />
    </div>
  </div>
</template>

<style scoped>

</style>
