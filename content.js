// DarkFlow - Content Script
(function() {
  const hostname = window.location.hostname;

  // غيّر هذا إلى false لو عايز الوضع معطّل افتراضياً
  var DEFAULT_ENABLED = true;

  function applyDarkMode(intensity) {
    document.documentElement.classList.remove(
      'darkflow-active', 'darkflow-mid', 'darkflow-low'
    );

    if (intensity === 'low') {
      document.documentElement.classList.add('darkflow-low');
    } else if (intensity === 'mid') {
      document.documentElement.classList.add('darkflow-mid');
    } else {
      document.documentElement.classList.add('darkflow-active');
    }
  }

  function removeDarkMode() {
    document.documentElement.classList.remove(
      'darkflow-active', 'darkflow-mid', 'darkflow-low'
    );
  }

  // تفعيل فوري بدون انتظار storage
  applyDarkMode('full');

  // ثم تحقق من storage لإيقافه لو مستخدم عطّله
  try {
    chrome.storage.sync.get(['sites', 'intensity'], function(data) {
      var sites = data.sites || {};
      var intensity = data.intensity || 'full';

      // لو الموقع معطّل صراحةً — أوقف الوضع
      if (sites[hostname] === false) {
        removeDarkMode();
      } else {
        // طبّق الشدة المحفوظة
        applyDarkMode(intensity);
      }
    });
  } catch(e) {}

  // الاستماع لرسائل من popup
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'toggle') {
      if (message.enabled) {
        applyDarkMode(message.intensity || 'full');
      } else {
        removeDarkMode();
      }
      sendResponse({ success: true });
    }

    if (message.action === 'changeIntensity') {
      applyDarkMode(message.intensity);
      sendResponse({ success: true });
    }

    return true;
  });
})();