export default function useSessionStorage() {
  const setItemInSS = (key: string, item: string) => {
    sessionStorage.setItem(key, item);
  }

  const getItemFromSS = (key: string) => {
    return sessionStorage.getItem(key);
  }

  return {setItemInSS, getItemFromSS};
}
