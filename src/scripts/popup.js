const checkbox = document.getElementById("switch-blur");

if (localStorage.getItem(checkbox.name) === "true") {
  checkbox.checked = true;
} else if (localStorage.getItem(checkbox.name) === "false") {
  checkbox.checked = false;
} else {
  storeCheckboxValue(); // Store default value (true)
}

sendBlurStatus();

checkbox.addEventListener("click", () => {
  storeCheckboxValue();
  sendBlurStatus();
});

function storeCheckboxValue() {
  localStorage.setItem(checkbox.name, checkbox.checked);
}

function sendBlurStatus() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"blur status": checkbox.checked});
  });
}