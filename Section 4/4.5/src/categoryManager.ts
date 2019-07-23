import { CSVManager } from "./csvManager";

class Category {
    public id: number;
    public name: string;

    public constructor( id: number, name: string ) {
        this.id = id;
        this.name = name;
    }
}

class CategoryManager {
    public categories: Category[] = [];

    public constructor() {
        let rows = CSVManager.readFile( "data/categories.csv" );
        for ( let row of rows ) {

            // Skip blank/invalid rows
            if ( row.length != 2 ) {
                continue;
            }

            this.categories.push( new Category( Number( row[0] ), row[1] ) );
        }
    }
}

export { Category, CategoryManager }