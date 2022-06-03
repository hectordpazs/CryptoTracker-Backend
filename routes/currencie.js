
/*
    Events Route
    /api/events
*/

const { Router } = require("express");
const {check} = require('express-validator');
const { createCurrencie, getCurrencies } = require("../controllers/currencie");
const { isMoreThanZero } = require("../helpers/isMoreThanZero");
const { renewToken } = require("../middlewares/renewToken");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//todas tienen que pasar por la validacion del JWT
router.use(renewToken);

// crear una currencie
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('invested', 'El valor debe ser un numero y mayor o igual 0').isNumeric().custom(isMoreThanZero),
        validarCampos
    ] ,
    createCurrencie 
    
);

router.get('/', getCurrencies)

module.exports = router;
