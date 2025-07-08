import mongoose from "mongoose";
import { ENV_VARIABLES } from "../configEnv";

const uri = `mongodb+srv://${ENV_VARIABLES.DB_USER}:${ENV_VARIABLES.DB_PASSWORD}@cluster0.mpi76g7.mongodb.net/apppacientes?retryWrites=true&w=majority&appName=Cluster0`

export default (async function (){
    try {
        await mongoose.connect(uri)
        console.log('db conectada')
    } catch (error) {
        console.log('hubo un error en la bd')
        console.log(error)
        process.exit(1)
    }
})()