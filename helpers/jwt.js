const jwt = require ('jsonwebtoken');

const generateJWT = (uid, name)=>{

    return new Promise ((resolve, reject)=>{
        const payload = {uid, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '30d'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject ('No se pudo general el token');
            }

            resolve (token);
        })
    })

}

module.exports = {
    generateJWT
}