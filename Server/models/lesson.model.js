const { Schema, model } = require("mongoose");
const leccionSchema = new Schema(
    {
      area_estudio: {
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
      imagen: {
        type: String,
        required: true,

      },
      temas:{

        type:[Schema.Types.ObjectId],


            ref:"Tema",
            default: []


      },
      examenes:{

        type:[Schema.Types.ObjectId],


            ref:"Exam",
            default: []


      }
    },
    {
      timestamps: true,
    }
  );
  module.exports = model("Leccion", leccionSchema);