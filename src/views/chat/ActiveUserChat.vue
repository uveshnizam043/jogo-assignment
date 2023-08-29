<template>
  <div class="bg-white text-white active-user-chat" style="">
    <div class="priamry-font text-14 font-500">
      {{ msgContent }}
    </div>
  </div>
  <div class="priamry-grey priamry-font msg-time__text" v-if="showTime">
    <span>{{ time }} </span>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue";
import moment from "moment";
const props = defineProps({
  msgContent: String,
  userName: String,
  showTime: Boolean,
  dateTime1: {
    type: String,
    default: "",
  },
});
const time = computed(() => {
  return moment(props.dateTime1.value).format("hh:mm A");
});
</script>

<style scoped>
.active-user-chat {
  display: inline-flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 0px 8px 8px 8px;
  color: white;
  border: 1px solid #e5ebef;
  background: #6d42d8;
}
</style>
