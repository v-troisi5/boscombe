function makeTablesInvisible(){
    for(let i = 1; i <= 8; i++){
        let tb = document.getElementById(`operazione` + i + `-div`);
        if(tb != null)
            tb.style.display = 'none';
    }
    document.getElementById('errorLabel').innerHTML = '';
}

function op1MakeContatti(){
    let form = document.getElementById(`op1Form`);

    let idContattoInput = document.createElement('input');
    idContattoInput.setAttribute('type', 'text');
    idContattoInput.setAttribute('placeholder', 'Contatto');
    idContattoInput.setAttribute('name', 'id_contatto');

    let tipoContattoInput = document.createElement('input');
    tipoContattoInput.setAttribute('type', 'text');
    tipoContattoInput.setAttribute('placeholder', 'Tipo di contatto');
    tipoContattoInput.setAttribute('name', 'tipo_contatto');

    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createTextNode('Informazioni di contatto:'));
    form.appendChild(document.createElement('br'));
    form.appendChild(idContattoInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(tipoContattoInput);
}

function showOp(operation) {
    makeTablesInvisible();
    document.getElementById(operation + `-div`).style.display = 'block';
    document.getElementById(operation + `-table`).getElementsByTagName('tbody')[0].innerHTML = '';
}

function eseguiOp(event, operation) {
    event.preventDefault();
    let errorLabel = document.getElementById('errorLabel');

    if(operation == 'operazione1'){
        const formData = new FormData();
        formData.append(document.getElementById('op1_codice_fiscale').getAttribute('name'), document.getElementById('op1_codice_fiscale').value);
        formData.append(document.getElementById('op1_nome').getAttribute('name'), document.getElementById('op1_nome').value);
        formData.append(document.getElementById('op1_cognome').getAttribute('name'), document.getElementById('op1_cognome').value);
        formData.append(document.getElementById('op1_paga').getAttribute('name'), document.getElementById('op1_paga').value);
        formData.append(document.getElementById('op1_descrizione').getAttribute('name'), document.getElementById('op1_descrizione').value);
        formData.append(document.getElementById('op1_area_competenza').getAttribute('name'), document.getElementById('op1_area_competenza').value);
        formData.append(document.getElementById('op1_titolo_studio').getAttribute('name'), document.getElementById('op1_titolo_studio').value);

        let contatti = [];
        let j = 0;
        document.getElementsByName('id_contatto').forEach(function(id){
            let tipo = document.getElementsByName('tipo_contatto')[j];

            let contattoObject = {};
            contattoObject.id_contatto = id.value;
            contattoObject.tipo_contatto = tipo.value;
            contatti.push(contattoObject);

            j++;
        })

        console.log(contatti)
        
        let formDataObject = {};
        formData.forEach(function(value, key){
            formDataObject[key] = value;
        });

        formDataObject.contatti = contatti;
        var json = JSON.stringify(formDataObject);

        console.log(json)

        async function sendConsulente(){
            const rawResponse = await fetch(`/boscombe/informatori/consulenti/`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: json
            });
            const content = await rawResponse.json();
          
            op1FormatTable(content);
        }
        sendConsulente();
    }
    else if(operation == 'operazione2'){
        let nomeSede = document.getElementById('op2_nomeSede').value;

        async function doOp2(){
            const rawResponse = await fetch(`/boscombe/informatori/contattiSede/` + nomeSede, {
              method: 'DELETE'
            });
            const content = await rawResponse.json();

            op2FormatTable(content);
        }
        doOp2();
    }
    else if(operation == 'operazione4'){
        let sedeID = document.getElementById('op4sedeID').value;

        fetch(`/boscombe/prove/sedi/` + sedeID)
            .then(response => response.json())
            .then(data => op4FormatTable(data))
            .catch(error => errorLabel.innerHTML = 'Nessun risultato.');
    }
    else if(operation == 'operazione5'){
        let clienteID = document.getElementById('op5clienteID').value;
        let tipoIncarico = document.getElementById('op5tipoIncarico').value;

        fetch(`/boscombe/clienti/` + clienteID + `/incarichi/` + tipoIncarico)
            .then(response => response.json())
            .then(data => op5FormatTable(data))
            .catch(error => errorLabel.innerHTML = 'Nessun risultato.');
    }
    else if(operation == 'operazione6'){
        let testPrimario = document.getElementById('op6testPrimario').value;
        let dataInsediamento = document.getElementById('op6dataInsediamento').value;

        fetch(`/boscombe/sedi/prove/test/` + testPrimario + `/` + dataInsediamento)
            .then(response => response.json())
            .then(data => op6FormatTable(data))
            .catch(error => errorLabel.innerHTML = 'Nessun risultato.');
    }
    else if(operation == 'operazione7'){
        let costoOrario = document.getElementById('op7costoOrario').value;

        fetch(`/boscombe/informatori/incarichi/` + costoOrario)
            .then(response => response.json())
            .then(data => op7FormatTable(data))
            .catch(error => errorLabel.innerHTML = 'Nessun risultato.');
    }
    else if(operation == 'operazione8'){
        let nominativo = document.getElementById('op8nominativo').value;
        let tipoIncarico = document.getElementById('op8tipoIncarico').value;

        fetch(`/boscombe/clienti/incarichi/` + nominativo + `/` + tipoIncarico)
            .then(response => response.json())
            .then(data => op8FormatTable(data))
            .catch(error => errorLabel.innerHTML = 'Nessun risultato.');
    }
}

function op1FormatTable(data) {
    console.log(data)
    const table = document.getElementById(`operazione1-table`).getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    const consulente = data.result;

    let cell = row.insertCell();
    cell.textContent = consulente.informatoreID;
    cell = row.insertCell();
    cell.textContent = consulente.area_competenza;
    cell = row.insertCell();
    cell.textContent = consulente.titolo_studio;

    cell = row.insertCell();
    let deleteConsulenteButton = document.createElement('button');
    deleteConsulenteButton.setAttribute('style','background-color: darkred; min-width: 100%;');
    deleteConsulenteButton.setAttribute('onclick','deleteConsulente(\'' + consulente.informatoreID +'\');return false;');
    deleteConsulenteButton.appendChild(document.createTextNode("Elimina"));
    cell.appendChild(deleteConsulenteButton);
}

function op2FormatTable(data) {
    console.log(data)
    const table = document.getElementById(`operazione2-table`).getElementsByTagName('tbody')[0];

    const row = table.insertRow();

    let cell = row.insertCell();
    cell.textContent = data.result.matchedCount;
    cell = row.insertCell();
    cell.textContent = data.result.modifiedCount;
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

function op8FormatTable(data) {
    console.log(data)
    const table = document.getElementById(`operazione8-table`).getElementsByTagName('tbody')[0];

    data.result.forEach(
        function(elem){
            const row = table.insertRow();

            let cell = row.insertCell();
            cell.textContent = new Date(elem._id.$date);
            cell = row.insertCell();
            cell.textContent = elem.sommaCostiOrari;
    });
}

function deleteConsulente(id){
    async function doDeleteConsulente(){
        const rawResponse = await fetch(`/boscombe/informatori/consulenti/` + id, {
          method: 'DELETE'
        });
        const content = await rawResponse.json();

        document.getElementById('operazione1-table').getElementsByTagName('tbody')[0].innerHTML = "";
    }
    doDeleteConsulente();
}