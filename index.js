const bodyParser= require ('body-parser')
const express = require('express');
const app = express();
const {pokemon}= require('./pokedex.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res,next) => {
   return res.status(200).send("Bienvenido al pokedex");
});

app.post("/pokemon", (req,res,next) => {
   console.log(req);
 return res.status(200).send(req.body);
});

app.get("/pokemon/", (req,res,next) => {
      res.status(200);
      res.send(pokemon);
   });

app.get('/pokemon/:id([0-9]{1,3})', (req,res,next) => {
     const id = req.params.id-1;
     if(id >=0 && id <=150){
     return res.status(200).send(pokemon[req.params.id-1]);
     }else{
      res.status(404);
     return res.status(404).send("Pokemon not found")
     }
     
});

app.get('/pokemon/:name([A-Za-z]+)', (req,res,next) => {
    const name=req.params.name;

     const pk = pokemon.filter((p) => {
         return ( p.name.toUpperCase()==name.toUpperCase()) ? p : null
     });

     (pk.length >0) ? 
     res.status(200).send(pk): 
     res.status(404).send("Pokemon not found");
});

app.listen(process.env.PORT || 3000, () => {
   console.log("Server is running...");
});