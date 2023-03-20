// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteGR(guardian_id, rank_id) {
    let gr_data = {
        guardian_id: guardian_id,
        rank_id: rank_id
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-gr-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteRow(guardian_id, rank_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(gr_data));
}

function deleteRow(guardian_id, rank_id){

    let table = document.getElementById("gr_table");
    for (let i = 0, row; row = table.rows[i]; i++) {

       //check if the current text matches the guardian and rank IDs that are meant to be deleted
       if (table.rows[i].cells[0].innerHTML == guardian_id && table.rows[i].cells[2].innerHTML == rank_id) {
            table.deleteRow(i);
            break;
       }
    }
}