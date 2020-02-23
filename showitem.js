const electron = require("electron");
const { ipcRenderer } = electron;

const ul = document.querySelector("ul");

//add item
ipcRenderer.on("item:add", function(e, item) {
  ul.className = "collection";
  const li = document.createElement("li");
  const itemText = document.createTextNode(item);
  li.className = "collection-item";
  li.appendChild(itemText);
  ul.appendChild(li);
});

//clear items
ipcRenderer.on("item:clear", function() {
  ul.innerHTML = "";
  ul.className = "";
});

ul.addEventListener("dblclick", e => {
  e.target.remove();
  if (ul.innerHTML == "") {
    ul.className = "";
  }
});
