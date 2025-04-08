const { contextBridge } = require('electron');
const { getMediaInfo } = require('./fetchmedia');

contextBridge.exposeInMainWorld('media', {
    getMediaInfo: async () => {
        return await getMediaInfo();
    }
});