const LOCAL_STORAGE_ID = "config";
const CONFIG = {};

export default CONFIG;

//check if browser support local storage
export function doesSupportLocalStorage() {
  return typeof(Storage) !== 'undefined';
}

export function loadConfig() {
  const jsonString = localStorage.getItem(LOCAL_STORAGE_ID);
  if (!jsonString) return null;
  try
  {
    const jsonData = JSON.parse(jsonString);
    Object.assign(CONFIG, jsonData);
  }
  catch (e)
  {
    //Reset the config
    clearConfig();
  }
};

export function saveConfig() {
  try
  {
    const jsonString = JSON.stringify(CONFIG);
    localStorage.setItem(LOCAL_STORAGE_ID, jsonString);
  }
  catch (e)
  {
    //Reset the config
    clearConfig();
  }
};

export function clearConfig() {
  localStorage.clear();
};
