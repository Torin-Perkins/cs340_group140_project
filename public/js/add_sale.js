// starter code adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

let addGrForm = document.getElementById('add-sale-form-ajax');

addGrForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputGuardian = document.getElementById('input-guardian').value;
    let inputWeapon = document.getElementById('input-weapon').value;
    let inputCosmetic = document.getElementById('input-cosmetic').value;
    let inputConsumable = document.getElementById('input-consumable').value;

    let sale_data = {
        guardian_id: inputGuardian,
        weapon_id: inputWeapon,
        cosmetic_id: inputCosmetic,
        consumable_id: inputConsumable
    }


    console.log(sale_data)

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-s-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            document.getElementById('input-guardian').value = '';
            document.getElementById('input-weapon').value = '0';
            document.getElementById('input-cosmetic').value = '0';
            document.getElementById('input-consumable').value = '0';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(sale_data));
})

addRowToTable = (sale_data) => {
    console.log(sale_data);
    let currentTable = document.getElementById('sale_table');

    let parsedData = JSON.parse(sale_data);
    let newRow = parsedData[parsedData.length - 1]
    console.log(parsedData)
    let row = document.createElement("TR");
    let saleIDCell = document.createElement("TD");
    let salePriceCell = document.createElement("TD");
    let saleGuardianCell = document.createElement("TD");
    let saleWeaponCell = document.createElement("TD");
    let saleCosmeticCell = document.createElement("TD");
    let saleConsumableCell = document.createElement("TD");

    saleIDCell.innerText = newRow.sale_id;
    salePriceCell.innerText = newRow.total_price;
    saleGuardianCell.innerText = newRow.Guardian;
    saleWeaponCell.innerText = newRow.Weapon;
    saleCosmeticCell.innerText = newRow.Cosmetic;
    saleConsumableCell.innerText = newRow.Consumable;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSale(newRow.sale_id);
    };

    row.appendChild(saleIDCell);
    row.appendChild(salePriceCell);
    row.appendChild(saleGuardianCell);
    row.appendChild(saleWeaponCell);
    row.appendChild(saleCosmeticCell);
    row.appendChild(saleConsumableCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.sale_id);

    currentTable.appendChild(row);
}

