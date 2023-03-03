// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addGuardianForm = document.getElementById('add-guardian-form-ajax');

// Modify the objects we need
addGuardianForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputGlimmer = document.getElementById("input-glimmer");

    let inputRank = document.getElementById("input-rank")

    // Get the values from the form fields
    let nameValue = inputName.value;
    let glimmerValue = inputGlimmer.value;
    let rankValue = inputRank.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        glimmer_balance: glimmerValue,
        rank: rankValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-guardian-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputGlimmer.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})



// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {
    console.log(data)

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("guardians_table");
    //let ranksTable = document.getElementById("ranks_table")

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let glimmerCell = document.createElement("TD");


    //let row2 = document.createElement("TR")
    //let guardianIdCell = document.createElement("TD");
    //let guardianNameCell = document.createElement("TD");
    //let rankIdCell = document.createElement("TD");
    //let rankTitleCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.guardian_id;
    nameCell.innerText = newRow.name;
    glimmerCell.innerText = newRow.glimmer_balance;

    //guardianIdCell.innerText = newRow.guardian_id;
    //guardianNameCell.innerText = newRow.name;
    //rankIdCell.innerText = newRow.rank_id;
    //rankTitleCell.innerText = newRow.title;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteGuardian(newRow.guardian_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(glimmerCell);
    row.appendChild(deleteCell);

    //row2.appendChild(guardianIdCell)
    //row2.appendChild(guardianNameCell)
    //row2.appendChild(rankIdCell)
    //row2.appendChild(rankTitleCell)

    row.setAttribute('data-value', newRow.guardian_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
    //ranksTable.appendChild(row2);
}