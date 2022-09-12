const store = ({ key, value }) => {
  localStorage.setItem(key, value);
};

const fetch = (key) => {
  const storedItem = localStorage.getItem(key);

  return storedItem;
};

const remove = (key) => {
  localStorage.removeItem(key);
};

const localStorageService = {
  store,
  fetch,
  remove,
};

export default localStorageService;
