const { Schema, model } = require("mongoose");
const temaSchema = new Schema(
    {
      contenido: {
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
        type: [String],
        default: []
      },
      ponderacion: {
        type: Number,
        required: true
      }
    },
    {
      timestamps: true,
    }
  );
  module.exports = model("Tema", temaSchema);