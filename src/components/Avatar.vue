<template>
  <div class="avatar flex-center">
    <span class="text-white">
      {{ firstTwoCharcter }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  name: String,
  bgColor: {
    type: String,
    default: "#6d42d8",
  },
});
const firstTwoCharcter = computed(() => {
  let wordName = null;
  if (props.name) {
    const words = props.name.split(" ");
    wordName = words[0][0];
    if (words.length >= 2) {
      wordName = wordName + words[1][0];
    }
    return wordName;
  }
});
</script>
<style scoped>
.avatar {
  background-color: v-bind("bgColor");
  min-width: 2.5rem;
  min-height: 2.5rem;
  max-width: 2.5rem;
  max-height: 2.5rem;
  border-radius: 3rem;
  font-weight: 600;
}
@media screen and (max-width: 1024px) {
  .avatar {
    min-width:2rem;
    min-height:2rem;
    max-width:2rem;
    max-height:2rem;
    border-radius: 1rem !important;
    font-weight: 600;
  }
}
</style>
