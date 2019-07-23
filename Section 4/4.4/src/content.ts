import { BillManager, BillRecord } from "./billManager";
import { CategoryManager } from "./categoryManager";

let billManager = new BillManager();
let categoryManager = new CategoryManager();

window.onload = function () {

    // Build out the listing.
    refreshRecordListing( billManager.records );
}

function refreshRecordListing( records: BillRecord[] ): void {
    let recordTable = document.getElementById( "records" ) as HTMLTableElement;
    while ( recordTable.rows.length > 1 ) {
        recordTable.deleteRow( 1 );
    }

    for ( let record of records ) {
        let row = document.createElement( "tr" );

        let data: string[] = [];
        data.push( record.date.toLocaleDateString() );
        data.push( record.amount.toFixed( 2 ).toString() );

        let category = categoryManager.categories.find( f => f.id === record.category );
        if ( category !== undefined ) {
            data.push( category.name );
        } else {
            data.push( "Unknown" );
        }

        data.push( record.description );

        // Create the required <td> elements.
        for ( let d of data ) {
            let cell = document.createElement( "td" );
            cell.innerHTML = d;
            row.appendChild( cell );
        }

        let actionCell = document.createElement( "td" );
        row.appendChild( actionCell );

        recordTable.appendChild( row );
    }
}