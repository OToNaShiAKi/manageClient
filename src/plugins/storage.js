export const SetItem = (key, value) => {
  if (!key) return;
  value = JSON.stringify(value);
  window.localStorage.setItem(key, value);
};

export const GetItem = (key) => {
  if (!key) return;
  let value = JSON.parse(window.localStorage.getItem(key));
  return value;
};
