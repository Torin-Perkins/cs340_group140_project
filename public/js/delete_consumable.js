// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteConsumable(consumable_id) {
    let con_data = {
        consumable_id: consumable_id
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-con-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteRow(consumable_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(con_data));
}

function deleteRow(consumable_id){

    let table = document.getElementById("con_table");
    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == consumable_id) {
            table.deleteRow(i);
            break;
       }
    }
}
