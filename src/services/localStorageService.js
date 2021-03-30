const key = 'notesList';
export const localStorageService = {
  setItem(itemList) {
    localStorage.setItem(key, JSON.stringify(itemList));
  },
  getItem() {
    try {
      const itemList = localStorage.getItem(key);
      return itemList ? JSON.parse(itemList) : [];
    } catch (error) {
      return [];
    }
  },
};
