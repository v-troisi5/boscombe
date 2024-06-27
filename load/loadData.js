const {MongoClient} = require('mongodb');
const fs = require('fs');
const { join } = require('./sedes.js');

const mongoUri = "mongodb://127.0.0.1:27017/";
const dbName = "boscombe";

async function main() {

  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected");

    const db = client.db(dbName);
    
    //Clienti
    let collectionName = "clientes";
    let data = require('./clientes.js');
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    let result = await currentCollection.insertMany(data);
    console.log(`Inserted: ${result.insertedCount} documents` + ' in ' + collectionName);

    //Sedi
    collectionName = "sedes";
    data = require('./sedes.js');
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    result = await currentCollection.insertMany(data);
    console.log(`Inserted: ${result.insertedCount} documents` + ' in ' + collectionName);

    //Informatori
    collectionName = "informatores";
    data = require('./informatores.js');
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    result = await currentCollection.insertMany(data);
    console.log(`Inserted: ${result.insertedCount} documents` + ' in ' + collectionName);

    //Investigatori
    collectionName = "investigatores";
    data = require('./investigatores.js');
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    result = await currentCollection.insertMany(data);
    console.log(`Inserted: ${result.insertedCount} documents` + ' in ' + collectionName);

    //Aggiorno investigatoreID negli incarichi degli investigatori
    /*
    console.log("Aggiorno investigatoreID negli incarichi");
    data.forEach(async function(i){
        await currentCollection.updateMany({ _id: i._id, 'incarichi.0': {'$exists': true }}, {$set: {"incarichi.0.investigatoreID": i._id}});
    });
    data.forEach(async function(i){
        await currentCollection.updateMany({ _id: i._id, 'incarichi.1': {'$exists': true }}, {$set: {"incarichi.1.investigatoreID": i._id}});
    });
    data.forEach(async function(i){
        await currentCollection.updateMany({ _id: i._id, 'incarichi.2': {'$exists': true }}, {$set: {"incarichi.2.investigatoreID": i._id}});
    });
    */

    //Aggiungo gli incarichi
    console.log("Aggiungo gli incarichi");
    collectionName = "incaricos";
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    data.forEach(async function(c){
      c.incarichi.forEach((async function(i){
        await currentCollection.insertOne(i);
      }))
    });

    //Aggiorno i clienti con gli incarichi
    console.log("Aggiorno i clienti con gli incarichi");
    currentCollection = db.collection("clientes");
    data.forEach(async function(c){
      c.incarichi.forEach((async function(i){
        await currentCollection.updateMany({ _id: i.clienteID }, {$push: {incarichi: i}});
      }))
    });

    //Afferenze
    collectionName = "afferenzas";
    data = require('./afferenzas.js');
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    result = await currentCollection.insertMany(data);
    console.log(`Inserted: ${result.insertedCount} documents` + ' in ' + collectionName);

    //Collaborazioni
    collectionName = "collaboraziones";
    data = require('./collaboraziones.js');
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    result = await currentCollection.insertMany(data);
    console.log(`Inserted: ${result.insertedCount} documents` + ' in ' + collectionName);

    //Consulenti
    collectionName = "consulentes";
    data = require('./consulentes.js');
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    result = await currentCollection.insertMany(data);
    console.log(`Inserted: ${result.insertedCount} documents` + ' in ' + collectionName);

    //Prova
    collectionName = "provas";
    data = require('./provas.js');
    db.collection(collectionName).drop();
    currentCollection = db.collection(collectionName);
    result = await currentCollection.insertMany(data);
    console.log(`Inserted: ${result.insertedCount} documents` + ' in ' + collectionName);
  } 
  catch(error){
    console.log(error)
  }
}

main()