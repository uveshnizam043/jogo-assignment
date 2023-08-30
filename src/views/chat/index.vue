<template>
  <div id="mySidenav" class="sidenav">
    <div class="closebtn priamry-grey cursor-pointer" @click="closeNav()">
      &times;
    </div>
    <ChatSidebar
      @logout="checkUserList"
      @closeNav="closeNav()"
      :mobilSidebar="true"
    />
  </div>

  <div>
    <div class="d-flex overflow-hidden h-100vh">
      <div class="desktop-sidebar">
        <ChatSidebar @logout="checkUserList" />
      </div>
      <div class="chat-container">
        <main class="h-100vh">
          <div class="top-header">
            <div class="flex-center">
              <span class="menu-bar" @click="openNav()">&#9776; </span>
              <Avatar
                :name="store.activeUser?.name"
                :bgColor="store.activeUser?.color"
              />
              <div class="avatar-name flex-center">
                {{ store.activeUser?.name }}
              </div>
            </div>
            <div class="d-flex desktop-filter flex-center">
              <div
                v-for="(fitler, index) in filters"
                :key="index"
                :class="{
                  'bg-primary  text-white': activeFilter == fitler.value,
                }"
                @click="updateFilter(fitler.value)"
                class="desktop-filter-btn text-black font-500 text-12 flex-center outline-none border-none"
              >
                {{ fitler.text }}
              </div>
            </div>
            <div class="mobile-filter" style="">
              <select
                @click="updateFilter(activeFilter)"
                selected
                v-model="activeFilter"
              >
                <option
                  v-for="(fitler, index) in filters"
                  :key="index"
                  selected
                  :value="fitler.value"
                >
                  {{ fitler.text }}
                </option>
              </select>
            </div>
          </div>

          <div class="chat-contatiner">
            <div v-for="(msg, index) in store.messageList" :key="index">
              <div
                v-if="msg.user_id != store.activeUser._id"
                style="margin-bottom: 2rem"
              >
                <ChatMessage
                  :msgContent="msg.msgContent"
                  :dateTime="msg.dateTime"
                  :userName="msg.userName"
                />
              </div>
              <div
                v-else
                class="active-user-chat"
                :class="{
                  'active-user-padding': store.messageList.length == index + 1,
                }"
              >
                <ActiveUserChat
                  :msgContent="msg.msgContent"
                  :userName="msg.userName"
                  :show-time="
                    store.messageList.length == index + 1 ? true : false
                  "
                />
              </div>
            </div>
          </div>

          <div
            class="d-flex justify-center align-center bg-white"
            style="position: sticky; bottom: 0; padding: 1rem"
          >
            <input
              type="text"
              @keyup.enter="addMessage"
              id="MsgInput"
              class="msg-input outline-none w-100 border-none"
              v-model="message"
              placeholder="Write a message..."
            />

            <button
              class="cursor-pointer btn-send bg-primary-gradient"
              @click="addMessage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill=""
              >
                <g clip-path="url(#clip0_9_46)">
                  <path
                    d="M2.64994 11.5255C2.56116 11.5551 2.48245 11.609 2.42279 11.6811C2.36313 11.7532 2.32489 11.8406 2.31244 11.9334C2.29999 12.0261 2.31382 12.1205 2.35236 12.2058C2.3909 12.2911 2.4526 12.3638 2.53044 12.4158L6.95198 14.8532C7.03439 14.8986 7.12794 14.9198 7.22188 14.9144C7.31582 14.9091 7.40633 14.8773 7.48302 14.8228L12.1803 11.4732C12.4073 11.3212 12.6788 11.5927 12.5268 11.8197L9.17724 16.517C9.12272 16.5937 9.09095 16.6842 9.08557 16.7781C9.08019 16.8721 9.10143 16.9656 9.14684 17.048L11.5842 21.4696C11.6362 21.5474 11.7089 21.6091 11.7942 21.6476C11.8795 21.6862 11.9739 21.7 12.0666 21.6876C12.1594 21.6751 12.2468 21.6369 12.3189 21.5772C12.391 21.5175 12.4449 21.4388 12.4745 21.3501L17.0707 7.56148C17.0999 7.47343 17.1041 7.37899 17.0828 7.28871C17.0614 7.19843 17.0153 7.11586 16.9497 7.05026C16.8841 6.98466 16.8016 6.93861 16.7113 6.91725C16.621 6.89589 16.5266 6.90007 16.4385 6.92932L2.64994 11.5255Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9_46">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.686279 12) rotate(-45)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatSidebar from "./ChatSidebar.vue";
import { ref, onMounted, computed, watch } from "vue";
import Avatar from "../../components/Avatar.vue";
import ChatMessage from "./ChatMessage.vue";
import ActiveUserChat from "./ActiveUserChat.vue";
import moment from "moment";
import { usersStore } from "../../stores/users";
import router from "../../router/index";

import { useRoute } from "vue-router";
const route = useRoute();

const store = usersStore();
onMounted(() => {
  users.value = store.getUsers;
  //  navigate to login page if there is no users
  checkUserList();
  //updating active users
  if (users.value.length) {
    const index = users.value.findIndex(
      (ele, index) => ele._id == Number(route.query?.user)
    );
    store.updateActiveUser(users.value[index]);
  }
});
const checkUserList = () => {
  if (!users.value.length) {
    router.push({
      name: "home",
    });
  }
};

const message = ref(null);
const filters = ref([
  {
    text: "All",
    value: "all",
  },
  {
    text: "Today",
    value: "today",
  },
  {
    text: "Last 7 Days",
    value: "last_7_days",
  },
]);
const activeUser = ref(null);
const activeFilter = ref("all");
const users = ref([]);

const updateActiveUser = (user) => {
  store.updateActiveUser({ name: user.name, _id: user._id });
};

const updateFilter = (value) => {
  activeFilter.value = value;
  store.filterMessage(activeFilter.value);
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
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
</script>

<style scoped>
.avatar-name {
  color: #161616;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 1rem;
  line-height: normal;
}
.chat-contatiner {
  padding: 2.5rem 1.313rem 0 1.313rem;
  overflow-y: scroll;
  max-height: calc(100vh - 200px);
  min-height: calc(100vh - 200px);
}
.active-user-chat {
  flex-direction: column;
  display: inline-flex;
  align-items: end;
  width: 100%;
}
.mobile-filter {
  margin-top: 0.4rem !important;
}
.msg-input {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.btn-send {
  border: none;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  display: inline;
}
.desktop-filter-btn {
  min-width: 80px;
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}
.sidenav {
  height: 100vh;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #fafafa;
  overflow-x: hidden;
  transition: 0.5s;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}
.menu-bar {
  font-size: 1rem;
  margin-right: 10px;
  cursor: pointer;
}
.sidenav a:hover {
  color: #f1f1f1;
}
.desktop-filter {
  border-radius: 6px;
  background: #f9f9f9;
}
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
.top-header {
  padding: 2.5rem 1.313rem;
  display: flex;
  justify-content: space-between;
}

option:checked,
option:hover {
  background-color: rgb(255, 255, 255);
}
option {
  background-color: rgb(255, 255, 255);
}
select:focus > option:checked {
  background: #e3e3e3 !important;
}
.desktop-sidebar {
  min-width: 25%;
  max-width: 25%;
  border-right: 1px solid rgb(230, 230, 230);
}
.active-user-padding {
  padding: 0 0 2.5rem 0;
}

@media screen and (min-width: 1024px) {
  .menu-bar {
    display: none;
  }
}
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
@media screen and (min-width: 768px) {
  .mobile-filter {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .desktop-filter {
    display: none;
  }
  .top-header {
    padding: 1rem 1.313rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .chat-contatiner {
    padding: 0.5rem 1.313rem 0 1.313rem;
    min-height: calc(100vh - 135px);
  }
  .msg-input {
    padding: 0;
  }
  .active-user-padding {
    padding: 0 0 0.5rem 0;
  }
}
@media screen and (max-width: 1024px) {
  .desktop-sidebar {
    width: 100%;
    display: none;
  }
  .chat-container {
    min-width: 100% !important;
  }
  .btn-send {
    margin-left: 0.4rem !important;
    padding: 0.4rem !important;
  }
  .btn-send svg {
    width: 20px !important;
    height: 20px !important;
  }
}
.chat-container {
  min-width: 75%;
  max-width: 75%;
}

select {
  appearance: none;
  border: 0;
  outline: 0;
  background-color: #ededed;
  font: inherit;
  /* font-size: 0.2rem; */
  padding: 0.5em 0.7em;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  font-size: 0.8rem;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  cursor: pointer;
}
select:focus {
  outline: none;
}
select option {
  font-size: 0.7rem;
  color: inherit;
  outline: none;
}

::-webkit-input-placeholder {
  color: grey;
}

:-ms-input-placeholder {
  color: grey;
}

::placeholder {
  color: #b0bfca;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
}
</style>
