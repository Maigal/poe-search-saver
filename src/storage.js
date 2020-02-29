const initialStructure = {
  groups: [],
  config: {
    colorMode: 'light',
  }
}

export const storage = {
  initialize: () => {
    chrome.storage.local.set({ 'groups' : initialStructure.groups, 'config': initialStructure.config }, function () {
    });
  },
  saveData: data => {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.set({ 'groups' : data }, function () {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        } else {
          console.log('resolvien2')
          resolve();
        }
      });
    });
  },
  getData: (key) => {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get(key, function (items) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(items[key]);
        }
      });
    });
  }
}