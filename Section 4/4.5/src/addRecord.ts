import { BillManager } from "./billManager";

var billManager: BillManager = new BillManager();

window.onload = function () {
    billManager.setupForm( undefined );

    // Cancel button
    document.getElementById( "cancelButton" ).onclick = () => {
        window.location.href = './index.html';
        return false;
    }

    // Add button
    document.getElementById( "addButton" ).onclick = () => {
        
        billManager.addRecordFromForm();
        window.location.href = './index.html';
        return false;
    }
}