

const express=require("express")
const fs=require("fs")

const app=express()

const PORT=8001

app.use(express.json())

let products

fs.readFile("./products.json",(err,data)=>{
    data=JSON.parse(data)
    products=data
  })
  

function syncProductsJson(){
    fs.writeFile("./products.json",JSON.stringify(products,null),(err)=>{
     console.log(err);
    })
     }


app.get("/products",(req,res)=>{

   return res.send({
        products
    })
})
app.post("/products/create",(req,res)=>{

    try{
    const {product_name}=req.body
    let max=0
    products.forEach(item=>{
        max=Math.max(max,item.id)
    })
     let data={
        id:max+1,
        product_name,
        time:new Date()   
     }
    products.push(data)

    syncProductsJson()
 
   return res.send("product added successfully")
    }
    catch(err){
        return res.send("something  went wrong")
    }
})


app.delete("/products/:id",(req,res)=>{

    let {id}=req.params
    id=parseInt(id)

  try{
    let index=null

    products.forEach((item,i)=>{

        if(item.id==id){
            index=i
        }
    })

    if(index===null){
        throw new Error("Product Doesn't Exist")
     
    }
    products.splice(index,1)
    syncProductsJson()

  }
   catch(err){
    return res.send("Product not found")

   }
 
 return res.send("Product deleted successfully")

    
})

app.patch("/products/:id",(req,res)=>{

    let {id}=req.params
    let {product_name}=req.body
    let index=null

    products.forEach((item,i)=>{

        if(item.id==id){
            index=i
        }
    })
    // console.log(index)
    products[index].product_name=product_name
    syncProductsJson()
    return res.send("updated")

})


app.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`)
})