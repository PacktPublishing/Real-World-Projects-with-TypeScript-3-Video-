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

    public setupForm( record: BillRecord ): void {
        let id = document.getElementById( "id" ) as HTMLInputElement;
        let description = document.getElementById( "description" ) as HTMLInputElement;
        let date = document.getElementById( "date" ) as HTMLInputElement;
        let amount = document.getElementById( "amount" ) as HTMLInputElement;
        let category = document.getElementById( "category" ) as HTMLSelectElement;

        let categoryManager = new CategoryManager();
        category.appendChild( new Option( "Unknown", "-1" ) );
        for ( let c of categoryManager.categories ) {
            let o = new Option( c.name, c.id.toString() );
            category.appendChild( o );
        }

        if ( record === undefined ) {
            date.valueAsDate = new Date();
            amount.valueAsNumber = 0;
        } else {
            id.value = record.id.toString();
            description.value = record.description;
            date.valueAsDate = record.date;
            amount.valueAsNumber = record.amount;
            category.value = record.category.toString();
        }
    }

    public addRecordFromForm(): void {
        let maxId = Math.max.apply( Math, this.records.map( c => c.id ) );

        let id = maxId + 1;
        let description = document.getElementById( "description" ) as HTMLInputElement;
        let date = document.getElementById( "date" ) as HTMLInputElement;
        let amount = document.getElementById( "amount" ) as HTMLInputElement;
        let category = document.getElementById( "category" ) as HTMLSelectElement;

        // Convert the data to string and append to the file.
        let buffer = `${id},${date.valueAsDate.toString()},${amount.valueAsNumber},${category.value},${description.value}\n`;

        CSVManager.appendFile( "data/records.csv", buffer );
    }

    public saveRecordFromForm(): void {
        let id = document.getElementById( "id" ) as HTMLInputElement;
        let description = document.getElementById( "description" ) as HTMLInputElement;
        let date = document.getElementById( "date" ) as HTMLInputElement;
        let amount = document.getElementById( "amount" ) as HTMLInputElement;
        let category = document.getElementById( "category" ) as HTMLSelectElement;

        let record = this.records.find( r => r.id == Number( id.value ) );

        if ( record === undefined ) {
            return;
        } else {
            record.description = description.value.trim();
            record.date = date.valueAsDate;// as Date;
            record.amount = Number( amount.value );
            record.category = Number( category.value );
            this.save();
        }
    }

    public save(): void {
        let buffer: string = "";
        for ( let c of this.records ) {
            buffer += `${c.id},${c.date.toString()},${c.amount},${c.category},${c.description}\n`;
        }
        CSVManager.writeFile( "data/records.csv", buffer );
    }
}

export { BillRecord, BillManager }