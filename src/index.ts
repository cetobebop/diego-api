import app from "./app";
import { ENV_VARIABLES } from "configEnv";
import './config/db'


import { PatientSearchParams } from "dto/SearchParams/PatientSearchParams";
import { PatientModel } from "@models/Patient";
import { PatientAggregationQuery } from "dto/PatientAggregationQuery/PatientAggregationQuery";
import { PipelineStage } from "mongoose";


const port = ENV_VARIABLES.PORT



    // const q = new PatientSearchParams(' 06-11-2018 ')


    // // console.log(q)

    // const pa = new PatientAggregationQuery('patients', q, '686574a530cf005b520829c8')
    // const query = pa.getAggregationQuery()
    // // console.log(query)

    // if(query) PatientModel.aggregate(query as unknown as PipelineStage[]).then(e => console.log(e))
    // else console.log('pipeline is null')



app.listen(port,()=>{
    console.log('app listening in port: ' + port)
})








