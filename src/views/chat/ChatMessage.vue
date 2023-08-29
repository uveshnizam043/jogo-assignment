<template>
  <div class="bg-white chat-text">
    <div class="priamry-black font-level-1">
      {{ msgContent }}
    </div>
  </div>
  <div class="priamry-grey priamry-font msg-time__text">
    <span>{{ userName }} </span> -
    <span>{{ time }} </span>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import moment from "moment";
const props = defineProps({
  msgContent: String,
  userName: String,
  dateTime: String,
});

const time = computed(() => {
  if (props.dateTime) {
    return moment(props.dateTime).format("hh:mm A");
  }
});
</script>

<style scoped>
.chat-text {
  display: inline-flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 0px 8px 8px 8px;
  border: 1px solid #e5ebef;
  background: #fbfbfd;  
}
</style>
