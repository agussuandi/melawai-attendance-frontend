const { app, BrowserWindow } = require("electron");

const server = require("./app");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 768,
        webPreferences: {nodeIntegration: true},
        icon: __dirname + '/public/assets/img/favicon/favicon.ico'
    })

    mainWindow.setMenuBarVisibility(false)

    mainWindow.loadURL("http://localhost:3333/v2")
    mainWindow.on("closed", function () {
        mainWindow = null
    })
}

app.on("ready", createWindow)

app.on("resize", function (e, x, y) {
    mainWindow.setSize(x, y)
})

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow()
    }
})