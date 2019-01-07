const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
const fs = require('fs')
var fileLocation
var file
var normalFly
var elderFly
var temperedFly

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 600, height: 400 })
  const template = [
    {
      label: "File",
      submenu: [
        {label: "Open", accelerator: "CommandOrControl+O", click() {open()}},
        {label: "Save", accelerator: "CommandOrControl+S", click() {save()}}
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  // and load the index.html of the app.
  win.loadFile('index.html')
}

function open() {
  dialog.showOpenDialog(
    { filters: [{ name: 'gi_param', extensions: ['gip'] }] },
    function (fileNames) {
      if (fileNames === undefined) return
      var fileName = fileNames[0]
      fileLocation = fileNames[0]
      fs.readFile(fileName, function (err, data) {
        if(err) dialog.showErrorBox("Error reading file", "")
        else {
          file = data
          normalFly = [data[192], data[193], data[194]]
          elderFly = [data[204], data[205], data[206]]
          temperedFly = [data[208], data[209], data[210]]
          win.webContents.send('normalFly', normalFly)
          win.webContents.send('elderFly', elderFly)
          win.webContents.send('temperedFly', temperedFly)
        }
      })
    }
  )
}

function save() {
  if(file!=null) fs.writeFile(fileLocation, file, function(err) {
    if(err) dialog.showErrorBox("Error saving", "")
  })
  else dialog.showErrorBox("No file specified", "Please open your Monster Hunter World\\nativePC\\common\\guide_insectgi_param.gip file")
}

ipcMain.on("changeNormal", function (event, arr) {
  try {
    file[192] = file[212] = arr[0]
    file[193] = file[213] = arr[1]
    file[194] = file[214] = arr[2]
  }
  catch(e) {
    dialog.showErrorBox("No file specified", "Please open your Monster Hunter World\\nativePC\\common\\guide_insectgi_param.gip file")
  }
})

ipcMain.on("changeElder", function (event, arr) {
  try {
    file[204] = file[216] = arr[0]
    file[205] = file[217] = arr[1]
    file[206] = file[218] = arr[2]
  }
  catch(e) {
    dialog.showErrorBox("No file specified", "Please open your Monster Hunter World\\nativePC\\common\\guide_insectgi_param.gip file")
  }
})

ipcMain.on("changeTempered", function (event, arr) {
  try {
    file[208] = file[220] = arr[0]
    file[209] = file[221] = arr[1]
    file[210] = file[222] = arr[2]
  }
  catch(e) {
    dialog.showErrorBox("No file specified", "Please open your Monster Hunter World\\nativePC\\common\\guide_insectgi_param.gip file")
  }
})

app.on('ready', createWindow)
app.on('window-all-closed', app.quit);
