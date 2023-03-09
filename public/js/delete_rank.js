// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteRank(rank_id) {
    let r_data = {
        rank_id: rank_id
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-rank-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteGR(rank_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(r_data));
}

function deleteGR(rank_id){

    let table = document.getElementById("r_table");
    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == rank_id) {
            table.deleteRow(i);
            break;
       }
    }
}