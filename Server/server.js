const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const ClientPath = path.join(__dirname,'../Client')

app.get('/',(req,res)=>{
   
    res.sendFile(path.join(__dirname,'../Client/index.html'))
})

app.use(express.static(ClientPath))


app.listen(port,function(err){
    if(err) console.log(err);
    console.log(`listening on ${port}`)
})