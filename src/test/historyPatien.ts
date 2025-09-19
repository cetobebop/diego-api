// import { HistoryPatientMongoRepository } from "@services/HistoryPatientMongoRepository";
// import { HistoryPatient, PatientSnapshot } from "domain/HistoryPatient/HistoryPatient";
// import { PatientId } from "domain/Patient/PatientId";

// const HP_Mongo = new HistoryPatientMongoRepository()

// export async function testHP(){
//     // const PSnapshot = PatientSnapshot.buid({
//     //     name: 'juan',
//     //     age: 12,
//     //     phoneNumber: 4120997581
//     // })
//     // const n_hp_mongo = await HP_Mongo.create(new HistoryPatient('68751b681f283a86f5584635', '68751b681f288a86f5584635', PSnapshot)) 
//     // console.log(n_hp_mongo)


//     // const hpFindById = await HP_Mongo.getById('687fdebd635415695b8756cd')
//     // console.log(hpFindById)
//     // const PSnapshot = PatientSnapshot.buid({
//     //     name: 'julian',
//     //     birthdate: new Date()
//     // })
//     // const hpUpdate = await HP_Mongo.update((hpFindById?.patientId.value as string) , new HistoryPatient('68751b681f283a86f5584635', '68751b681f288a86f5584635', PSnapshot))

//     const hpFindById2 = await HP_Mongo.delete('68751b681f283a86f5584635')
//     console.log(hpFindById2)
//     // const snapshot = await HP_Mongo.deletePatientSnapshot('687fe6020ba7dab6dbbae6d1', '68751b681f283a86f5584635')

//     // console.log(snapshot)
    
// }