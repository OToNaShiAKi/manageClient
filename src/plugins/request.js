import axios from "axios";
import store from "./../store/";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "/manage/"
    : "http://hustmaths.top:3000/";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (request) => {
    store.commit("Progress", true);
    return request;
  },
  (error) => {
    console.log(error);
    store.commit("Notify", { type: "error", message: error.message });
  }
);

axios.interceptors.response.use(
  (response) => {
    store.commit("Progress", false);
    if (response.data.status !== 200) {
      store.commit("Notify", { type: "error", message: response.data.message });
      throw response.data;
    } else {
      if (response.data.message)
        store.commit("Notify", {
          type: "success",
          message: response.data.message,
        });
      return response.data;
    }
  },
  (error) => {
    console.log(error);
    store.commit("Progress", false);
    store.commit("Notify", { type: "error", message: error.message });
  }
);

export default axios;
