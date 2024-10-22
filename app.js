const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageControllers")

const app = express();

//connect db
mongoose.connect("mongodb+srv://mertkocak:Lz7cLqOvMLbmu6hH@cluster0.j3clx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //urli okumayı sağlar (add.ejs den gelen form yapısı için gerekli)
app.use(express.json()); //json formatına dönüştürmeyi saglar (add.ejs den gelen form yapısı için gerekli)
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["GET", "POST"],
  }),
);

app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/photos/edit/:id", pageController.getEditPage);



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Sunucu başlatıldı.");
});
