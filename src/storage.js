export const storage = {
  // sv: (data) => {
  //   chrome.storage.local.set({ 'groups': data }, function () {
  //     // const res =  chrome.storage.local.get([name])
  //     // if (res) {
  //     //     return res
  //     // } else {
  //     //     return null
  //     // }
  //   })
  // },
  save: (data => {
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
  }),
  get: (key) => {
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