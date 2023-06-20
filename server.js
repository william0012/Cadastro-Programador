const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser')
const programmer = require('./src/database/tables/programmer')

app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function syncDb(){
    const database = require('./src/database/db')
    try {
        database.sync();
        console.log("Database successfully sync")
    } catch (error) {
        console.log(`Ocorreu um erro ${error}`);
    }
}
syncDb();

app.get('/syncDatabase', async (req, res) => {
    const database = require('./database/db')
    try {
        await database.sync();
        res.send('Database successfully sync')
    } catch (error) {
        res.send(error);
    }
})
app.get('/', (req, res) => {
 
    res.sendFile('/index.html', { root: __dirname })
})
const validateProperties = (properties, params, fn)=>{
    try {
        const check = properties[fn]((property) =>{
            return property in params
            
        })
        if (!check){
            const propStr = properties.join(', ')
            throw `Request body does'nt have any of the following properties: ${propStr}`
        }
        
        return true;
    }catch(error){
  
        throw error
    }
}
app.post('/createProgrammer', async (req, res) => {
    params = req.body
  try{
    const properties = ['name', 'python', 'java', 'javascript']

    const check = properties.every((property)=>{
        return property in params
    })
    if (!check){
        const propStr = properties.join(', ')
        res.send(`All parameters need to create a programmer must be sent: ${propStr}`)
        return
    }
    const newProgrammer = await programmer.create({
        name: params.name,
        python: params.python,
        javascript: params.javascript,
        java: params.java
    })
    res.send(newProgrammer)
  }catch(error){
    res.send(error)
  }
})
app.get('/retrieveProgrammer', async (req, res) => {
try{
    if('id' in req){
        
        const record = await programmer.findByPk(req)
        console.log(req)
        if (record){
            res.send(record)
        }else{
            res.send("No programmer found using receied ID")
        }

        return
    }
   
    const records = await programmer.findAll()
    res.send(records)
}catch(error){
res.send(error)
}
})



app.listen(port, () => {
    console.log('escutando a porta:' + port)
})