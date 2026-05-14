const Tema = require("../models/tema.model");
const Leccion = require("../models/lesson.model");


const controller = {};

controller.save = async (req, res, next)=>{
    try {
        const { contenido, nombre, ponderacion, imagen,idLeccion} = req.body;
        const {identifier} = req.params;

        let tema = await Tema.findById(identifier);
        const leccion = await Leccion.findById(idLeccion);
        if(!leccion){
            return res.status(404).json({error:"No se puede crear o actualizar un tema de una leccion que no existe"})
        }
        const leccionTemas = leccion["temas"];

        if(!tema){
            tema = new Tema();
        }

        tema["contenido"]=contenido;
        tema["nombre"]=nombre;
        tema["ponderacion"]=ponderacion;

        if(imagen){
            tema["imagen"]=imagen;
        }

       const temaSaved = await tema.save();
       if(!temaSaved){
        return res.status(409).json({error: "Error creating tema"});
       }

       const guardarTemaLeccion = leccionTemas.findIndex(e=>e.equals(temaSaved._id))>=0;
       if(!guardarTemaLeccion){
        leccion.temas = [...leccionTemas,temaSaved._id];
        await leccion.save();
       }

       return res.status(201).json(temaSaved);
    } catch (error) {
        next(error);
    }
}

controller.findById = async (req, res, next)=>{
    try {
        const {identifier} = req.params;
       const tema = await Tema.findById(identifier);
       return res.status(200).json({tema});
    } catch (error) {
        next(error);
    }
}

controller.deleteByID = async (req, res, next)=>{
    try {
       const {identifier} = req.params;

       const { idLeccion} = req.body;

        const leccion = await Leccion.findById(idLeccion);
        if(!leccion){
            return res.status(404).json({error:"No se puede eliminar un tema de una leccion que no existe"})
        }
        const leccionTemas = leccion.temas;


       const tema = await Tema.findByIdAndDelete(identifier);

       if(!tema){
        return res.status(404).json({error: "Tema no encontrado"});
       }

      
        leccion.temas = leccionTemas.filter(e=>e.toString()!==tema._id.toString());
        await leccion.save();

       return res.status(200).json({message: "Se ha eliminado el tema"});
     } catch (error) {
        next(error);
     }
}


controller.toggleVisibility= async (req, res, next)=>{
    try {
        const {identifier} = req.params;
       const tema = await Tema.findById(identifier);
       const visibilidad=tema.visibilidad;
       if(visibilidad){
        tema.visibilidad=false;
       }else{
        tema.visibilidad=true;
       }
       const changedTema = await tema.save();
       return res.status(200).json({changedTema});
    } catch (error) {
        next(error);
    }
}


controller.beginTema = async (req, res, next)=>{
    const {user} = req;
    const {identifier} = req.params;
    const _tema = await Tema.findById(identifier);
    if(!_tema){
        return res.status(404).json({error:"El tema no existe"});
    }
    const _temas = user.temas;
    if(_temas.findIndex(e=>e.tema.equals(identifier))>=0){
        return res.status(409).json({error:"El tema ya ha sido empezado"});
    }
    user["temas"]=[..._temas,{tema: identifier, fecha_hora_inicio: new Date() }];
    const newUser = await user.save();
    return res.status(200).json({temas: newUser["temas"]});
}

controller.endTema = async (req, res, next)=>{
    const {user} = req;
    const {identifier} = req.params;
    const _tema = await Tema.findById(identifier);
    if(!_tema){
        return res.status(404).json({error:"El tema no existe"});
    }
    const _temas = user.temas;
    const index = _temas.findIndex(e=>e.tema.equals(identifier));
    if(index<0){
        return res.status(409).json({error:"El tema no ha sido empezado"});
    }else{
        if(user["temas"][index]["fecha_hora_fin"]===null){
           user["temas"][index]={tema:identifier, fecha_hora_inicio: user["temas"][index]["fecha_hora_inicio"],fecha_hora_fin: new Date() };
           user["puntos_totales"] = user["puntos_totales"]+_tema.ponderacion;
           user["puntos_canjeables"] = user["puntos_canjeables"]+_tema.ponderacion;
    const newUser = await user.save();
    return res.status(200).json({temas: newUser["temas"], puntos_canjeables: newUser["puntos_canjeables"],puntos_totales: newUser["puntos_totales"]}); 
        }else{
            return res.status(409).json({error:"El tema ya ha sido terminado"})
        }
    }
    
}

module.exports = controller;