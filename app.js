const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exhbrs = require("express-handlebars");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

//dATABASE
const connectDB = require("./config/DB");
connectDB();

//IMPORT ROUTERS
const baseRouter = require("./routes/index");

//iNITIALIZE APP
const app = express();
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

//VIEW ENGINE
app.engine(".hbs", exhbrs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", ".hbs");

//STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

//USE ROUTERS
app.use("/", baseRouter);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server running on ${PORT} in ${process.env.NODE_ENV} mode`)
);
