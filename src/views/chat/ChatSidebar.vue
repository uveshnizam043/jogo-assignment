<template>
  <div class="s-layout__sidebar sidebar">
    <nav class="s-sidebar__nav sidenav">
      <div class="chat-text priamry-black font-500">Chat</div>

      <!-- <div> -->
      <div class="priamry-black text-18 font-500 user-text">Users</div>
      <div class="users-list">
        <div
          v-for="(user, index) of users"
          @click="updateActiveUser(user)"
          :key="index"
          class="users cursor-pointer"
          :class="{ 'bg-active': store.activeUser?._id == user?._id }"
        >
          <Avatar :name="user.name" :bgColor="user.color" />
          <div
            style="
              padding-left: 1rem;
              color: #161616;

              font-size: 16px;
              font-style: normal;
              font-weight: 600;

              line-height: normal;
            "
            class="avatar-name flex-center"
          >
            {{ user.name }}
          </div>
        </div>
      </div>
      <!-- </div> -->
      <div
        style="
          position: sticky;
          background-color: white;
          padding-left: 2.5rem;
          bottom: 0px;
          padding-bottom: 10px;
        "
      >
        <div
          class="flex- bg-white text-primary logout-btn"
          @click="logoutUser(store.activeUser._id)"
          style="
            background-color: transparent;
            display: inline-flex;
            align-items: center;
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            fill="#6D42D8"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
            />
          </svg>
          <div style="margin-left: 0.5rem">Log Out</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Avatar from "../../components/Avatar.vue";
import moment from "moment";
import { usersStore } from "../../stores/users";
import router from "../../router/index";
// import io from "socket.io-client";
import socket from "../../socket";

import { useRoute } from "vue-router";
const route = useRoute();
const store = usersStore();
const emit = defineEmits(["closeNav", "logout"]);
const props = defineProps({
  mobilSidebar: Boolean,
});

// state
const message = ref(null);
const activeFilter = ref("");
// computed property
const users = computed(() => {
  if (store.getUsers.length) {
    const users = [...store.getUsers];
    return users;
  } else {
    return [];
  }
});
//hooks
onMounted(() => {
  users.value.length &&
    users.value.filter((ele) => {
      if (ele._id == Number(route.query?.user)) {
        store.updateActiveUser(ele);
      }
    });
  if (!users.value) {
    router.push({
      name: "home",
    });
  }

  socket.on("logout_user", async (id) => {
    store.logoutById(id);
    if (!store.users.length) {
      location.reload();
      router.push({
        name: "home",
      });
    }
  });
  
});

//methods
const logoutUser = async (id) => {
  await socket.emit("logout_user", id);
  store.logoutById(store.activeUser._id);
  emit("logout");
  if (!store.users.length) {
    location.reload();
  }
};

const updateActiveUser = (user) => {
  store.updateActiveUser(user);
  if (props.mobilSidebar) {
    emit("closeNav");
  }
};

const changeFilter = (value) => {
  activeFilter.value = value;
};
const addMessage = () => {
  if (message.value) {
    const message1 = {
      msgContent: message.value,
      dateTime: moment().format("YYYY-MM-DD hh:mm A"),
      user_id: store.activeUser?._id,
      userName: store.activeUser?.name,
    };
    store.addMsg(message1);
    message.value = null;
  }
};
</script>
<style scoped>
.bg-active {
  background-color: #f3f2f1;
}
.logout-btn {
  color: #6d42d8;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 0.5rem;
}
.logout-btn:hover {
  background-color: rgb(221, 220, 220) !important;
}
.users {
  padding: 5px 10px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  padding-left: 2.5rem;
}
.users:hover {
  background-color: #f3f2f1;
}

@media screen and (max-width: 1024px) {
  .user-text {
    padding: 1rem 0 1rem 2.5rem !important;
    line-height: normal;
  }
  .chat-text {
    padding-left: 2.5rem;
    font-size: 1.5rem !important;
    padding-top: 2.5rem !important;
    font-size: 2.25rem;
  }

  .users-list {
    overflow-x: hidden !important;
    overflow: scroll;
    height: 75vh !important;
  }
}
.chat-text {
  padding-left: 2.5rem;
  font-size: 2rem;
  padding-top: 40px;
  font-size: 36px;
}

.users-list {
  overflow-x: hidden !important;
  overflow: scroll;
  height: 80vh;
}
.users-list::-webkit-scrollbar {
  width: 2px;
}
.user-text {
  padding: 1.5rem 0 1.5rem 2.5rem;
  line-height: normal;
}
</style>
