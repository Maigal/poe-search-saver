const initialStructure = {
  groups: [{
    title: 'Default',
    links: [
      {
        name: 'poe.trade Homepage',
        url: 'https://poe.trade/'
      }
    ]
  }],
  config: {
    colorMode: 'light',
  }
}

export const storage = {
  initialize: (key, fn) => {
    console.log('fn',fn)
    chrome.storage.local.set({ [key] : initialStructure[key] }, function () {
      fn(initialStructure[key])
    });
  },
  saveData: (key, data) => {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.set({ [key] : data }, function () {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        } else {
          resolve();
        }
      });
    });
  },
  getData: key => {
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