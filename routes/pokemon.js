const express =  require('express')
const pokemon = express.Router()
const db = require ('../config/database')

pokemon.post("/", (req,res,next) => {
    console.log(req);
  return res.status(200).send(req.body);
 });
 
 pokemon.get("/", async (req,res,next) => {
       const pkmn = await db.query("SELECT * FROM pokemon");
       return res.status(200).json({code: 1,message: pkmn});
       
    });
 
 pokemon.get('/:id([0-9]{1,3})',async (req,res,next) => {
      const id = req.params.id-1;
      if(id >=0 && id <=722){
      const pkmn= await db.query("SELECT * FROM pokemon WHERE pok_id= " + id + ":");
      return res.status(200).json({code:1,message: pkmn});
      }else{
      return res.status(404).send({code:404, message: "Pokemon not found"});
      }
    
 });
 
 pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmm = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';");
    if (pkmm.length > 0) {
        return res.status(200).json(pkmm);
    }
    return res.status(404).send("Pokémon no encontrado");
});

module.exports = pokemon;