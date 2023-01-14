const switches = document.querySelectorAll('input[type=checkbox]');

switches.forEach((switchItem) => {

  if (localStorage.getItem(switchItem.id) === "true") {
    switchItem.checked = true;
  } else if (localStorage.getItem(switchItem.id) === "false") {
    switchItem.checked = false;
  } else { // Store default value (true)
    storeSwitchValue(switchItem);
  }

  switchItem.addEventListener("click", () => {
    storeSwitchValue(switchItem);
    sendStatus(switchItem);
  });
});

function sendStatus(switchItem) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {[switchItem.id]: switchItem.checked});
  });
}

function storeSwitchValue(switchItem) {
  localStorage.setItem(switchItem.id, switchItem.checked);
}