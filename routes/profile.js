const Router=require("express").Router()
const {getApplicantProfileData,editApplicantProfileData}=require("../controller/profile/Applicant_profile")
const {getCompanyProfileData,editCompanyProfileData}=require("../controller/profile/Company_profile")
const {companyUploadVideos,companyUploadImages} =require("../controller/services/Company")
const {applicantUploadVideos,applicantUploadImages,applicantUploadCv} =require("../controller/services/Applicant")

const passport=require("../services/jwtPassport")


//for company
function createStorage(path){
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path)
    },
    filename: function (req, file, cb) {
      const type=file.mimetype.split("/")[1]
      console.log("FILEEEE ",file)
      cb(null, +Date.now()+"-"+file.originalname )
    }
})
return storage
}

var multer  = require('multer')




var uploadVideo = multer({ storage: createStorage("public/uploads/videos/company") })
var uploadImage = multer({ storage: createStorage("public/uploads/images/company") })
var uploadVideoA = multer({ storage: createStorage("public/uploads/videos/applicant") })
var uploadImageA = multer({ storage: createStorage("public/uploads/images/applicant") })

var uploadCv = multer({ storage: createStorage("public/uploads/cvs/applicant") })

//Applicant
/*
method : get
url : /api/profile/applicant/:id"
input :

@return {profile data}

*/
Router.get("/applicant/:id",passport.authenticate('jwt', { session: false }),getApplicantProfileData)
/*
url : /api/profile/"
method:put
input : new data
@return {new profile data}

*/
Router.put("/applicant",passport.authenticate('jwt', { session: false }),editApplicantProfileData)

//Company


Router.get("/company/:id",getCompanyProfileData)
Router.put("/company",passport.authenticate('jwt', { session: false }),editCompanyProfileData)

// return link
Router.post("/company/upload-video",uploadVideo.single("video"),companyUploadVideos)
Router.post("/company/upload-image",uploadImage.single("image"),companyUploadImages)


Router.post("/applicant/upload-video",uploadVideoA.single("video"),applicantUploadVideos)
Router.post("/applicant/upload-image",uploadImageA.single("image"),applicantUploadImages)

Router.post("/applicant/upload-cv",uploadCv.single("cv"),applicantUploadCv)




module.exports=Router;