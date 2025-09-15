import { PatientMongoRepository } from "@services/PatientMongoRepository";
import { PatientService } from "@services/PatientService";
import { Patient } from "domain/Patient/Patient";
import { PatientCI } from "domain/Patient/PatientCI";
import { PatientId } from "domain/Patient/PatientId";
import { UserId } from "domain/User/UserId";
import { PartialPatientDto } from "dto/PartialPatientDto";
import { ResponseStatus } from "enum/codeStatus";
import { responseErrorStatus } from "error/ResponseErrors";
import { OptionsAgreggationQuery } from "types/IQueryParams";
import { IRequest, IResponse } from "types/RequestAndResponse";

const patientService = new PatientService(new PatientMongoRepository())

class PatientControllers {

    async createPatient(req: IRequest, res: IResponse){

        try {
            if(!req.data) throw new Error('property data in request is empty')
                
            const newPatient = new Patient(
                req?.body?.name, req?.data?.id, req?.body?.birthdate, req?.body?.ci,
                req?.body?.phoneNumber, req?.body?.address, req?.body?.age,
                req?.body?.sex, req?.body?.beginningDate
            )

            const patientExist = await patientService.getPatientByCI(new PatientCI(newPatient.ci.value))

            if(patientExist) return res.status(400).json({
                status: ResponseStatus.FAILED,
                msg: 'patient already exits'
            })

            const patient = await patientService.createPatient(newPatient)

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                patient: patient.getPatient()
            })
        

        } catch (error) {
            
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
           
        }
    }


    async getPatientByUserId(req:IRequest, res: IResponse){

        try {
            
            const queryParams = req.queryParams 
            ? req.queryParams.toPrimitive() 
            : { skip: 0, limit: 30 }


            if(!req.data) throw new Error('property data in request is empty')

            const userId = new UserId(req.data.id)

            
            const patientsFound = await patientService.getPatientsByUserId(userId, queryParams)
         
            if(!patientsFound.patients?.length) return res.status(404).json({
                status: ResponseStatus.FAILED,
                msg: 'patients not found'
            })

            const patients = patientsFound.patients.map(patient => patient.getPatient())

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                patients,
                total: patientsFound.total
            })
        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }

    }

    async getAllPatients(req: IRequest, res: IResponse){

        try {
            
            const patientsFound = await patientService.getAllPatient()

            if(!patientsFound.length) return res.status(404).json({
                status: ResponseStatus.FAILED,
                msg: 'patients not found'
            })

            const patients = patientsFound.map(patient => patient.getPatient())

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                patients
            })


        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })   
        }

    }

    async getOnePatient(req: IRequest, res: IResponse){
        try {
            const patientFind = await patientService.getPatientById(new PatientId(req.params.id))

            if(!patientFind) return res.status(404).json({
                status: ResponseStatus.FAILED,
                msg: 'patient not found'
            })

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                patient: patientFind.getPatient()
            })

        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })   
        }
    }

    async deletePatient(req: IRequest, res: IResponse){
        try {
            
            const deletedPatient = await patientService.deletePatient(new PatientId(req.params.id))

            if(!deletedPatient) return res.status(404).json({
                status: ResponseStatus.FAILED,
                msg: 'patient not found'
            })

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

    async updatePatient(req: IRequest, res: IResponse){
        try {
            const patientDto = PartialPatientDto.create({
                name: req.body.name, birthdate: req.body.birthdate,
                address: req.body.address, age: req.body.age,
                ci: req.body.ci, phoneNumber: req.body.phoneNumber
            })

            const patientUpdated = await patientService.updatePatient(new PatientId(req.params.id), patientDto.toPrimitive())

            if(!patientUpdated) return res.status(404).json({
                status: ResponseStatus.FAILED,
                msg: "patient not found"
            })

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                patient: patientUpdated.getPatient()
            })

        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })   
        }
    }

    async getPatientsBySearch(req: IRequest, res: IResponse){
        try {

            const optionsQuery = req.queryParams 
            ? req.queryParams.toPrimitive() 
            : { skip: 0 }

            const {skip} = optionsQuery as OptionsAgreggationQuery

            if(!req.data) throw new Error('property data in request is empty')
            
            const userId = new UserId(req.data.id)

            const patientsFound = await patientService.getPatientsByInputSearch(req.body?.text, userId, {skip})

            if(!patientsFound) return res.status(404).json({
                status: ResponseStatus.FAILED,
                msg: 'patients not found'
            })

            const query = {
                patients: patientsFound.patients.map(patient => patient.getPatient()),
                count: patientsFound.count
            }

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                query
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


export default new PatientControllers()