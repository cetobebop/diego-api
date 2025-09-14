import { ClinicCasesMongoRepository } from "@services/ClinicCasesMongoRepository";
import { ClinicCasesService } from "@services/ClinicCasesService";
import { ObjectStorageFacade } from "@services/ObjectStorageFacade";
import { ENV_VARIABLES } from "configEnv";
import { ClinicCases } from "domain/ClinicCases/ClinicCases";
import { ClinicCasesId } from "domain/ClinicCases/ClinicCasesId";
import { PatientId } from "domain/Patient/PatientId";
import { PartialClinicCasesDto } from "dto/PartialClinicCasesDto";
import { ResponseStatus } from "enum/codeStatus";
import { InitializationError, NotFoundError } from "Errors/Errors";
import { responseErrorStatus } from "Errors/ResponseErrors";
import { IRequest, IResponse } from "types/RequestAndResponse";
import { getServerURL } from "utils/getServerURL";

const clinicService = new ClinicCasesService(new ClinicCasesMongoRepository())

class ClinicCasesControllers {

    async createClinicCase(req: IRequest, res: IResponse){
        try {

            if(!req.file) throw new InitializationError('file not provided')

            if(!req.data?.id) throw new InitializationError('userId not provided')

            const urlServer = getServerURL(req.file.filename)
            
            let url

            if (ENV_VARIABLES.PROD) {
                url = (await (new ObjectStorageFacade().sendFile(urlServer))).url
            }
            else url = urlServer

            const clinicCase = new ClinicCases(
                req.body.title, req.body.beginningDate,
                url, req.body.patientId, req.data.id,
                req.body.caseNumber
            )

            const created = await clinicService.createClinicCases(clinicCase)

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                clinicCase: created.toPrimitive()
            })

        } catch (error) {
            
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })

        }
    }

    async getClinicCaseByPatientId(req: IRequest, res: IResponse){
        try {

            const queryParams = req.queryParams 
            ? req.queryParams.toPrimitive() 
            : { skip: 0, limit: 30 }

            if(!req.data?.id)
                throw new InitializationError('userId not provided')

            const found = await clinicService.getClinicCasesByPatientId(new PatientId(req.body?.patientId), req.data.id, queryParams)

            if(!found.length) throw new NotFoundError('clinic cases not found')

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                clinicCases: found.map(el => el.toPrimitive())
            })

        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }
    }

    async getClinicCaseById(req:IRequest, res: IResponse){
        try {

            if(!req.data?.id)
            throw new InitializationError('userId not provided')

            const found = await clinicService.getClinicCaseById(new ClinicCasesId(req.params.id), req.data.id)

            if(!found) throw new NotFoundError('clinic case not found')

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                clinicCase: found.toPrimitive()
            })
        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }
    }

    async updateClinicCase(req: IRequest, res: IResponse){
        try {

            if(!req.data?.id) throw new InitializationError('userId not provided')

            let url 

            if(req.file){
                const urlServer = getServerURL(req.file.filename)

                if (ENV_VARIABLES.PROD) {
                    url = (await (new ObjectStorageFacade().sendFile(urlServer))).url
                }
                else url = urlServer
            }
   

            const clinicCaseDto = PartialClinicCasesDto.create({title: req.body?.title, beginningDate: req.body?.beginningDate, caseNumber: req.body?.caseNumber, url})
            const id = new ClinicCasesId(req.params.id)
             
            if(!req.data?.id) throw new InitializationError('userId not provided')

            const updated = await clinicService.updateClinicCase(id, clinicCaseDto.toPrimitive(), req.data.id)

            if(!updated) throw new NotFoundError('clinic cases not found')

            console.log('updated', updated.toPrimitive())
            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                clinicCase: updated.toPrimitive()
            })

        } catch (error) {
          
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })

        }
    }

    async deleteClinicCase(req: IRequest, res: IResponse){
        try {

            if(!req.data?.id)
            throw new InitializationError('userId not provided')

            const deleted = await clinicService.deleteClinicCase(new ClinicCasesId(req.params.id), req.data.id)

            if(!deleted) throw new NotFoundError('clinic cases not found')

            return res.status(200).json({
                status: ResponseStatus.SUCCESS
            })
        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }
    }

}


export default new ClinicCasesControllers()