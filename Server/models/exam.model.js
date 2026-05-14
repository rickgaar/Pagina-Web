const { Schema, model } = require("mongoose");
const examSchema = new Schema(
    {
      descripcion: {
        type: String,
        required: true,
        trim: true
      },
      nombre: {
        type: String,
        required: true,
        trim: true
      },
      visibilidad: {
        type: Boolean,
        default: false
      },
      Pregunta_opcion_multiple:{
        type:[{
            imagen: {

                type: String,
                default: ""

              },
            enunciado:{
                type: String,
                trim: true,
                required: true
            },

            tema:{
              type:Schema.Types.ObjectId,
                  ref:"Tema",
                  required: true
            },

            respuesta:{
                type:[{
                    descripcion:{
                        type:String,
                        trim: true,
                        required: true
                    },
                    correcta:{
                        type: Boolean,
                        required:true
                    },
                    imagen:{

                        type: String,
                        default: ""
                    }
                }],
                default: []

            }
        }],
        default: []
      },
      Pregunta_match:{
        type:[{
            imagen: {

                type: String,
                default: ""

              },
            enunciado:{
                type: String,
                trim: true,
                required: true
            },

            tema:{
              type:Schema.Types.ObjectId,
                  ref:"Tema",
                  required: true
            },

            respuesta:{
                type:[{
                    descripcion:{
                        type:String,
                        trim: true,
                        required: true
                    },
                    tipo:{
                        type: Number,
                        required:true
                    },
                    imagen:{

                        type: String,
                        default: ""
                    }
                }],
                default: []

            }
        }],
        default: []
      },
      temas:{
        type:[Schema.Types.ObjectId],
            ref:"Tema",
            required: true
      },
      tipo_Examen:{
        type:{
            tipo:{
                type: String,
                required: true,
                trim: true
            },
            ponderacion: {
                type: Number,
                required: true
            }
        }
      }
    },
    {
      timestamps: true,
    }
  );
  module.exports = model("Exam", examSchema);