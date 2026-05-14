const Exam = require("../models/exam.model");
const Tema = require("../models/tema.model");
const Leccion = require("../models/lesson.model");

const controller = {};

controller.saveExam = async (req, res, next)=>{
    try {

        const { descripcion, nombre, ponderacion, temaId, tipo, idLeccion} = req.body;
        const {identifier} = req.params;

        const leccion = await Leccion.findById(idLeccion);
        if(!leccion){
            return res.status(404).json({error:"No se puede crear o actualizar un examen de una leccion que no existe"})
        }
        const leccionExamenes = leccion["examenes"];


        for (let index = 0; index < temaId.length; index++) {
            const tema = await Tema.findById(temaId[index]);
            if(!tema){
                return res.status(404).json({error:"No se puede insertar un tema que no existe"})

            }
        }

        let exam = await Exam.findById(identifier);

        if(!exam){
            exam = new Exam();
        }

        exam["descripcion"]=descripcion;
        exam["nombre"]=nombre;
        exam["temas"]=temaId;
        exam["tipo_Examen"]={
            ponderacion: ponderacion,
            tipo: tipo
        }

       const examSaved = await (await exam.save()).populate([{path: "temas", select:"nombre"},
       {path: "Pregunta_opcion_multiple", populate:{path:"tema",select:"nombre"}},
       {path: "Pregunta_match", populate:{path:"tema",select:"nombre"}}]);
       if(!examSaved){
        return res.status(409).json({error: "Error creating exam"});
       }


       const guardarExamenLeccion = leccionExamenes.findIndex(e=>e.equals(examSaved._id))>=0;
       if(!guardarExamenLeccion){
        leccion.examenes = [...leccionExamenes,examSaved._id];
        await leccion.save();
       }


       return res.status(201).json(examSaved);
    } catch (error) {
        next(error);
    }
}

controller.findExamById = async (req, res, next)=>{
    try {
        const {identifier} = req.params;

        const _exam = await Exam.findById(identifier);
        if(!_exam){
            return res.status(404).json({error: "Examen no encontrado"});
        }

       const exam = await (await Exam.findById(identifier)).populate([{path: "temas", select:"nombre"},
       {path: "Pregunta_opcion_multiple", populate:{path:"tema",select:"nombre"}},
       {path: "Pregunta_match", populate:{path:"tema",select:"nombre"}}]);
       return res.status(200).json({exam});
    } catch (error) {
        next(error);
    }
}

controller.deleteExamByID = async (req, res, next)=>{
    try {
       const {identifier} = req.params;


       const { idLeccion} = req.body;

        const leccion = await Leccion.findById(idLeccion);
        if(!leccion){
            return res.status(404).json({error:"No se puede eliminar un examen de una leccion que no existe"})
        }
        const leccionExamenes = leccion.examenes;


       const exam = await Exam.findByIdAndDelete(identifier);

       if(!exam){
        return res.status(404).json({error: "Examen no encontrado"});
       }


       leccion.examenes = leccionExamenes.filter(e=>e.toString()!==exam._id.toString());
        await leccion.save();


       return res.status(200).json({message: "Se ha eliminado el Examen"});
     } catch (error) {
        next(error);
     }
}


controller.toggleVisibility= async (req, res, next)=>{
    try {
        const {identifier} = req.params;
       const exam = await Exam.findById(identifier);
       const visibilidad=exam.visibilidad;
       if(visibilidad){
        exam.visibilidad=false;
       }else{
        exam.visibilidad=true;
       }
       const changedExam = await (await exam.save()).populate([{path: "temas", select:"nombre"},
       {path: "Pregunta_opcion_multiple", populate:{path:"tema",select:"nombre"}},
       {path: "Pregunta_match", populate:{path:"tema",select:"nombre"}}]);
       return res.status(200).json({changedExam});
    } catch (error) {
        next(error);
    }
}

controller.saveMultipleQuestion = async (req, res, next)=>{
    try {                                  
        const { imagenPregunta, enunciado, idPregunta, idTema} = req.body;
        const {identifier} = req.params;

        const exam = await Exam.findById(identifier);
        if(!exam){
            return res.status(404).json({error:"El examen no existe"})

        }

        const indexTema = exam.temas.findIndex(e=>e._id.equals(idTema));
        if(indexTema<0){
            return res.status(409).json({error: "El tema debe de ser uno de los del temario del examen"});
        }

        let preguntaOM = exam.Pregunta_opcion_multiple;
        
        const index = preguntaOM.findIndex(e=>e._id.equals(idPregunta));

        if(index<0){

            preguntaOM = [...preguntaOM, {
                enunciado: enunciado,
                imagen: imagenPregunta ? imagenPregunta : "",
                tema: idTema
            }]
        }else{
            preguntaOM[index] = {
                enunciado: enunciado,
                imagen: imagenPregunta ? imagenPregunta : "",
                tema: idTema
            }
        }
        exam.Pregunta_opcion_multiple=preguntaOM;
        
        const examSaved = await (await exam.save()).populate([{path: "temas", select:"nombre"},
        {path: "Pregunta_opcion_multiple", populate:{path:"tema",select:"nombre"}},
        {path: "Pregunta_match", populate:{path:"tema",select:"nombre"}}]);
       if(!examSaved){
        return res.status(409).json({error: "Error creating question"});
       }

       return res.status(201).json(examSaved);

       
    } catch (error) {

        next(error);
    }
}

controller.saveMatchQuestion = async (req, res, next)=>{
    try {                                 
        const { imagenPregunta, enunciado, idPregunta, idTema} = req.body;
        const {identifier} = req.params;

        const exam = await Exam.findById(identifier);
        if(!exam){
            return res.status(404).json({error:"El examen no existe"})

        }

        const indexTema = exam.temas.findIndex(e=>e._id.equals(idTema));
        if(indexTema<0){
            return res.status(409).json({error: "El tema debe de ser uno de los del temario del examen"});
        }


            let preguntaM = exam.Pregunta_match;
        
        const index = preguntaM.findIndex(e=>e._id.equals(idPregunta));

        if(index<0){

            preguntaM = [...preguntaM, {
                enunciado: enunciado,
                imagen: imagenPregunta ? imagenPregunta : "",
                tema: idTema
            }]
        }else{
            preguntaM[index] = {
                enunciado: enunciado,
                imagen: imagenPregunta ? imagenPregunta : "",
                tema: idTema
            }
        }
        exam.Pregunta_match=preguntaM;
        
        const examSaved = await (await exam.save()).populate([{path: "temas", select:"nombre"},
        {path: "Pregunta_opcion_multiple", populate:{path:"tema",select:"nombre"}},
        {path: "Pregunta_match", populate:{path:"tema",select:"nombre"}}]);
        
        if(!examSaved){
        return res.status(409).json({error: "Error creating question"});
       }

       return res.status(201).json(examSaved);
       
    } catch (error) {

        next(error);
    }
}

controller.examQuestions = async (req, res, next)=>{
    try {
        const { identifier} = req.params;
        
       const exam = await Exam.findById(identifier).populate([{path: "Pregunta_opcion_multiple", populate:{path:"tema",select:"nombre"}},
       {path: "Pregunta_match", populate:{path:"tema",select:"nombre"}}]);
       if(!exam){
        return res.status(404).json({error: "Examen no encontrado"});
       }
       return res.status(200).json({Pregunta_opcion_multiple: exam.Pregunta_opcion_multiple, Pregunta_match: exam.Pregunta_match});
    } catch (error) {

        next(error);
    }
}


controller.deleteMultipleQuestionByID = async (req, res, next)=>{
    try {
       const { identifier} = req.params;
       const { idPregunta} = req.body;


       const exam = await Exam.findById(identifier);

       if(!exam){
        return res.status(404).json({error: "Examen no encontrado"});
       }

        const preguntaOM = exam.Pregunta_opcion_multiple;
        
        exam.Pregunta_opcion_multiple = preguntaOM.filter(e=>e._id.toString()!==idPregunta.toString());
        
        const examSaved = await (await exam.save());
        if(!examSaved){
        return res.status(409).json({error: "Error deleting question"});
       }

       return res.status(200).json({message: "Se ha eliminado la pregunta"});


     } catch (error) {

        next(error);
     }
}

controller.deleteMatchQuestionByID = async (req, res, next)=>{
    try {
       const { identifier} = req.params;
       const { idPregunta} = req.body;


       const exam = await Exam.findById(identifier);

       if(!exam){
        return res.status(404).json({error: "Examen no encontrado"});
       }

        const preguntaM = exam.Pregunta_match;
        
        exam.Pregunta_match = preguntaM.filter(e=>e._id.toString()!==idPregunta.toString());
        
        const examSaved = await (await exam.save());
       if(!examSaved){
        return res.status(409).json({error: "Error deleting question"});
       }

       return res.status(200).json({message: "Se ha eliminado la pregunta"});

     } catch (error) {

        next(error);
     }
}

controller.saveMultipleQuestionAnswer = async (req, res, next)=>{
    try {                                              
        const { imagenRespuesta, descripcion, idPregunta, correcta, idRespuesta} = req.body;
        const {identifier} = req.params;

        const exam = await Exam.findById(identifier);
        if(!exam){
            return res.status(404).json({error:"El examen no existe"});

        }

        const preguntaOM = exam.Pregunta_opcion_multiple;
        
        const index = preguntaOM.findIndex(e=>e._id.equals(idPregunta));

        if(index<0){

            return res.status(404).json({error:"La pregunta no existe"});
        }

        let respuestas = preguntaOM[index].respuesta;
        const indexRespuesta = respuestas.findIndex(e=>e._id.equals(idRespuesta));

        if(indexRespuesta<0){
            respuestas = [...respuestas, {
                descripcion: descripcion,
                imagen: imagenRespuesta ? imagenRespuesta : "",
                correcta: correcta==1 ? true : false
            }]
        }else{
            respuestas[indexRespuesta] = {
                descripcion: descripcion,
                imagen: imagenRespuesta ? imagenRespuesta : "",
                correcta: correcta==1 ? true : false
            }
        }

        exam.Pregunta_opcion_multiple[index].respuesta=respuestas;
        
        const examSaved = await (await exam.save()).populate([{path: "temas", select:"nombre"},
        {path: "Pregunta_opcion_multiple", populate:{path:"tema",select:"nombre"}},
        {path: "Pregunta_match", populate:{path:"tema",select:"nombre"}}]);
       if(!examSaved){
        return res.status(409).json({error: "Error creating answer"});
       }

       return res.status(201).json(examSaved);

       
    } catch (error) {

        next(error);
    }
}

controller.saveMatchQuestionAnswer = async (req, res, next)=>{
    try {                                 
        const { imagenRespuesta, descripcion, idPregunta, tipo, idRespuesta} = req.body;
        const {identifier} = req.params;

        const exam = await Exam.findById(identifier);
        if(!exam){
            return res.status(404).json({error:"El examen no existe"});

        }

        const preguntaM = exam.Pregunta_match;
        
        const index = preguntaM.findIndex(e=>e._id.equals(idPregunta));

        if(index<0){

            return res.status(404).json({error:"La pregunta no existe"});
        }

        let respuestas = preguntaM[index].respuesta;
        const indexRespuesta = respuestas.findIndex(e=>e._id.equals(idRespuesta));

        if(indexRespuesta<0){
            respuestas = [...respuestas, {
                descripcion: descripcion,
                imagen: imagenRespuesta ? imagenRespuesta : "",
                tipo: tipo
            }]
        }else{
            respuestas[indexRespuesta] = {
                descripcion: descripcion,
                imagen: imagenRespuesta ? imagenRespuesta : "",
                tipo: tipo
            }
        }

        exam.Pregunta_match[index].respuesta=respuestas;
        
        const examSaved = await (await exam.save()).populate([{path: "temas", select:"nombre"},
        {path: "Pregunta_opcion_multiple", populate:{path:"tema",select:"nombre"}},
        {path: "Pregunta_match", populate:{path:"tema",select:"nombre"}}]);
       if(!examSaved){
        return res.status(409).json({error: "Error creating answer"});
       }

       return res.status(201).json(examSaved);
       
    } catch (error) {

        next(error);
    }
}


controller.deleteMultipleQuestionAnswerByID = async (req, res, next)=>{
    try {
       const { identifier} = req.params;
       const { idPregunta, idRespuesta} = req.body;


       const exam = await Exam.findById(identifier);

       if(!exam){
        return res.status(404).json({error: "Examen no encontrado"});
       }

        const preguntaOM = exam.Pregunta_opcion_multiple;
        
        const index = preguntaOM.findIndex(e=>e._id.equals(idPregunta));

        if(index<0){

            return res.status(404).json({error:"La pregunta no existe"});
        }

        const respuestas = preguntaOM[index].respuesta;
        exam.Pregunta_opcion_multiple[index].respuesta = respuestas.filter(e=>e._id.toString()!==idRespuesta.toString());
        
        const examSaved = await exam.save();
        if(!examSaved){
        return res.status(409).json({error: "Error deleting answer"});
       }

       return res.status(200).json({message: "Se ha eliminado la respuesta"});


     } catch (error) {

        next(error);
     }
}

controller.deleteMatchQuestionAnswerByID = async (req, res, next)=>{
    try {
        const { identifier} = req.params;
        const { idPregunta, idRespuesta} = req.body;
 
 
        const exam = await Exam.findById(identifier);
 
        if(!exam){
         return res.status(404).json({error: "Examen no encontrado"});
        }
 
         const preguntaM = exam.Pregunta_match;
         
         const index = preguntaM.findIndex(e=>e._id.equals(idPregunta));
 
         if(index<0){
 
             return res.status(404).json({error:"La pregunta no existe"});
         }
 
         const respuestas = preguntaM[index].respuesta;
         exam.Pregunta_match[index].respuesta = respuestas.filter(e=>e._id.toString()!==idRespuesta.toString());
         
         const examSaved = await exam.save();
         if(!examSaved){
         return res.status(409).json({error: "Error deleting answer"});
        }
 
        return res.status(200).json({message: "Se ha eliminado la respuesta"});
 
 
      } catch (error) {
 
         next(error);
      }
}


controller.beginExam = async (req, res, next)=>{
    const {user} = req;
    const {identifier} = req.params;
    const _examen = await Exam.findById(identifier);
    if(!_examen){
        return res.status(404).json({error:"El examen no existe"});
    }
    const _examenes = user.examenes;
    user["examenes"]=[..._examenes,{examen: identifier, fecha_hora_inicio: new Date() }];
    const newUser = await user.save();
    return res.status(200).json({examenes: newUser["examenes"]});
}

controller.endExam = async (req, res, next)=>{
    const {user} = req;
    const {identifier} = req.params;
    const {fecha_hora_inicio, calificacion}=req.body;

    const _examen = await Exam.findById(identifier);
    if(!_examen){
        return res.status(404).json({error:"El examen no existe"});
    }
    const _examenes = user.examenes;
    const index = _examenes.findIndex(e=>e.examen.equals(identifier) && fecha_hora_inicio.toString() === e.fecha_hora_inicio.toString() );
    if(index<0){
        return res.status(409).json({error:"El examen no ha sido empezado"});
    }else{
        if(user["examenes"][index]["fecha_hora_fin"]===null){
           user["examenes"][index]={examen:identifier, fecha_hora_inicio: fecha_hora_inicio,fecha_hora_fin: new Date(), calificacion: calificacion };

           const ponderacion=_examen.tipo_Examen.ponderacion;
           const puntos = calificacion*ponderacion/10;
           user["puntos_totales"] = user["puntos_totales"]+puntos;
           user["puntos_canjeables"] = user["puntos_canjeables"]+puntos;

    const newUser = await user.save();
    return res.status(200).json({examenes: newUser["examenes"]}); 
        }else{
            return res.status(409).json({error:"El examen ya ha sido terminada"})
        }
    }
    
}


module.exports = controller;