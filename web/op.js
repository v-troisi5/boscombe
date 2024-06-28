function makeTablesInvisible(){
    for(let i = 1; i <= 8; i++){
        let tb = document.getElementById(`operazione` + i + `-div`);
        if(tb != null)
            tb.style.display = 'none';
    }
}

function showOp(operation) {
    makeTablesInvisible();
    document.getElementById(operation + `-div`).style.display = 'block';
    document.getElementById(operation + `-table`).getElementsByTagName('tbody')[0].innerHTML = '';
}

function eseguiOp(operation) {
    if(operation == 'operazione4'){
        sedeID = document.getElementById('op4sedeID').value;

        fetch(`/boscombe/prove/sedi/` + sedeID)
            .then(response => response.json())
            .then(data => op4FormatTable(data))
            .catch(error => console.error('Errore durante l\'operazione 4', error));
    }
    else if(operation == 'operazione5'){
        clienteID = document.getElementById('op5clienteID').value;
        tipoIncarico = document.getElementById('op5tipoIncarico').value;

        fetch(`/boscombe/clienti/` + clienteID + `/incarichi/` + tipoIncarico)
            .then(response => response.json())
            .then(data => op5FormatTable(data))
            .catch(error => console.error('Errore durante l\'operazione 5', error));
    }
}

function op4FormatTable(data) {
    console.log(data)
    const table = document.getElementById(`operazione4-table`).getElementsByTagName('tbody')[0];

    data.esperti[0].forEach(
        function(e){
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = e._id;
            cell = row.insertCell();
            cell.textContent = e.nome;
            cell = row.insertCell();
            cell.textContent = e.cognome;
            cell = row.insertCell();
            cell.textContent = e.professione;
        });
}

function op5FormatTable(data) {
    console.log(data)
    const table = document.getElementById(`operazione5-table`).getElementsByTagName('tbody')[0];

    data.result.forEach(
        function(elem){
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = elem._id;
            cell = row.insertCell();
            cell.textContent = elem.investigatoreID;
            cell = row.insertCell();
            cell.textContent = elem.sedeID._id;
            cell = row.insertCell();
            cell.textContent = elem.sedeID.nome;
    });
}