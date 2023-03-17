// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteSale(sale_id) {
    let sale_data = {
        sale_id: sale_id
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-s-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteRow(sale_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(sale_data));
}

function deleteRow(sale_id){

    let table = document.getElementById("sale_table");
    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == sale_id) {
            table.deleteRow(i);
            break;
       }
    }
}
