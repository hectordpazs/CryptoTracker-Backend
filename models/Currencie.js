const {Schema, model} = require('mongoose');

const CurrencieSchema = Schema({
    name:{
        type: String,
        required: true
    },

    invested:{
        type:Number,
        default: 0
    },

    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },

    cantidad_moneda:{
        type: Number,
        default: 0
    }
});

module.exports = model('Currencie', CurrencieSchema);