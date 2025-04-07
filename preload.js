import { contextBridge } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    // DBus/spotify controls go here
})