// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addGrForm = document.getElementById('add-gr-form-ajax');
let g_id = ''
let r_id = ''

addGrForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputGuardianID = document.getElementById('input-guardian').value;
    let inputRankID = document.getElementById('input-rank').value;

    g_id = inputGuardianID;
    r_id = inputRankID;

    let gr_data = {
        guardian_id: inputGuardianID,
        rank_id: inputRankID,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-gr-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputGuardianID.value = '';
            inputRankID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(gr_data));
})

addRowToTable = (gr_data) => {
    //console.log(gr_data);
    let currentTable = document.getElementById('gr_table');

    let parsedData = JSON.parse(gr_data);
    //let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let gIDCell = document.createElement("TD");
    let gNameCell = document.createElement("TD");
    let rIDCell = document.createElement("TD");
    let rTitleCell = document.createElement("TD");

    for (let i = 0; i < parsedData.length; i++) {
        //console.log(parsedData[i])
        //console.log('   ')
        if (parsedData[i].guardian_id == g_id && parsedData[i].rank_id == r_id){
            gIDCell.innerText = g_id;
            gNameCell.innerText = parsedData[i].name;
            rIDCell.innerText = r_id;
            rTitleCell.innerText = parsedData[i].title;
        }
    }

    row.appendChild(gIDCell);
    row.appendChild(gNameCell);
    row.appendChild(rIDCell);
    row.appendChild(rTitleCell);

    currentTable.appendChild(row);
}

