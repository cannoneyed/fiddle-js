class IpcRenderer {
  send(address: string, ...args: any[]) {
    console.log('Electron IPC', address, ...args);
  }
}

export const ipcRenderer = new IpcRenderer();
