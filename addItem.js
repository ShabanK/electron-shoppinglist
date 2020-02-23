const electron = require("electron");
const { ipcRenderer } = electron;

const form = document.querySelector("form");

function submitForm(e) {
  e.preventDefault();
  console.log("okay");
  const item = document.querySelector("#item").value;
  ipcRenderer.send("item:add", item)
}

form.addEventListener("submit", submitForm);

