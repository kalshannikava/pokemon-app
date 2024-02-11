const useCache = () => {
  function setCached<T> (key: string, value: T, expires: number) {
    const item = {
      value,
      expires: expires + Date.now(),
    }
    localStorage.setItem(key, JSON.stringify(item));
  }

  function getCached<T> (key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    if (parsedItem.expires <= Date.now()) {
      return null;
    }

    return parsedItem.value;
  }

  return { setCached, getCached }
}

export default useCache;
