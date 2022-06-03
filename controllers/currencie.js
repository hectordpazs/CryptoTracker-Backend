
const {response} = require('express');
const Currencie = require('../models/Currencie');
const Wallet = require('../models/Wallet');
const { fetch } = require('../helpers/fetch');
const {getPrices} = require('../helpers/getPrices');

const createCurrencie = async (req, res= response)=>{

    try {

        const uid = req.uid;
        let {name, invested} = req.body;

        const wallet = await Wallet.findOne({user:uid});

        const coin = await fetch(name);

        if(!coin){
            return res.status(400).json({
                ok:false,
                error: {
                    message: 'No existe esa criptomoneda! o la api no la reconoce'
                }
            })
        }

        const {id, current_price} = coin[0];

        //cantidad de moneda, actualizar el model

        let cantidad_moneda = invested/current_price;

        let currencie = await Currencie.findOne({name, wallet:wallet.id});

        if(currencie){

            const nuevaCantidad = {
                ...req.body,
                invested: currencie.invested+invested,
                cantidad_moneda: cantidad_moneda+currencie.cantidad_moneda
            }
    
            const currencieActualizada = await Currencie.findByIdAndUpdate(currencie.id, nuevaCantidad, {new:true});

            return res.json({
                ok:true,
                currencie: currencieActualizada,
                
            })
        }

        currencie = new Currencie(req.body);

        currencie.wallet = wallet.id;
        currencie.cantidad_moneda = cantidad_moneda;

        const savedCurrencie = await currencie.save();

        res.json({
            ok:true,
            currencie: savedCurrencie,
            
        })

    } catch (error) {
        res.json({
            ok:false,
            error
        })
    }

}

const getCurrencies = async (req, res)=>{
    const uid = req.uid;

    const wallet = await Wallet.findOne({user:uid});

    if(wallet){
        const {id} = wallet

        let currencie = await Currencie.find({wallet:id});
        
        //const prices = await getPrices(currencie);

        //let newArray = currencie.concat(prices);

        res.status(200).json({
            ok:true,
            currencie
        })
    }else{
        res.status(404).json({
            ok:false,
            message: 'No existe la wallet'
        })
    }
    
}

module.exports = {
    createCurrencie,
    getCurrencies
}