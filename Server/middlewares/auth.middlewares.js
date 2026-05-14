const {verifyToken} = require("../utils/jwt.tools")
const User = require("../models/user.model")
const Roles = require("../data/roles.constant.json");

const middlewares = {};
const PREFIX = "Bearer";

middlewares.authentication = async (req, res, next) => {
try {

    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: "El usuario no esta autenticado"});
    }

    const [prefix, token] =authorization.split(" ");

    if(prefix !== PREFIX){
        return res.status(401).json({error: "El usuario no esta autenticado"});
    }

    if(!token){
        return res.status(401).json({error: "El usuario no esta autenticado"});
    }

    const payload = await verifyToken(token);
    if(!payload){
        return res.status(401).json({error: "El usuario no esta autenticado"});
    }

    const userId = payload.sub;
    const user = await User.findById(userId);

    if(!user){
        return res.status(401).json({error: "El usuario no esta autenticado"});
    }

    const isTokenValid = user.tokens.includes(token);
    if(!isTokenValid){
        return res.status(401).json({error: "El usuario no esta autenticado"});
    }
    req.user = user;
    req.token = token;

    next();
} catch (error) {
    console.error(error);
    return res.status(500).json({error: "Internal server error"});
}
}

middlewares.authorization = (roleRequired=Roles.SYSADMIN) =>{
    return (req, res, next)=>{
        try {
            const {roles=[]}=req.user;

            const isAuth = roles.includes(roleRequired);
            const isSysAdmin = roles.includes(Roles.SYSADMIN);
            if(!isAuth && !isSysAdmin){
                return res.status(403).json({error: "Prohibido el acceso"})
            }

            next();
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal server error"});
        }
    }
}

module.exports = middlewares;