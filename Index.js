const express = require("express");
const db=require("../backend/db/db")
const Routers = require("./routes/routes");


const app = express();

const cors =require("cors")
app.use(express.static(__dirname));

app.use(express.json({limit: '500mb', extended: true}));

app.use(cors())
app.listen(4000, () => {
  console.log("connected to db & listening on port 4000");
});
app.use("/api/", Routers);
app.post('/razorpay',(req,res)=>{})