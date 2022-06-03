const {response} = require('express');
const Wallet = require ('../models/Wallet');
const bcrypt = require('bcryptjs');


const getWallet = async (req, res=response)=>{

    const uid = req.uid;

    const wallet = await Wallet.find({user:uid}).populate('user', 'name');

    res.status(200).json({
        ok:true,
        wallet
    })
}

const createWallet = async (req, res=response)=>{

    const {uid} = req;
    const {password} = req.body

    try {

        let wallet = await Wallet.findOne({user:uid});
        
        if (wallet){
            return res.status(400).json({
                ok: false,
                msg: 'Ya posees Wallet!'
            })
        }

        wallet = new Wallet(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        wallet.password = bcrypt.hashSync( password, salt);

        wallet.user = req.uid;

        const savedWallet = await wallet.save();

        res.status(201).json({
            ok:true,
            wallet: savedWallet
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'hable con un admin'
        })
    }
    
}

const loginWallet = async (req, res= response)=>{

    const {password} = req.body;
    const {uid} = req;

    try {

        const wallet = await Wallet.findOne({user:uid});

        if (!wallet){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no posee wallet'
            })
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password, wallet.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Password Incorrecto'
            })
        }

        res.status(200).json({
            ok:true,
            wallet
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
}

module.exports = {
    getWallet,
    createWallet,
    loginWallet
}