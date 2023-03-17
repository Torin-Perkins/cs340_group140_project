// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addCosmeticForm = document.getElementById('add-cosmetic-form-ajax');

// Modify the objects we need
addCosmeticForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("cosmetic-name-input");
    let inputSlot = document.getElementById("cosmetic-slot-input");
    let inputDescription = document.getElementById("cosmetic-description-input");
    let inputWRank = document.getElementById("cosmetic-rank-input");
    let inputClass = document.getElementById("cosmetic-class-input");
    let inputPrice = document.getElementById("cosmetic-price-input");


    // Get the values from the form fields
    let nameValue = inputName.value;
    let slotValue = inputSlot.value;
    let descriptionValue = inputDescription.value;
    let rankValue = inputWRank.value;
    let classValue = inputClass.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        slot: slotValue, 
        description: descriptionValue, 
        rank_req: rankValue,
        class: classValue, 
        price: priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-cosmetic-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputSlot.value = '';
            inputClass.value = '';
            inputDescription.value = '';
            inputWRank.value = '';
            inputPrice.value = '';
           
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})



// Creates a single row from an Object representing a single record
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("cos_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let slotCell = document.createElement("TD");
    let descCell = document.createElement("TD");
    let rankReqCell = document.createElement("TD");
    let classCell = document.createElement("TD");
    let priceCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.cosmetic_id;
    nameCell.innerText = newRow.name;
    slotCell.innerText = newRow.slot;
    descCell.innerText = newRow.description;
    rankReqCell.innerText = newRow.rank_req;
    classCell.innerText = newRow.class;
    priceCell.innerText = newRow.price;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCosmetic(newRow.cosmetic_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(slotCell);
    row.appendChild(descCell);
    row.appendChild(rankReqCell);
    row.appendChild(classCell);
    row.appendChild(priceCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.cosmetic_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}