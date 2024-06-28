document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.tab').click();
});

function openTab(event, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tab');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.className += ' active';

    //Fetch
    fetchTabData(tabName.toLowerCase());
}

function fetchTabData(tabName) {
    if(tabName != 'operazioni'){
        fetch(`/boscombe/${tabName}`)
            .then(response => response.json())
            .then(data => updateTable(tabName, data))
            .catch(error => console.error('Errore nel fetching:', error));
    }
}

function updateTable(tabName, data) {
    console.log(data)
    const table = document.getElementById(`${tabName}-table`).getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    if(tabName == 'investigatori'){
        data.result.forEach(item => {
            const row = table.insertRow();

            let cell = row.insertCell();
            let span = document.createElement("span");
            let link = document.createElement("a");
            link.setAttribute('href', `#`);
            link.setAttribute('onclick', 'showInvestigatore(\'' + item._id + '\');return false;');
            link.textContent = item._id;
            span.appendChild(link);
            cell.appendChild(span);

            cell = row.insertCell();
            cell.textContent = item.matricola;
            cell = row.insertCell();
            cell.textContent = item.nominativo;
            cell = row.insertCell();
            cell.textContent = item.codice_fiscale;

            cell = row.insertCell();
            span = document.createElement("span");
            link = document.createElement("a");
            link.setAttribute('href', `#`);
            link.setAttribute('onclick', 'showInvestigatore(\'' + item._id + '\');return false;');
            link.textContent = item._id;
            span.appendChild(link);
            cell.appendChild(span);
        });
    }
    else if(tabName == 'sedi'){
        data.result.forEach(item => {
            const row = table.insertRow();

            let cell = row.insertCell();
            let span = document.createElement("span");
            let link = document.createElement("a");
            link.setAttribute('href', `#`);
            link.setAttribute('onclick', 'showEsperti(\'' + item._id + '\');return false;');
            link.textContent = item._id;
            span.appendChild(link);
            cell.appendChild(span);

            cell = row.insertCell();
            cell.textContent = item.nome;
            cell = row.insertCell();
            cell.textContent = item.via;
            cell = row.insertCell();
            cell.textContent = item.civico;
        });
    }
    else if(tabName == 'informatori'){
        data.result.forEach(item => {
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = item._id;
            cell = row.insertCell();
            cell.textContent = item.codice_fiscale;
            cell = row.insertCell();
            cell.textContent = item.nome;
            cell = row.insertCell();
            cell.textContent = item.cognome;
            cell = row.insertCell();
            cell.textContent = item.paga;
            cell = row.insertCell();
            cell.textContent = item.descrizione;
        });
    }
    else if(tabName == 'prove'){
        data.result.forEach(item => {
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = item._id;
            cell = row.insertCell();
            cell.textContent = item.nome;
            cell = row.insertCell();
            cell.textContent = item.protocollo;
            cell = row.insertCell();
            cell.textContent = item.luogo_ottenimento;
            cell = row.insertCell();
            cell.textContent = item.test_primario;
            cell = row.insertCell();
            cell.textContent = item.volatilità;
        });
    }
    else if(tabName == 'clienti'){
        data.result.forEach(item => {
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = item._id;
            cell = row.insertCell();
            cell.textContent = item.nominativo;
            cell = row.insertCell();
            cell.textContent = item.recapito;
        });
    }
}

function showInvestigatore(id) {
    const table = document.getElementById(`incarichi-table`).getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    fetch(`/boscombe/investigatori/` + id)
        .then(response => response.json())
        .then(function(inv){ 
            console.log(inv)
            inv.result.incarichi.forEach(item => {
                const row = table.insertRow();

                let cell = row.insertCell();
                cell.textContent = item._id;
                cell = row.insertCell();
                cell.textContent = item.tipo_incarico;
                cell = row.insertCell();
                cell.textContent = item.costo_orario;
                
                cell = row.insertCell();
                span = document.createElement("span");
                link = document.createElement("a");
                link.setAttribute('href', `#`);
                link.setAttribute('onclick', 'showCliente(\'' + item.clienteID + '\');return false;');
                link.textContent = item.clienteID;
                span.appendChild(link);
                cell.appendChild(span);
            })
        })
        .catch(error => console.error('Errore nel fetching dell\'investigatore:', error));
}

function showCliente(id) {
    const table = document.getElementById(`incarichi-clienti-table`).getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    fetch(`/boscombe/clienti/` + id)
        .then(response => response.json())
        .then(function(cliente){ 
            console.log(cliente)
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = cliente.result._id;
            cell = row.insertCell();
            cell.textContent = cliente.result.nominativo;
            cell = row.insertCell();
            cell.textContent = cliente.result.recapito;
        })
        .catch(error => console.error('Errore nel fetching del cliente:', error));
}

function showEsperti(id) {
    const table = document.getElementById(`sedi-esperti-table`).getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    fetch(`/boscombe/sedi/` + id + `/esperti`)
        .then(response => response.json())
        .then(function(data){
            data.forEach(
                function(esperto){
                    const row = table.insertRow();

                    let cell = row.insertCell();
                    cell.textContent = esperto._id;
                    cell = row.insertCell();
                    cell.textContent = esperto.nome;
                    cell = row.insertCell();
                    cell.textContent = esperto.cognome;
                    cell = row.insertCell();
                    cell.textContent = esperto.professione;
                }
            )
        })
        .catch(error => console.error('Errore nel fetching degli esperti:', error));
}
