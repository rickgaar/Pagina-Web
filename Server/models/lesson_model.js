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
      }
    },
    {
      timestamps: true,
    }
  );
  module.exports = model("Leccion", leccionSchema);