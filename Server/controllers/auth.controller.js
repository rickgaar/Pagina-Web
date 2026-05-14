const User = require("../models/user.model");
const {createToken, verifyToken} = require("../utils/jwt.tools");
const Roles = require("../data/roles.constant.json")


const controller = {};

controller.register = async (req, res, next) =>{
    try {
        const {nombre, correo, password} = req.body;

        const user = await User.findOne({$or: [{nombre: nombre}, {correo: correo}]});
        if (user){
            return res.status(409).json({error:"El usuario ya existe"})
        }

        const newUser = new User({
            nombre: nombre,
            correo: correo,
            password: password,
            roles: [Roles.USER]

        })

        const _usuario = await newUser.save();
        return res.status(201).json({message: "El usuario ha sido registrado con exito"});
    } catch (error) {
        next(error);

    }
}

controller.login = async (req, res, next)=>{
try {
   // identificador: usuario o correo
   const {identifier, password} = req.body;
   const user = await User.findOne({$or: [{nombre: identifier}, {correo: identifier}]});
        if (!user){
            return res.status(404).json({error:"El usuario no existe"})
        }
    if(!user.comparePassword(password)){
        return res.status(401).json({error:"El password no existe"})
    }


    const token = await createToken(user._id);

    let _tokens = [...user.tokens];
    const _verifyPromises = _tokens.map(async (_t)=>{
        const status = await verifyToken(_t);
        return status ? _t : null;
    })

    _tokens= (await Promise.all(_verifyPromises)).filter(_t=>_t).slice(0,4);
    _tokens=[token, ..._tokens];
    user.tokens=_tokens;

    await user.save();

    return res.status(200).json({token});
    

} catch (error) {
    next(error);
}
}

controller.whoAmI=async (req, res, next) => {
try {



    const {_id,nombre, correo, puntos_totales, puntos_canjeables, roles, temas, lecciones, examenes, avatar_actual, avatares_disponibles} = req.user;
    return res.status(200).json({_id,nombre, correo, puntos_totales, puntos_canjeables, roles, temas, lecciones, examenes, avatar_actual, avatares_disponibles})



} catch (error) {
    next(error);

}
}


controller.rankingPosition=async (req, res, next) => {
    try {
    
    
        const {_id} = req.user;

        const ranking = await User.find({roles:{$ne:Roles.SYSADMIN, $ne:Roles.ADMIN}},
            {correo:0,puntos_canjeables:0, roles:0, temas:0, lecciones:0, examenes:0,hashedPassword:0,salt:0,tokens:0,__v:0,createdAt:0,updatedAt:0, avatares_disponibles:0})
        .sort({puntos_totales:-1});
        const position = ranking.findIndex(e=>e._id.equals(_id));

        return res.status(200).json({rankingPosition:position})
    
    
    } catch (error) {
        next(error);
    
    }
    }


controller.ranking=async (req, res, next) => {
    try {


        const ranking = await User.find({roles:{$ne:Roles.SYSADMIN, $ne:Roles.ADMIN}},


            {_id:0,correo:0,puntos_canjeables:0, roles:0, temas:0, lecciones:0, examenes:0,hashedPassword:0,salt:0,tokens:0,__v:0,createdAt:0,updatedAt:0, avatares_disponibles:0})

        .sort({puntos_totales:-1}).limit(5);
        return res.status(200).json({ranking})
    
    
    } catch (error) {
        next(error);
    
    }
    }


    controller.changeAvatar=async (req, res, next) => {
        try {

        const { avatar} = req.body;
        const {user} = req;
        const avatares_disponibles = user["avatares_disponibles"];
        const index = avatares_disponibles.findIndex(e=>e===avatar);
        if(index<0){
            return res.status(404).json({error:"Avatar no disponible"})
        }
        user["avatar_actual"]= avatar;
        const newUser = await user.save();
        return res.status(200).json({avatar_actual:newUser["avatar_actual"]});

        } catch (error) {
            next(error);
        
        }
        }
    
        controller.buyAvatar=async (req, res, next) => {
            try {
    
            const { avatar, puntos} = req.body;
            const {user} = req;
            const avatares_disponibles = user["avatares_disponibles"];
            const index = avatares_disponibles.findIndex(e=>e===avatar);
            if(index>=0){
                return res.status(409).json({error:"Ya tienes este avatar"})
            }
            const puntos_canjeables = user["puntos_canjeables"];
            if(puntos_canjeables<puntos){
                return res.status(409).json({error:"No tienes suficientes puntos"})
            }
            user["avatares_disponibles"]= [...avatares_disponibles,avatar];
            user["puntos_canjeables"]=puntos_canjeables-puntos;
            const newUser = await user.save();
            return res.status(200).json({avatares_disponibles:newUser["avatares_disponibles"]});
    
            } catch (error) {
                next(error);
            
            }
            }


module.exports = controller;