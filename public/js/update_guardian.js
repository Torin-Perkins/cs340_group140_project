// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateGuardianForm = document.getElementById('update-guardian-form-ajax');

// Modify the objects we need
updateGuardianForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGuardianID = document.getElementById("guardian-input-up");
    let inputName = document.getElementById("name-input-up");
    let inputGlimmer = document.getElementById("glimmer-input-up");
    let inputRankID = document.getElementById("update-guardian-rank");

    // Get the values from the form fields
    let guardianID = inputGuardianID.value
    let nameValue = inputName.value;
    let glimmerValue = inputGlimmer.value;
    let rankID = inputRankID.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        glimmer_balance: glimmerValue,
        guardian_id: guardianID, 
        rank_id: rankID,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-guardian-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            //addRowToTable(xhttp.response);
            updateRow(xhttp.response, guardianID);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputGlimmer.value = '';
            inputGuardianID.value = "";
            inputRankID.value = "";
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})



function updateRow(data, guardianID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("guardians_table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == guardianID) {
            console.log(table.rows[i].getAttribute("data-value"));
            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            console.log(updateRowIndex);
            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];

            console.log(td1);
            console.log(td2);
            

            // Reassign homeworld to our value we updated to
            td1.innerHTML = parsedData[0].name; 
            td2.innerHTML = parsedData[0].glimmer_balance;
       }
    }
}