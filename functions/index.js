const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors')
const fetch = require('node-fetch')
var wialon = require('wialon')

// Configs
const admin = require("firebase-admin");
admin.initializeApp();
app.use(cors({ origin: true }));
var opts = {
    authz:{
        token: '<TOKENWIALON>'
    }
}

// Requests

app.post('/endereco/:nome', async (req, res) =>{
    const dados = await searchItem(400051160, 0x1 | 0x400 | 0x800000);
    if(!dados){
        res.send({
            redirect_to_blocks: ["erro"]
        })
        return;
    }
    const latitude = dados.item.pos.y;
    const longitude = dados.item.pos.x;

    let endereco = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+dados.item.pos.y+','+dados.item.pos.x+'&key=<CHAVEGOOGLE>',
        {method: 'POST'})
            .then(resp => {
                return resp.json();
            })
            .then(json => {
                return json.results[0].formatted_address;
            });

    let resposta = {
        set_attributes: {
            endereco: endereco,
            latitude: latitude,
            longitude: longitude
        },
    }
   
    res.send(resposta);
})

// Funções

async function searchItem(id, flags){

    let params = { 
        id: id,
        flags: flags,
    }

    let session = wialon(opts).session;
    let dados;

    await session.request('core/search_item', params)
        .then((data) =>{
            dados = data;
            return;
        }).catch((err) =>{
            console.log(err)
        })
    
    return dados;
}

exports.test = functions.https.onRequest(app)