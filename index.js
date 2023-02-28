const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
//express app
const app = express();


const usersRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const carsShopRouter = require("./routes/cars_shop");
const carsnewRouter = require("./routes/carsnew");
const carsusedRouter = require("./routes/carsused");
const schoolsRouter = require("./routes/schools");
const maintainRouter = require("./routes/maintain");
const accessShopRouter = require("./routes/accessories_shop");
const accessRouter = require("./routes/accessories");


//middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("images"));

//routes
app.use("/users",usersRouter);
app.use("/admins", adminRouter);
app.use("/carsshops", carsShopRouter);
app.use("/newcars", carsnewRouter);
app.use("/usedcars", carsusedRouter);
app.use("/schools", schoolsRouter);
app.use("/maintains",maintainRouter);
app.use("/accessShops", accessShopRouter);
app.use("/accessories", accessRouter);
app.get("/", (req, res) => {  
res.json({ mssg: "Welcom to the app" });
});


//database connection
mongoose.connect("mongodb://127.0.0.1:27017/gpproject", (err) => {
  if (!err) return console.log("DB Connected");
  console.log(err);
});

//listen for requsts
app.listen(process.env.PORT, () => {
  console.log(`listening on port`, process.env.PORT);
});


const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

app.use(cors());
