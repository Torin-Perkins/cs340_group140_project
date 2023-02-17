window.addEventListener('DOMContentLoaded', function(){
    var new_guardian = document.getElementById("new-guardian");
    var update_guardian = document.getElementById("update-guardian");
    var delete_guardian = document.getElementById("delete-guardian");

    var new_guardian_accept = document.getElementById("new-guardian-accept");
    var update_guardian_accept = document.getElementById("update-guardian-accept");
    var delete_guardian_accept = document.getElementById("delete-guardian-accept");

    var new_rank = document.getElementById("new-rank");
    var new_rank_accept = document.getElementById("new-rank-accept");

    var new_guardian_rank = document.getElementById('new-guardian-rank');
    var new_guardain_rank_accept = document.getElementById("new-guardian-rank-accept");

    var new_weapon = document.getElementById("new-weapon");
    var new_weapon_accept = document.getElementById("new-weapon-accept");

    var new_cosmetic = document.getElementById("new-cosmetic");
    var new_cosmetic_accept = document.getElementById("new-cosmetic-accept");

    var new_consumable = document.getElementById('new-consumable');
    var new_consumable_accept = document.getElementById('new-consumable-accept');

    var new_sale = document.getElementById("new-sale");
    var new_sale_accept = document.getElementById("new-sale-accept");

    if(new_guardian){
        new_guardian.addEventListener('click', showNewGuardian);
    }

    if(update_guardian){
        update_guardian.addEventListener('click', showUpdateGuardian);
    }

    if(new_guardian_rank){
        new_guardian_rank.addEventListener('click', showNewGuardianRank);
    }

    if(new_guardian_rank_accept){
        new_guardain_rank_accept.addEventListener('click', hideNewGuardinRank);
    }

    if(delete_guardian){
        delete_guardian.addEventListener('click', showDeleteGuardian);
    }

    if(new_guardian_accept){
        new_guardian_accept.addEventListener('click', hideNewGuardian);
    }

    if(update_guardian_accept){
        update_guardian_accept.addEventListener('click', hideUpdateGuardian);
    }

    if(delete_guardian_accept){
        delete_guardian_accept.addEventListener('click', hideDeleteGuardian);
    }

    if(new_rank){
        new_rank.addEventListener('click', showNewRank);
    }

    if(new_rank_accept){
        new_rank_accept.addEventListener('click', hideNewRank);
    }

    if(new_weapon){
        new_weapon.addEventListener('click', showNewWeapon);
    }

    if(new_weapon_accept){
        new_weapon_accept.addEventListener('click', hideNewWeapon);
    }

    if(new_cosmetic){
        new_cosmetic.addEventListener('click', showNewCosmetic);
    }

    if(new_cosmetic_accept){
        new_cosmetic_accept.addEventListener('click', hideNewCosmetic);
    }

    if(new_consumable){
        new_consumable.addEventListener('click', showNewConsumable);
    }

    if(new_consumable_accept){
        new_consumable_accept.addEventListener('click', hideNewConsumable);
    }

    if(new_sale){
        new_sale.addEventListener('click', showNewSale);
    }

    if(new_sale_accept){
        new_sale_accept.addEventListener('click', hideNewSale);
    }
});

function showNewGuardian(){
    var new_guardian_modal = document.getElementById("new-guardian-modal");
    new_guardian_modal.classList.remove('hidden');
}

function hideNewGuardian(){
    var new_guardian_modal = document.getElementById("new-guardian-modal");
    new_guardian_modal.classList.add('hidden');
}

function showUpdateGuardian(){
    var new_guardian_modal = document.getElementById("update-guardian-modal");
    new_guardian_modal.classList.remove('hidden');
}

function hideUpdateGuardian(){
    var new_guardian_modal = document.getElementById("update-guardian-modal");
    new_guardian_modal.classList.add('hidden');
}

function showDeleteGuardian(){
    var new_guardian_modal = document.getElementById("delete-guardian-modal");
    new_guardian_modal.classList.remove('hidden');
}

function hideDeleteGuardian(){
    var new_guardian_modal = document.getElementById("delete-guardian-modal");
    new_guardian_modal.classList.add('hidden');
}

function showNewRank(){
    var modal = document.getElementById("new-rank-modal");
    modal.classList.remove('hidden');
}

function hideNewRank(){
    var modal = document.getElementById("new-rank-modal");
    modal.classList.add('hidden');
}

function showNewGuardianRank(){
    var modal = document.getElementById("new-guardian-rank-modal");
    modal.classList.remove('hidden');
}

function hideNewGuardinRank(){
    var modal = document.getElementById("new-guardian-rank-modal");
    modal.classList.add('hidden');
}


function showNewWeapon(){
    var modal = document.getElementById("new-weapon-modal");
    modal.classList.remove('hidden');
}

function hideNewWeapon(){
    var modal = document.getElementById("new-weapon-modal");
    modal.classList.add('hidden');
}

function showNewCosmetic(){
    var modal = document.getElementById("new-cosmetic-modal");
    modal.classList.remove('hidden');
}

function hideNewCosmetic(){
    var modal = document.getElementById("new-cosmetic-modal");
    modal.classList.add('hidden');
}

function showNewConsumable(){
    var modal = document.getElementById("new-consumable-modal");
    modal.classList.remove('hidden');
}

function hideNewConsumable(){
    var modal = document.getElementById("new-consumable-modal");
    modal.classList.add('hidden');
}

function showNewSale(){
    var modal = document.getElementById("new-sale-modal");
    modal.classList.remove('hidden');
}

function hideNewSale(){
    var modal = document.getElementById("new-sale-modal");
    modal.classList.add('hidden');
}