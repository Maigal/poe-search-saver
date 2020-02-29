export const storage = {
    save: (name, store) => {
        chrome.storage.local.set({[name]: store}, function() {
            const res =  chrome.storage.local.get([name])
            if (res) {
                return res
            } else {
                return null
            }
        })
    } 
}