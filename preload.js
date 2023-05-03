const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  userSearch: async (usuario) =>{
    try {
      const resultado = await ipcRenderer.invoke('search-user', usuario);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },
  userData: () => {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('user-data', (event, obj) =>{
        resolve(obj);
      });
    });
  },
  login: (someArgument) => {
    ipcRenderer.invoke('login', someArgument);
  },
  signOut: (someArgument) => {
    ipcRenderer.invoke('sign-out', someArgument);
  },
})
