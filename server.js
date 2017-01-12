var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var nodeadmin = require("nodeadmin");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("proiect", "mmadalina", "");

var Firma = sequelize.define("firma", {
  denumire: {
    type: Sequelize.STRING,
    unique: true,
    required: true
  },
  descriere: {
    type: Sequelize.STRING,
  },
  adresa: {
    type: Sequelize.STRING,
  },
  nr_telefon: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
});

var Anunt = sequelize.define("anunt", {
  nume: {
    type: Sequelize.STRING,
    required: true
  },
  descriere: {
    type: Sequelize.STRING,
    required: true
  },
  domeniu: {
    type: Sequelize.STRING,
    required: true
  },
  oras: {
    type: Sequelize.STRING,
    required: true
  },
  tip_oferta: {
    type: Sequelize.STRING,
  }
}, {
  freezeTableName: true
})

Firma.hasMany(Anunt, {
  foreignKey: "id_firma"
});
Anunt.belongsTo(Firma, {
  foreignKey: "id_firma"
});

var app = express();
app.use(express.static(__dirname + "/app"));
app.use(bodyParser.json());
app.use(nodeadmin(app));
app.use(cors());

app.get('/create', (req, res) => {
  sequelize.sync({
      force: true
    })
    .then(() => {
      res.status(201).send('created')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get("/firme", function(req, res) {
  Firma.findAll({
      attributes: ["id", "denumire", "descriere", "adresa", "nr_telefon"],
      include: [Anunt]
    })
    .then(function(firme) {
      res.status(200).send(firme);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la interogare baza de date");
    })
})

app.get("/firme/:id", (req, res) => {
  Firma.find({
      attributes: ["id", "denumire", "descriere", "adresa", "nr_telefon"],
      where: {
        id: req.params.id
      },
      include: [Anunt]
    })
    .then(function(firma) {
      res.status(200).send(firma);
    })
    .catch(function(error){
      console.log(error);
    })
})

app.post("/firme", function(req, res) {
  var firma = req.body;
  Firma.create(firma)
    .then(function() {
      res.status(200).send("adaugat");
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la adaugare firma");
    })
})

app.put("/firme/:id", function(req, res) {
  Firma.find({
      where: {
        id: req.params.id
      }
    })
    .then(function(firma) {
      firma.updateAttributes(req.body)
        .then(function() {
          res.status(200).send("actualizat");
        })
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la actualizare firma");
    })
})

app.delete("/firme/:id", function(req, res) {
  Firma.find({
      where: {
        id: req.params.id
      }
    })
    .then(function(firma) {
      firma.destroy()
        .then(function() {
          res.status(200).send("sters");
        })
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la stergere firma");
    })
})

app.get("/anunturi", function(req, res) {
  Anunt.findAll({
      attributes: ["id", "nume", "descriere", "domeniu", "tip_oferta","oras"],
      include: [Firma]
    })
    .then(function(anunturi) {
      res.status(200).send(anunturi);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la interogare anunturi");
    })
})

app.get("/anunturi/:id", function(req, res) {
  Anunt.find({
      attributes: ["id", "nume", "descriere", "domeniu", "tip_oferta","oras"],
      where: {
        id: req.params.id
      },
      include:[Firma]
    })
    .then(function(anunt) {
      res.status(200).send(anunt);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la obtinere anunt");
    })
})

app.post("/anunturi", function(req, res) {
  var anunt = req.body.anunt;
  anunt.id_firma = req.body.id_firma;
  Anunt.create(anunt)
    .then(function() {
      res.status(200).send("adaugat");
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la adaugare anunt");
    })
})

app.put("/anunturi/:id", function(req, res) {
  Anunt.find({
      where: {
        id: req.params.id
      }
    })
    .then(function(anunt) {
      res.status(200).send("actualizat");
      return anunt.updateAttributes(req.body);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la actualizare anunt");
    })
})

app.delete("/anunturi/:id", function(req, res) {
  Anunt.find({
      where: {
        id: req.params.id
      }
    })
    .then(function(anunt) {
      anunt.destroy()
        .then(function() {
          res.status(200).send("sters");
        })
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send("eroare la stergere anunt");
    })
})

app.listen(process.env.PORT);
