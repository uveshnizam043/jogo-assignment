import { defineStore } from "pinia";
import moment from "moment";
const avtarBgColors = [
  "#8D6E63",
  "#80CBC4",
  "#FFB067",
  "#C175C8",
  "#FB7676",
  "#DCE775",
  "#FFB74D",
];
export const usersStore = defineStore("users", {
  state: () => ({
    users: [],
    colorCount: 0,
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
    addUser(params) {
      if (this.colorCount < this.users.length) {
        this.colorCount = 0;
      }
      const user = {
        _id: this.users.length + 1,
        name: params,
        color: avtarBgColors[this.colorCount],
      };
      this.users.push(user);

      this.colorCount = this.colorCount + 1;
    },
    addMsg(msg) {
      this.backMesageList.push(msg);
      this.messageList.push(msg);
    },
    updateActiveUser(user) {
      this.activeUser = user;
    },
    logout() {
      const index = this.users.findIndex(
        (ele, index) => ele._id == this.activeUser._id
      );
      console.log(index);
      this.users.splice(index, 1);
      this.activeUser = this.users[0];
      if (!this.users.length) {
        this.backMesageList = [];
        this.messageList = [];
        this.colorCount = 0;
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
