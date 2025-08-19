export default function useSessionStorage() {


  const addItemInSS = (key: string, item: string) => {
    sessionStorage.setItem(key, item);
  }

  const getItemFromSS = (key: string) => {
    return sessionStorage.getItem(key);
  }

  return {addItemInSS, getItemFromSS};
}
