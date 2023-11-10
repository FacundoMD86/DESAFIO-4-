import { model,Schema } from 'mongoose'

let collection = 'products'
//una coleccion es un espacio donde voy a almacenar un conjunto de docuemntos (en este caso: productos)
//en ingles, plural y representativo del recurso a operar
let schema = new Schema({
    title: { type:String, required:true },
    description: { type:String, required:true },
    code: { type:Number, required:true },
    price: { type:Number },
    status: Boolean,
    stock: { type:Number, required:true },
    category: { type:String, required:true },
    thumbnail:[], 
})

//un scema de datos configura la forma que debe tener CADA documento de mongo (nombre d ela propiedad, tipo de dato, si es unico, si es indexable )

const Producto = model(collection,schema)
export default Producto 