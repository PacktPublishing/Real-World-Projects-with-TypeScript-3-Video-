import { BillManager } from "./billManager";

var billManager: BillManager = new BillManager();

window.onload = function () {

    var urlParams = new URLSearchParams( window.location.search );
    if ( !urlParams.has( "id" ) ) {
        window.location.href = './index.html';
        return;
    } else {
        let id = Number( urlParams.get( "id" ) );

        let record = billManager.records.find( r => r.id === id );
        if ( record !== undefined ) {
            billManager.setupForm( record );
        }
    }

    // Cancel button
    document.getElementById( "cancelButton" ).onclick = () => {
        window.location.href = './index.html';
        return false;
    }

    // Save button
    document.getElementById( "saveButton" ).onclick = () => {

        billManager.saveRecordFromForm();
        window.location.href = './index.html';
        return false;
    }
}