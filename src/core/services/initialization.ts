import { BrowserWindow } from "electron";
import ElectronStore from "electron-store";
import { channels } from "../../common/constants";
import StateManagement from "./stateManagement";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Initializer {
  private stateManager: StateManagement;
  private store: ElectronStore;
  private firstTimeRunning: boolean;
  public window: BrowserWindow;

  public init(): void {
    this.store = new ElectronStore();
    this.firstTimeRunning = !!this.store.get("lastLogin");
    this.window = new BrowserWindow({
      height: 600,
      width: 800,
      backgroundColor: "black",
      webPreferences: {
        nodeIntegration: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });
    this.window.removeMenu();
    this.window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    this.window.webContents.openDevTools({ mode: "detach" });
    this.window.webContents.on("did-finish-load", () => {
      this.window.webContents.send(channels.FRIST_TIME_RUNNING, this.firstTimeRunning);
    });
  }

  public isFirstTimeRunningApp(): boolean {
    return this.firstTimeRunning;
  }

  public getStateManager(): StateManagement {
    return this.stateManager;
  }
}
