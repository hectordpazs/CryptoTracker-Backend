const axios = require ('axios')

const fetch = async (name)=>{

    const validNames = ['bitcoin', 'ethereum', 'ripple' , 'tether', 'bitcoin-cash', 'litecoin' , 'eos', 'okb' , 'tezos' , 'cardano'];
    
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${name}`

    if(!validNames.includes(name)){
        return false;
    }

    const resp = await axios.get(url);
    
    return resp.data

}

module.exports = {
    fetch
}