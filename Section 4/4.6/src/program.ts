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

            this.changePage( "index" );

            this.buildMenu();
            console.debug( "Initialization done." );
        } );
    }

    public changePage( pageName: string ): void {
        this._window.loadFile( __dirname + "/" + pageName + ".html" );
    }

    private onWindowReady(): void {
        console.log( "Showing window..." );
        this._window.show();
    }

    private buildMenu(): void {
        let menu = Menu.buildFromTemplate( [
            {
                label: "File",
                submenu: [
                    {
                        label: "New Record...",
                        click() {
                            program.changePage( "addRecord" );
                        }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: "Exit",
                        accelerator: "Alt+F4",
                        click() {
                            app.quit();
                        }
                    }
                ]
            }
        ] );
        Menu.setApplicationMenu( menu );
    }
}

var program = new Program();