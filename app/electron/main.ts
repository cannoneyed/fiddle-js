import { app, BrowserWindow } from 'electron';
import osc from 'osc';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1500,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:8080`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  sendOSC();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

function sendOSC() {
  const udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: '127.0.0.1',
    localPort: 57121,

    // This is where sclang is listening for OSC messages.
    remoteAddress: '127.0.0.1',
    remotePort: 57120,
    metadata: true,
  });

  // Open the socket.
  udpPort.open();

  // Every second, send an OSC message to SuperCollider
  setInterval(function() {
    var msg = {
      address: '/hello/from/oscjs',
      args: [
        {
          type: 'f',
          value: Math.random(),
        },
      ],
    };

    console.log(
      'Sending message',
      msg.address,
      msg.args,
      'to',
      udpPort.options.remoteAddress + ':' + udpPort.options.remotePort
    );
    udpPort.send(msg);
  }, 1000);
}
