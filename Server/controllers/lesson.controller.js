
const Leccion = require("../models/lesson.model");
const Tema = require("../models/tema.model");
const Examen = require ("../models/exam.model")

const controller = {};


controller.save = async (req, res, next)=>{
    try {
        const { area_estudio, nombre, imagen} = req.body;
        const {identifier} = req.params;
        const {user} = req;


        let leccion = await Leccion.findById(identifier);

        if(!leccion){
            leccion = new Leccion();
        }

        leccion["area_estudio"]=area_estudio;
        leccion["nombre"]=nombre;
        leccion["imagen"]=imagen;

       const leccionSaved = await (await leccion.save()).populate("temas");

       if(!leccionSaved){
        return res.status(409).json({error: "Error creating lesson"});
       }
       return res.status(201).json(leccionSaved);
    } catch (error) {

        next(error);
    }
}

controller.lessonTopics = async (req, res, next)=>{
    try {
        const {identifier} = req.params;

        const _leccion = await Leccion.findById(identifier);
        if(!_leccion){
            return res.status(404).json({error: "Leccion no encontrada"});
        }

       const leccion = await Leccion.findById(identifier).populate("temas");
       return res.status(200).json({"temas": leccion["temas"]});
    } catch (error) {
        next(error);

    }
}


controller.lessonExams = async (req, res, next)=>{
    try {
        const {identifier} = req.params;

        const _leccion = await Leccion.findById(identifier);
        if(!_leccion){
            return res.status(404).json({error: "Leccion no encontrada"});
        }

       const leccion = await Leccion.findById(identifier).populate("examenes");
       return res.status(200).json({"examenes": leccion["examenes"]});
    } catch (error) {
        next(error);

    }
}


controller.findAll = async (req, res, next)=>{
    try {
       const leccion = await Leccion.find().populate("temas");
       return res.status(200).json({leccion});
    } catch (error) {

        next(error);
    }
}


controller.deleteByID = async (req, res, next)=>{
    try {
       const {identifier} = req.params;

       const leccion = await Leccion.findByIdAndDelete(identifier);

       if(!leccion){
        return res.status(404).json({error: "Leccion no encontrada"});
       }


       const leccionTemas = leccion.temas;

       for (let index = 0; index < leccionTemas.length; index++) {
        const element = leccionTemas[index];
        await Tema.findByIdAndDelete(element);
        
       }


       const leccionExamenes = leccion.examenes;

       for (let index = 0; index < leccionExamenes.length; index++) {
        const element = leccionExamenes[index];
        await Examen.findByIdAndDelete(element);
        
       }
       
       return res.status(200).json({message: "Se ha eliminado la leccion y sus temas y examenes"});

     } catch (error) {

        next(error);
     }
}


controller.toggleVisibility= async (req, res, next)=>{
    try {
        const {identifier} = req.params;
       const lesson = await Leccion.findById(identifier);
       const visibilidad=lesson.visibilidad;
       if(visibilidad){
        lesson.visibilidad=false;
       }else{
        lesson.visibilidad=true;
       }

       const leccion = await (await lesson.save()).populate("temas");

       return res.status(200).json({leccion});
    } catch (error) {
        next(error);
    }
}


controller.beginLesson = async (req, res, next)=>{
    const {user} = req;
    const {identifier} = req.params;
    const _leccion = await Leccion.findById(identifier);
    if(!_leccion){
        return res.status(404).json({error:"La leccion no existe"});
    }
    const _lecciones = user.lecciones;
    if(_lecciones.findIndex(e=>e.leccion.equals(identifier))>=0){

        return res.status(409).json({error:"La leccion ya ha sido empezada"});

    }
    user["lecciones"]=[..._lecciones,{leccion: identifier, fecha_hora_inicio: new Date() }];
    const newUser = await user.save();
    return res.status(200).json({lecciones: newUser["lecciones"]});
}

controller.endLesson = async (req, res, next)=>{
    const {user} = req;
    const {identifier} = req.params;
    const _leccion = await Leccion.findById(identifier);
    if(!_leccion){
        return res.status(404).json({error:"La leccion no existe"});
    }
    const _lecciones = user.lecciones;
    const index = _lecciones.findIndex(e=>e.leccion.equals(identifier));
    if(index<0){
        return res.status(409).json({error:"La leccion no ha sido empezado"});
    }else{
        if(user["lecciones"][index]["fecha_hora_fin"]===null){
           user["lecciones"][index]={leccion:identifier, fecha_hora_inicio: user["lecciones"][index]["fecha_hora_inicio"],fecha_hora_fin: new Date() };
    const newUser = await user.save();
    return res.status(200).json({lecciones: newUser["lecciones"]}); 
        }else{
            return res.status(409).json({error:"La leccion ya ha sido terminada"})
        }
    }
    
}



module.exports = controller;