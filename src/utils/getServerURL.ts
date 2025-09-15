import {ENV_VARIABLES} from 'configEnv'


export function getServerURL(filename: string){
    console.log(ENV_VARIABLES.MY_SERVER_URL)
    return `${ENV_VARIABLES.MY_SERVER_URL}/public/${filename}`
}