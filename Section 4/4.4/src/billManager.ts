import { CSVManager } from "./csvManager";
import { CategoryManager } from "./categoryManager";

class BillRecord {
    public id: number;
    public description: string;
    public date: Date;
    public amount: number;
    public category: number;

    public constructor( id: number, date: Date, amount: number, category: number, description: string ) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }
}

class BillManager {

    public records: BillRecord[] = [];

    public constructor() {
        let rows = CSVManager.readFile( "data/records.csv" );
        for ( let row of rows ) {

            // Skip blank/invalid rows
            if ( row.length != 5 ) {
                continue;
            }

            let record = new BillRecord(
                Number( row[0] ),
                new Date( row[1] ),
                Number( row[2] ),
                Number( row[3] ),
                row[4] );

            this.records.push( record );
        }
    }
}

export { BillRecord, BillManager }