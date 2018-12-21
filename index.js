const {app, BrowserWindow} = require('electron');

let mainWindow;

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 700,
        height: 300,
        show: false,
        maximizable: false,
        fullscreenable: false,
        resizable: false
    });

    mainWindow.setMenu(null);

    mainWindow.loadFile('./app/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    });

    mainWindow.toggleDevTools()
}

app.on('ready', createMainWindow);
app.on('window-all-closed', () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});
app.on('activate', () => {
    if(mainWindow == null){
        createMainWindow();
    }
});