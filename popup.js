// DarkFlow - Popup Script

var DEFAULTS = {
  intensity: 'full',
  sites: {}
};

var siteToggle = document.getElementById('siteToggle');
var statusDot = document.getElementById('statusDot');
var siteName = document.getElementById('siteName');
var intensityBtns = document.querySelectorAll('.intensity-btn');
var resetBtn = document.getElementById('resetBtn');

var currentHostname = '';
var currentEnabled = true;
var currentIntensity = 'full';

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  if (!tabs[0] || !tabs[0].url) return;

  var url = new URL(tabs[0].url);
  currentHostname = url.hostname;
  siteName.textContent = currentHostname.replace(/^www\./, '');

  chrome.storage.sync.get(DEFAULTS, function(data) {
    var sites = data.sites || {};
    currentIntensity = data.intensity || 'full';
    currentEnabled = sites[currentHostname] !== false;

    updateToggle(currentEnabled);

    intensityBtns.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.value === currentIntensity);
    });
  });
});

// إرسال أمر فوري للتاب عند فتح الـ popup
function sendToTab(action, data) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, Object.assign({ action: action }, data))
        .catch(function() {});
    }
  });
}

siteToggle.addEventListener('click', function() {
  currentEnabled = !currentEnabled;
  updateToggle(currentEnabled);

  chrome.storage.sync.get(DEFAULTS, function(data) {
    var sites = data.sites || {};
    sites[currentHostname] = currentEnabled;
    chrome.storage.sync.set({ sites: sites });
  });

  sendToTab('toggle', {
    enabled: currentEnabled,
    intensity: currentIntensity
  });
});

intensityBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    currentIntensity = btn.dataset.value;

    intensityBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    chrome.storage.sync.set({ intensity: currentIntensity });
    sendToTab('changeIntensity', { intensity: currentIntensity });
  });
});

resetBtn.addEventListener('click', function() {
  chrome.storage.sync.set({ sites: {} }, function() {
    currentEnabled = true;
    updateToggle(true);
    sendToTab('toggle', { enabled: true, intensity: 'full' });
  });
});

function updateToggle(enabled) {
  siteToggle.classList.toggle('active', enabled);
  statusDot.classList.toggle('off', !enabled);
}