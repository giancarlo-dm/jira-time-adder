/// <reference types="react-scripts" />

import { IpcRenderer } from "electron";

declare global {
    interface Window {
        require: (module: "electron") => {
            ipcRenderer: IpcRenderer
        };
    }
}
