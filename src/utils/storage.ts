export const getItemFromStorage = (key: string) => {
  const storageValue = localStorage.getItem(key);

  if (storageValue) {
    return JSON.parse(storageValue);
  }

  return null;
};

export const setItemToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const clearItemFromStorage = (key: string) =>
  localStorage.removeItem(key);
