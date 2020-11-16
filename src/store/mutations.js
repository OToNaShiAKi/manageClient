const Notify = (state, { type, message = "网络连接失败" }) => {
  state.notify = { show: true, type, message };
};

const Progress = (state, show) => {
  state.progress = show;
};

const Admin = (state, user) => {
  if (user) state.user = user;
};

export default { Notify, Progress, Admin };
