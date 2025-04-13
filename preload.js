const { contextBridge } = require('electron');
const { getMediaInfo } = require('./fetchmedia.js');

console.log('Preload script loaded');

contextBridge.exposeInMainWorld('media', {
    getMediaInfo: async () => {
        return await getMediaInfo();
    }
});