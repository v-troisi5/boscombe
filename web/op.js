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
        let sedeID = document.getElementById('op4sedeID').value;

        fetch(`/boscombe/prove/sedi/` + sedeID)
            .then(response => response.json())
            .then(data => op4FormatTable(data))
            .catch(error => console.error('Errore durante l\'operazione 4', error));
    }
    else if(operation == 'operazione5'){
        let clienteID = document.getElementById('op5clienteID').value;
        let tipoIncarico = document.getElementById('op5tipoIncarico').value;

        fetch(`/boscombe/clienti/` + clienteID + `/incarichi/` + tipoIncarico)
            .then(response => response.json())
            .then(data => op5FormatTable(data))
            .catch(error => console.error('Errore durante l\'operazione 5', error));
    }
    else if(operation == 'operazione6'){
        let testPrimario = document.getElementById('op6testPrimario').value;
        let dataInsediamento = document.getElementById('op6dataInsediamento').value;

        fetch(`/boscombe/sedi/prove/test/` + testPrimario + `/` + dataInsediamento)
            .then(response => response.json())
            .then(data => op6FormatTable(data))
            .catch(error => console.error('Errore durante l\'operazione 6', error));
    }
    else if(operation == 'operazione7'){
        let costoOrario = document.getElementById('op7costoOrario').value;

        fetch(`/boscombe/informatori/incarichi/` + costoOrario)
            .then(response => response.json())
            .then(data => op7FormatTable(data))
            .catch(error => console.error('Errore durante l\'operazione 7', error));
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

function op6FormatTable(data) {
    console.log(data)
    const table = document.getElementById(`operazione6-table`).getElementsByTagName('tbody')[0];

    data.result.forEach(
        function(elem){
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = elem.sedeID._id;
            cell = row.insertCell();
            cell.textContent = elem.sedeID.nome;
            cell = row.insertCell();
            cell.textContent = elem.sedeID.via;
            cell = row.insertCell();
            cell.textContent = elem.sedeID.civico;
    });
}

function op7FormatTable(data) {
    console.log(data)
    const table = document.getElementById(`operazione7-table`).getElementsByTagName('tbody')[0];

    data.informatori.forEach(
        function(elem){
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = elem.informatoreID._id;
            cell = row.insertCell();
            cell.textContent = elem.informatoreID.codice_fiscale;
            cell = row.insertCell();
            cell.textContent = elem.informatoreID.nome;
            cell = row.insertCell();
            cell.textContent = elem.informatoreID.cognome;
            cell = row.insertCell();
            cell.textContent = elem.informatoreID.paga;
            cell = row.insertCell();
            cell.textContent = elem.informatoreID.descrizione;
            
            //Sotto-tabella contatti
            cell = row.insertCell();

            let contattiTable = document.createElement('table');

            let contattiTableTHead = document.createElement('thead');
            let contattiTableTopRow = document.createElement('tr');

            let contattiIDContattoHeader = document.createElement('th');
            contattiIDContattoHeader.appendChild(document.createTextNode('ID contatto'));
            let contattiTipoContattoHeader = document.createElement('th');
            contattiTipoContattoHeader.appendChild(document.createTextNode('Tipo contatto'));
            
            contattiTableTopRow.appendChild(contattiIDContattoHeader);
            contattiTableTopRow.appendChild(contattiTipoContattoHeader);

            contattiTableTHead.appendChild(contattiTableTopRow);

            let contattiTableTBody = document.createElement('tbody');
            contattiTable.appendChild(contattiTableTHead);
            contattiTable.appendChild(contattiTableTBody);

            cell.appendChild(contattiTable);

            elem.informatoreID.contatti.forEach(
                function(contatto){
                    let contattiRow = contattiTableTBody.insertRow();
                    contattiCell = contattiRow.insertCell();
                    contattiCell.textContent = contatto.id_contatto;
                    contattiCell = contattiRow.insertCell();
                    contattiCell.textContent = contatto.tipo_contatto;
                }
            )
    });
}