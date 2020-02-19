const electron = require("electron");
const { ipcRenderer } = electron;

const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitform(e) {
  e.preventDefault();
  console.log("okay");
}
