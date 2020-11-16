import axios from "./../plugins/request";
import { SetItem } from "./../plugins/storage";
import router from "./../router";

const Login = async ({ commit }, login) => {
  try {
    const result = await axios.post("/users/login", login);
    SetItem("admin", login);
    commit("Admin", result.data);
    router.replace("/home/calendar");
  } catch (error) {
    console.log(error);
  }
};

/* const List = ({ commit }, login) => {

}; */

export default {
  Login,
  // List,
};

/* AdminLogin: ({ commit }, login) => {
    axios.post("admin/login", login).then((res) => {
      if (res.data.status == 200) {
        commit("Notify", {
          message: res.data.message,
          type: "success",
        });
        commit("InitAdmin", {
          ...res.data.admin,
          password: login.password,
        });
        if (!router.currentRoute.path.includes("admin")) router.push("/admin");
      } else {
        if (!router.currentRoute.path.includes("login"))
          router.replace("/login");
        throw res.data;
      }
    });

    axios
      .get("list/api/history", {
        params: {
          adminId: login.adminId,
        },
      })
      .then((res) => {
        if (res.data.status == 200) commit("HistoryList", res.data.history);
      });
  },
  AdminRegister: ({ commit }, register) => {
    axios.post("admin/register", register).then((res) => {
      if (res.data.status == 200) {
        commit("Notify", {
          message: res.data.message,
          type: "success",
        });
        register._id = res.data._id;
        commit("InitAdmin", register);
        router.push("/admin");
      } else throw res.data;
    });
  },
  AdminLogout: ({ commit }, adminId) => {
    axios.get("admin/api/logout", adminId).then((res) => {
      if (res.data.status == 200) {
        commit("Notify", {
          message: res.data.message,
          type: "success",
        });
        commit("InitAdmin", {
          _id: "",
        });
        router.replace("/login");
      } else throw res.data;
    });
  },
  GetList: ({ commit }) => {
    axios.get("list/get").then((res) => {
      if (res.data.status == 200) commit("InitList", res.data.lists);
      else throw res.data;
    });
  },
  EditList: ({ commit }, list) => {
    axios.post("list/api/edit", list).then((res) => {
      if (res.data.status == 200) {
        commit("Notify", {
          message: res.data.message,
          type: "success",
        });
        list._id = res.data._id;
        commit("EditList", list);
        router.push("/admin");
      } else throw res.data;
    });
  },
  MoveList: ({ commit }, listId) => {
    axios
      .post("list/api/move", {
        listId,
      })
      .then((res) => {
        if (res.data.status == 200) {
          commit("Notify", {
            message: res.data.message,
            type: "success",
          });
          commit("MoveList", listId);
        } else throw res.data;
      });
  },
  AccountInfo: ({ commit }, info) => {
    axios.post("admin/api/info", info).then((res) => {
      if (res.data.status == 200) {
        if (info.password) {
          router.replace("/login");
          commit("InitAdmin", {
            _id: "",
          });
        } else commit("AccountInfo", info);
        commit("Notify", {
          message: res.data.message,
          type: "success",
        });
      } else throw res.data;
    });
  },
  StartList: ({ commit }, listId) => {
    axios
      .post("list/api/start", {
        listId,
      })
      .then((res) => {
        if (res.data.status == 200) {
          commit("Notify", {
            message: res.data.message,
            type: "success",
          });
          commit("StartList", listId);
        } else throw res.data;
      });
  }, */
