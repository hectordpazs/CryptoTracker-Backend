const axios = require ('axios')

const getPrices = async (prices) => {
    let pricesArray = [];
    for (let i = 0; i < prices.length; i++) {
        const resp = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${prices[i].name}`);
        pricesArray.push({name:`${prices[i].name}`, price:resp.data[0].current_price});
    }

    return pricesArray;
}

module.exports = {
    getPrices
}