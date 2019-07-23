import { BillManager, BillRecord } from "./billManager";
import { CategoryManager } from "./categoryManager";
import { PieChart } from "./chart";

let billManager = new BillManager();
let categoryManager = new CategoryManager();
let chart: PieChart;

window.onload = function () {

    document.getElementById( "addRecordButton" ).onclick = () => {
        window.location.href = './addRecord.html';
        return false;
    }

    // Show the chart.
    refreshChart( billManager.records );

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

        // Edit button
        let editButton = document.createElement( "input" );
        editButton.value = "Edit";
        editButton.type = "button";
        editButton.setAttribute( "data-id", record.id.toString() );
        editButton.onclick = ( mouseEvent: MouseEvent ) => {
            let button = mouseEvent.target as HTMLInputElement;
            let id = Number( button.getAttribute( "data-id" ) );
            window.location.href = `./editRecord.html?id=${id}`;
        };
        actionCell.appendChild( editButton );

        // Delete button
        let deleteButton = document.createElement( "input" );
        deleteButton.value = "Delete";
        deleteButton.type = "button";
        deleteButton.setAttribute( "data-id", record.id.toString() );
        deleteButton.onclick = ( mouseEvent: MouseEvent ) => {
            if ( confirm( "Do you really want delete this record?" ) ) {
                let button = mouseEvent.target as HTMLInputElement;
                let id = Number( button.getAttribute( "data-id" ) );

                // Find the record and remove it if it exists (which it should).
                let record = billManager.records.find( r => r.id === id );
                if ( record !== undefined ) {
                    billManager.records.splice(
                        billManager.records.indexOf( record ), 1 );

                    billManager.save();
                }

                // Reload the record listing.
                refreshRecordListing( billManager.records );
            }
        };
        actionCell.appendChild( deleteButton );

        row.appendChild( actionCell );

        recordTable.appendChild( row );
    }
}

function refreshChart( records: BillRecord[] ): void {
    let categoryIds: number[] = [];
    let categoryNames: string[] = [];
    let values: number[] = [];

    for ( let record of records ) {
        // If the category hasn't yet been tracked, add it now.
        if ( categoryIds.indexOf( record.category ) === -1 ) {
            categoryIds.push( record.category );
            let category = categoryManager.categories.find( c => c.id === record.category  );
            if ( category === undefined ) {
                if ( categoryNames.indexOf( "Unknown" ) !== -1 ) {
                    categoryNames.push( "Unknown" );
                }
            } else {
                categoryNames.push( category.name );
            }
        }

        // If there is no value for the given category, default it to 0 before incrementing.
        if ( values[categoryIds.indexOf( record.category )] === undefined ) {
            values[categoryIds.indexOf( record.category )] = 0;
        }

        values[categoryIds.indexOf( record.category )] += record.amount;
    }

    // Create and draw the chart.
    chart = new PieChart( "chartCanvas" );
    chart.drawData( categoryNames, values );
}