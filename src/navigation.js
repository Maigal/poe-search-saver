export const getCurrentUrl = (fn) => {
  let url; 
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    url = tabs[0].url;
    fn(url)
  });

}