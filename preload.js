const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    // whitelist channels
    const validChannels = ['toMain']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    const validChannels = ['fromMain']
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  }
})

contextBridge.exposeInMainWorld('shell', {
  runCommand: (cmd) => ipcRenderer.invoke('run-bash', cmd)
})

contextBridge.exposeInMainWorld('electronAPI', {
  setHeight: (height) => ipcRenderer.send('set-height', height)
});