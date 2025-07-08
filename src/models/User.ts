
import { Schema, model } from "mongoose";
import { IUser } from "types/IUser";
import bcrypt from "bcryptjs"

const UserSchema = new Schema<IUser>({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function(next){
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword
    next()
})


export const UserModel = model('Users', UserSchema)