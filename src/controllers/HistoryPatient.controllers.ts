import { HistoryPatientMongoRepository } from "@services/HistoryPatientMongoRepository";
import { HistoryPatientService } from "@services/HistoryPatientService";
import { HistoryPatientId } from "domain/HistoryPatient/HistoryPatientId";
import { PatientId } from "domain/Patient/PatientId";
import { ResponseStatus } from "enum/codeStatus";
import { NotFoundError } from "Errors/Errors";
import { responseErrorStatus } from "Errors/ResponseErrors";
import { IRequest, IResponse } from "types/RequestAndResponse";

const hisPatService = new HistoryPatientService(new HistoryPatientMongoRepository())

class HistoryPatientControllers {
    async getHisPatById(req: IRequest, res: IResponse){

        try {
            
            const found = await hisPatService.getHistoryPatientById(new HistoryPatientId(req.params.id))

            if(!found) throw new NotFoundError('Patient history not found')
            
            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                histPat: found.toPrimitive()
            })
                

        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }

    }

    async getHisPatByPatientId(req: IRequest, res: IResponse){

        try {
            
            const found = await hisPatService.getHistoryPatientByPatientId(new PatientId(req.params.id))
            if(!found) throw new NotFoundError('Patient history not found')
            
            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                histPat: found.toPrimitive()
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

export default new HistoryPatientControllers()