

const express=require("express")
const dns = require('node:dns');

const app=express()
app.use(express.json())
let name
let result
app.post("/getmeip",(req,res)=>{
   const {website_name}=req.body

   name=website_name
  //  console.log(name)
   dns.lookup(`${name}`, (err, address, family) => {
    result=address
    console.log(address)
  });
    res.send("Success")
})

console.log(result)



app.listen(7000,()=>{
    console.log("listening to the port 7000")
})