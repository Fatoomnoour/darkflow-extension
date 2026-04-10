// DarkFlow - Background Service Worker

var DEFAULTS = {
  intensity: 'full',
  sites: {}
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(DEFAULTS, function(data) {
    chrome.storage.sync.set(data);
  });
});