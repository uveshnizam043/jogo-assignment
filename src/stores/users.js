import { defineStore } from "pinia";
import moment from "moment";

export const usersStore = defineStore("users", {
  state: () => ({
    users: [],
    login: false,
    activeUser: null,
    backMesageList: [],
    messageList: [],
  }),
  getters: {
    getUsers: (state) => state.users,
    isLogin: (state) => state.login,
  },
  actions: {
    addUser(userList) {
      this.users = [...userList];
    },
    addMsg(msg) {
      this.backMesageList.push(msg);
      this.messageList.push(msg);
    },
    updateActiveUser(user) {
      this.activeUser = user;
    },
    logout1() {
      const index = this.users.findIndex(
        (ele, index) => ele._id == this.activeUser._id
      );
      this.users.splice(index, 1);
      this.activeUser = this.users[0];
      if (!this.users.length) {
        this.backMesageList = [];
        this.messageList = [];
      }
    },
    logoutById(id) {
      const index = this.users.findIndex((ele) => ele._id == id);
      if (index >= 0) {
        this.users.splice(index, 1);
        this.activeUser = this.users[0];
        if (!this.users.length) {
          this.backMesageList = [];
          this.messageList = [];
        }
      }
    },
    filterMessage(filterType) {
      if (this.backMesageList.length && filterType) {
        if (filterType == "all") {
          this.messageList = this.backMesageList;
          return;
        }
        const start = moment(moment().format("YYYY-MM-DD"));
        this.messageList = this.backMesageList.filter((msg) => {
          const end = moment(moment(msg.dateTime).format("YYYY-MM-DD"));
          const diff = end.diff(start, "days");
          let dayDifference = 0;
          if (filterType == "today") {
            dayDifference = 0;
          } else if (filterType == "last_7_days") {
            dayDifference = 7;
          }
          if (diff == dayDifference) {
            return msg;
          }
        });
      }
    },
  },
});
