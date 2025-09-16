import app from "app";
import { ENV_VARIABLES } from "configEnv";
import '@config/db'
import { test } from "test/main";


const port = ENV_VARIABLES.PORT

test()
 

app.listen(port,()=>{
    console.log('app listening in port: ' + port)
})








