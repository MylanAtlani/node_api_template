const readline = require('readline');
const Users = require('../../models/users.models.js');
const mongoose = require("mongoose");
const username = "CertificateUser";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function migration(model) {
  parseModel(model)
}

async function connectMongo() {
  try {
    await mongoose.connect(`mongodb+srv://${encodeURIComponent(username)}@cluster0.nj1uo.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`,
      {
        ssl: true,
        sslKey: `../../config/rootCA.pem`,
        sslCert: `../../config/rootCA.pem`,
      }
    );
    console.log("Server started on port " + (process.env["PORT"] ? process.env["PORT"] : 3001));
  } catch (e) {
    console.error(e);
  }
}

async function progressiveUpdate(fields, time) {

  for (let i = 0; i < fields.length; i++) {
    await fields[i].save();
    await sleep(time);
  }
  console.log("All documents updated");
  process.exit(0);
}

async function progressiveFind(mod, limit) {
  let usersArray = [];
  let size = false;
  while (size === false) {
    sleep(200)
    let dbArray = await mod.find({}).limit(limit)
    console.log(dbArray);
    usersArray = usersArray.concat(dbArray);
    if (dbArray.length < limit) {
      console.log("End of the list");
      size = true;
    }
  }
  return usersArray;
}
async function updateUsers(Schema, mod) {
  await connectMongo();
  let fields = await progressiveFind(mod, 100);
  fields.forEach(field => {
    Object.keys(Schema).forEach(function(key, index) {
      if (field[key] === undefined && index.hasOwnProperty("default")) {
        field[key] = index.default;
      }
      return field;
    });
  });
  rl.question('Validez vous les changements ? (y/N)', function (confirm) {
    rl.question('Combien de temps entre chaque update ? (en ms)', function (time) {
      let timeInt = parseInt(time);
      if (confirm.toLowerCase() === "y" && Number.isInteger(timeInt) && timeInt > 0) 
          progressiveUpdate(fields, timeInt);
      else
          rl.close();
    });
  });
}

function parseModel(model){
  try {
    let Schema = null;
    switch (model.toLowerCase()) {
      case 'users':
        mod = Users;
        Schema = Users.schema.tree;
    }
    updateUsers(Schema, mod);
  } catch (err) {
    console.error(err);
  }
}

rl.question('Quel est le modèle à migrer ?', function (model) {
  rl.question(`${model}, est ce le bon modèle ? (y/N)`, function (confirm) {

    if (confirm.toLowerCase() === "y")
        migration(model);
    else
        rl.close();
  });
});

rl.on('close', function () {
  console.log('\nScript annulé ...');
  process.exit(0);
});