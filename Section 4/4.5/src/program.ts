import { app, BrowserWindow, Menu } from 'electron';

class Program {
    private _window: BrowserWindow;

    public constructor() {
        app.once( "ready", () => {
            this._window = new BrowserWindow( {
                width: 800,
                height: 600,
                titleBarStyle: "hiddenInset",
                backgroundColor: "#111",

                // Do not show the window until it is ready to prevent white flickering.
                show: false,
                webPreferences: {
                    nodeIntegration: true
                }
            } );

            this._window.once( "ready-to-show", this.onWindowReady.bind( this ) );

            this._window.loadFile( __dirname + "/" + "index.html" );
        } );
    }

    private onWindowReady(): void {
        console.log( "Showing window..." );
        this._window.show();
    }
}

var program = new Program();