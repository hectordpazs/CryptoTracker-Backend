/*
    Events Route
    /api/events
*/

const { Router } = require("express");
const {check} = require('express-validator');
const { getWallet, createWallet, loginWallet } = require("../controllers/wallet");
const { renewToken } = require("../middlewares/renewToken");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//todas tienen que pasar por la validacion del JWT
router.use(renewToken);

// obtener wallet personal
router.get('/' ,getWallet);

// crear una wallet
router.post('/',
    [
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ] ,
    createWallet
);

router.post('/login',
    [
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ] ,
    loginWallet
);

// actualizar un evento
/*router.put('/:id' ,updateEvent);

// borrar evento
router.delete('/:id' ,deleteEvent);*/

module.exports = router;