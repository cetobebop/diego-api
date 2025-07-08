import PatientControllers from "@controllers/Patient.controllers";
import { Router } from "express";
import { parseAndValidateQueryParams } from "middlewares/parseAndValidateQueryParams";
import { requireToken } from "middlewares/requireToken";

const router = Router()

router.post('/patient',
    (req,res,next)=>{
        requireToken(req,res,next)
    }, 
    (req,res)=>{
        PatientControllers.createPatient(req, res)
    }
)

router.get('/patient',
    (req,res,next)=>{
        requireToken(req,res,next)
    }, 
    (req,res,next)=>{     
        parseAndValidateQueryParams(req, res, next)
    },
    (req,res)=>{
        PatientControllers.getPatientByUserId(req, res)
    }
)

router.get('/patient/:id',
    (req,res,next)=>{
        requireToken(req,res,next)
    }, 
    (req,res)=>{
        PatientControllers.getOnePatient(req, res)
    }
)

router.delete('/patient/:id',
    (req,res,next)=>{
        requireToken(req,res,next)
    }, 
    (req,res)=>{
        PatientControllers.deletePatient(req, res)
    }
)

router.patch('/patient/:id',
    (req,res,next)=>{
        requireToken(req,res,next)
    }, 
    (req,res)=>{
        PatientControllers.updatePatient(req, res)
    }
)

router.get('/patient_search',
    (req,res,next)=>{
        requireToken(req,res,next)
    }, 
    (req,res,next)=>{     
        parseAndValidateQueryParams(req, res, next)
    },
    (req,res)=>{
        PatientControllers.getPatientsBySearch(req, res)
    }
)

export default router