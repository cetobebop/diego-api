import { Router } from "express";
import { requireToken } from "@middlewares/requireToken";
import { UploadSinglePDF } from "@middlewares/uploadFiles";
import ClinicCasesControllers from "@controllers/ClinicCases.controllers";
import { parseAndValidateQueryParams } from "@middlewares/parseAndValidateQueryParams";

const router = Router()

router.post('/clinic_case',
  (req,res,next)=>{
    requireToken(req,res, next)
  },
  (req,res, next)=>{
    UploadSinglePDF(req,res,next)
  },
  (req ,res)=>{
    ClinicCasesControllers.createClinicCase(req, res)
  }
)

router.post('/clinic_case_by_patient_id',
  (req,res,next)=>{
    requireToken(req,res, next)
  },
  (req,res, next)=>{
    parseAndValidateQueryParams(req, res, next)
  },
  (req ,res)=>{
    ClinicCasesControllers.getClinicCaseByPatientId(req, res)
  }
)

router.delete('/clinic_case/:id',
  (req,res,next)=>{
    requireToken(req,res, next)
  },
  (req ,res)=>{
    ClinicCasesControllers.deleteClinicCase(req, res)
  }
)

router.get('/clinic_case/:id',
  (req,res,next)=>{
    requireToken(req,res, next)
  },
  (req ,res)=>{
    ClinicCasesControllers.getClinicCaseById(req, res)
  }
)

router.patch('/clinic_case/:id',
  (req,res,next)=>{
    requireToken(req,res, next)
  },
  (req,res, next)=>{
    UploadSinglePDF(req,res,next)
  },
  (req ,res)=>{
    ClinicCasesControllers.updateClinicCase(req, res)
  }
)



export default router
