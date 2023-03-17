// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addGrForm = document.getElementById('add-con-form-ajax');

addGrForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputName = document.getElementById('input-name').value;
    let inputDesc = document.getElementById('input-desc').value;
    let inputPrice = document.getElementById('input-price').value;

    let con_data = {
        name: inputName,
        description: inputDesc,
        price: inputPrice,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-con-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            document.getElementById('input-name').value = '';
            document.getElementById('input-desc').value = '';
            document.getElementById('input-price').value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(con_data));
})

addRowToTable = (con_data) => {
    let currentTable = document.getElementById('con_table');

    let parsedData = JSON.parse(con_data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let conIDCell = document.createElement("TD");
    let conNameCell = document.createElement("TD");
    let conDescCell = document.createElement("TD");
    let conPriceCell = document.createElement("TD");

    conIDCell.innerText = newRow.consumable_id;
    conNameCell.innerText = newRow.name;
    conDescCell.innerText = newRow.description;
    conPriceCell.innerText = newRow.price;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteConsumable(newRow.consumable_id);
    };

    row.appendChild(conIDCell);
    row.appendChild(conNameCell);
    row.appendChild(conDescCell);
    row.appendChild(conPriceCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.consumable_id);

    currentTable.appendChild(row);
}

