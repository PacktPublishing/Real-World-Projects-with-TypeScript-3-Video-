import fs = require( "fs" );
import path = require( "path" );

class CSVManager {

    public static readFile( filePath: string ): string[][] {
        let rows: string[][] = [];

        // Read the entire file and split it into lines.
        let buffer: Buffer = fs.readFileSync( path.join( __dirname, filePath ) );
        let lines: string[] = buffer.toString().trim().split( "\n" );

        for ( let line of lines ) {
            rows.push( line.trim().split( "," ) );
        }

        return rows;
    }

    public static writeFile( filePath: string, content: string ): void {
        fs.writeFileSync( path.join( __dirname, filePath ), content );
    }

    public static appendFile( filePath: string, content: string ): void {
        fs.appendFileSync( path.join( __dirname, filePath ), content );
    }
}

export { CSVManager };