const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file",
      slashes: true
    })
  );

  //shut down everything when quit
  mainWindow.on("closed", function() {
    app.quit();
  });

  //Build menu from the template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

//Add window
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add Shopping List Item",
    webPreferences: { nodeIntegration: true }
  });
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addWindow.html"),
      protocol: "file",
      slashes: true
    })
  );
  //garbage collector
  addWindow.on("close", function() {
    addWindow = null;
  });
}

//catch item:add
ipcMain.on("item:add", function(e, item) {
  console.log(item);
  mainWindow.webContents.send("item:add", item);
  addWindow.close();
});

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        accelerator: process.platform == "darwin" ? "Command+W" : "Ctrl+W",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Clear Items",
        accelerator: process.platform == "darwin" ? "Command+P" : "Ctrl+P",
        click() {
          mainWindow.webContents.send("item:clear");
        }
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

//for mac, add empty object to menu
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

//add dev tools if not in prod
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+D" : "Ctrl+D",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
