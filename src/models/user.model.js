import mongoose from "mongoose";

let collection = "User"
let schema = new Schema({
    name: { type: String, default: 'https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg'},
    photo: { type: String, required: true},
    mail: { type: String, unique: true, index: true, required: true },
    age: { type: Number },
    role: { type: Number, default: 0 },
    password: { type: String, required: true }
})
let User = mongoose.model (collection, schema)
export default User