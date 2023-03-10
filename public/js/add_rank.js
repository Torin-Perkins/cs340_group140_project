// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addGrForm = document.getElementById('add-r-form-ajax');

addGrForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputRankTitle = document.getElementById('input-title').value;

    let r_data = {
        title: inputRankTitle,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-r-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            document.getElementById('input-title').value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(r_data));
})

addRowToTable = (r_data) => {
    let currentTable = document.getElementById('r_table');

    let parsedData = JSON.parse(r_data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let rIDCell = document.createElement("TD");
    let rTitleCell = document.createElement("TD");

    rIDCell.innerText = newRow.rank_id;
    rTitleCell.innerText = newRow.title;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteRank(newRow.rank_id);
    };

    row.appendChild(rIDCell);
    row.appendChild(rTitleCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.rank_id);

    currentTable.appendChild(row);
}

