var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
    
mongoose.connect("mongodb://localhost/truck_data");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("publick"));

var formdataSchema = new mongoose.Schema({
    dataPartenca: String,
	targa: String,
	luogoP: String,
    merce: String,
    ton: String,
	luogoA: String,
	dataArrivo: String,
	kmCarico: String,
	kmVuoto: String,
	nPratica: String,
	nomeLavaggio: String,
    costoLavaggio: String,
	usoPompa: String,
	usoCompressore: String,
	quantitaServ: String,
	litriGasolio: String,
	luogoRiforn: String,
    image: String
});

var FormData = mongoose.model("FormData", formdataSchema);

    // FormData.create({
    //         dataPartenca: "Done",
    //         targa: "Done",
    //         luogoP: "Done",
    //         merce: "Done",
    //         ton: "Done",
    //         luogoA: "Done",
    //         dataArrivo: "Done",
    //         kmCarico: "Done",
    //         kmVuoto: "Done",
    //         nPratica: "Done",
    //         nomeLavaggio: "Done",
    //         costoLavaggio: "Done",
    //         usoPompa: "Done",
    //         usoCompressore: "Done",
    //         quantitaServ: "Done",
    //         litriGasolio: "Done",
    //         luogoRiforn: "Done",
    //         image: "Done"
    // }, function(err, allFormData){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log(allFormData);
    //     }
    // });
app.get("/", function(req, res) {
    res.redirect("/table");
})

app.get("/table", function(req, res){
    //Get all FromData from DB
    FormData.find({}, function(err, allFormData){
        if(err){
            console.log(err);
        } else{
            res.render("index", {formData: allFormData});
        }
    });
});

app.get("/formSubmit", function(req, res){
    res.render("formTrucker");
});

app.post("/table", function(req, res){
    //getting all data from forms and adding it to aray
    // var dataPartenca = req.body.dataPartenca,
    //     targa = req.body.targa,
    //     luogoP = req.body.luogoP,
    //     merce = req.body.merce,
    //     ton = req.body.ton,
    //     luogoA = req.body.luogoA,
    //     dataArrivo = req.body.dataArrivo,
    //     kmCarico = req.body.kmCarico,
    //     kmVuoto = req.body.kmVuoto,
    //     nPratica = req.body.nPratica,
    //     nomeLavaggio = req.body.nomeLavaggio,
    //     costoLavaggio = req.body.costoLavaggio,
    //     usoPompa = req.body.usoPompa,
    //     usoCompressore = req.body.usoCompressore,
    //     quantitaServ = req.body.quantitaServ,
    //     litriGasolio = req.body.litriGasolio,
    //     luogoRiforn = req.body.luogoRiforn,
    //     image = req.body.image;
    //     ////////////
    // var newDocument = {
    //     dataPartenca: dataPartenca,
    //     targa: targa,
    //     luogoP: luogoP,
    //     merce: merce,
    //     ton: ton,
    //     luogoA: luogoA,
    //     dataArrivo: dataArrivo,
    //     kmCarico: kmCarico,
    //     kmVuoto: kmVuoto,
    //     nPratica: nPratica,
    //     nomeLavaggio: nomeLavaggio,
    //     costoLavaggio: costoLavaggio,
    //     usoPompa: usoPompa,
    //     usoCompressore: usoCompressore,
    //     quantitaServ: quantitaServ,
    //     litriGasolio: litriGasolio,
    //     luogoRiforn: luogoRiforn,
    //     image: image
    // };
    // FormData.create(newDocument, function(err, newDataForm){
    FormData.create(req.body.truck, function(err, newDataForm){
        if(err){
            console.log(err);
        } else{
            res.redirect("/table");
        }
    });
});

// SHow Rout Wondering
app.get("table/:id", function(req, res) {
    FormData.findById(req.params.id, function(err, truck) {
        if(err){
            console.log(err);
        } else{
            res.render("show", {truck: truck});
        }
    });
});

// Edit Route
app.get("/table/:id/edit", function(req, res) {
    FormData.findById(req.params.id, function(err, truck){
        if(err){
            console.log(err);
        } else{
            res.render("edit", {truck: truck});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Truck is Running");
});








