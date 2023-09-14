<template>
  <div class="container flex-center" style="min-height: 100vh">
    <div>
      <div class="logo font-700 secondary-text__color flex-center">
        <span class="dot bg-primary"></span>
        <div class="logo-heading secondary-text__color">
          <img
            style="width: 100px"
            src="https://jobgo.com/wp-content/uploads/2022/11/JOBGO-email-logo-1.png"
          />
        </div>
      </div>
      <div class="login-box">
        <div class="flex-center flex-column">
          <div class="text-center font-600 heading secondary-text__color">
            Log in
          </div>
          <div class="w-100 flex-1 input-box">
            <div>
              <label class="label font-500" for="username"> User name </label>
            </div>
            <input
              @keyup.enter="logIn"
              class="text-input w-100 bg-white"
              type="text"
              width="80%"
              name=""
              id="username"
              v-model.trim="name"
            />
            <button
              @click="logIn"
              class="w-100 btn text-white btn-text font-600 text-15"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usersStore } from "../../stores/users";
import router from "../../router/index";
const store = usersStore();
import socket from "../../socket";

// state
const name = ref(null);

//hooks
onMounted(() => {
  socket.on("user_join", async (users) => {
    store.addUser(users);
    await router.push({
      name: "chat",
      query: {
        user: store.users.length,
      },
    });
    // await socket.emit("updateMessage");
  });
  socket.on("updateUsers", (user) => {
    store.addUser(user);
  });
  // socket.on("updateMessage", (messageList) => {
  //   store.updateMessgeList(messageList);
  // });
});
// methods
const logIn = async () => {
  if (name.value) {
    socket.emit("user_join", name.value);
    name.value = null;
  }
};
</script>
<style scoped>
.container {
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0px 9px 24px 0px rgba(0, 0, 0, 0.18);
}

.login-box {
  border-radius: 0.875rem;
  width: 586px;
  height: 335px;
  padding: 2rem;
  box-shadow: 0px 9px 24px 0px rgba(0, 0, 0, 0.18);
}
.text-white {
  color: white;
}
.label {
  color: #969ab8;
  font-size: 0.875rem;
  letter-spacing: 0.1px;
}

.text-center {
  text-align: center;
}
.logo {
  /* font-size: 2.414rem; */
  margin-bottom: 4rem;
  /* font-size: 2.414px; */
}
.heading {
  /* color: #171725; */
  font-size: 30px;
  margin-top: 2rem;
  letter-spacing: 0.1px;
}
/* .btn-text {
  color: #fff;

  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.1px;
} */
.dot {
  height: 28.34px;
  width: 28.34px;
  padding-left: 8px;
  border-radius: 50%;
  display: inline-block;
}

.logo-heading {
  font-size: 2.414rem;
  margin-left: 1rem;
}
.input-box {
  padding: 0 3rem;
}
.text-input {
  margin-top: 0.5rem;
  padding: 0.6rem;
  /* padding: 0.9rem; */
  outline: none;
  background-color: white;
  border: 1.604px solid #e0e2e9;
  border-radius: 0.6rem;
  font-size: 1rem;
  transition: box-shadow 0.3s ease;
}

.btn {
  background-color: #6d42d8;
  outline: none;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  padding: 0.8rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  cursor: pointer;
}
@media screen and (max-width: 1024px) {
  .login-box {
    width: auto;
  }
  .btn {
    border: none;
    padding: 0.4rem;
    border-radius: 0.2rem;
  }
  .input-box {
    padding: 0;
  }
}
@media screen and (max-width: 768px) {
  .heading {
    margin-top: 1rem;
  }
  .text-input {
    margin-top: 0.5rem;
    padding: 0.4rem;
    border-radius: 0.3rem;
  }
}
</style>
