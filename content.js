var scriptElement = document.createElement("script");
scriptElement.setAttribute('src', chrome.runtime.getURL('inject.js'));
document.head.appendChild(scriptElement);