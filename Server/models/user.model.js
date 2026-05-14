const { Schema, model } = require("mongoose");


const crypto = require("crypto");
const debug = require("debug")("app:user-model");

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true,

    },
    salt: {
        type: String,

    },
    puntos_totales: {
        type: Number,
        default: 0
    },
    puntos_canjeables: {
        type: Number,
        default: 0
    },
    tokens: {
        type: [String],
        default: []
    },

    roles: {

        type: [String],
        default: []

    },

    avatar_actual:{
        type: String,
        default: "https://i.pinimg.com/1200x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg"
    },
    avatares_disponibles:{
        type: [String],
        default: ["https://i.pinimg.com/1200x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg"]
    },


    temas: {

        type: [{
            tema: {
                type: Schema.Types.ObjectId,
                ref: "Tema",
                required: true
            },
            fecha_hora_inicio: {
                type: Schema.Types.Date,
                required: true
            },
            fecha_hora_fin: {
                type: Schema.Types.Date,
                default: null
            }
        },

        ],
        default: []

    },
    lecciones: {

        type: [{
            leccion: {
                type: Schema.Types.ObjectId,
                ref: "Leccion",
                required: true
            },
            fecha_hora_inicio: {
                type: Schema.Types.Date,
                required: true
            },
            fecha_hora_fin: {
                type: Schema.Types.Date,
                default: null
            }
        }
        ],
        default: []

    },
    examenes: {

        type: [{
            examen: {
                type: Schema.Types.ObjectId,
                ref: "Exam",
                required: true
            },
            fecha_hora_inicio: {
                type: Schema.Types.Date,
                required: true
            },
            fecha_hora_fin: {
                type: Schema.Types.Date,
                default: null
            },
            calificacion:{
                type: Number,
                default: null
            }
        }
        ],
        default: []

    }


}, {

    timestamps: true
})
usuarioSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return "";
        try {

            const _password = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000, 64,
                "sha512"
            ).toString("hex");
            return _password;
        } catch (error) {
            debug({ error });

            return "";
        }
    },
    makeSalt: function () {
        return crypto.randomBytes(16).toString("hex");
    },
    comparePassword: function (password) {
        return this.hashedPassword === this.encryptPassword(password);
    }
}

usuarioSchema

    .virtual("password")
    .set(function (password = crypto.randomBytes(16).toString) {
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })


module.exports = model("Usuario", usuarioSchema);