const Router=require("express").Router()
const {getCompanyJobs,jobApplicants,editApplicantStatus,applyForJob,cancelJob}=require("../controller/company/company")
const passport=require("../services/jwtPassport")

/*
Mainurl : /api/company
mainDataShape:
{data:{your data here}}
*/
//company get it's own jobs
Router.get("/jobs/:companyid",getCompanyJobs)
//company get it's job applicants
Router.get("/job-applicants/:jobid",passport.authenticate('jwt', { session: false }),jobApplicants)
//returned
/*
for example
{
    job info ,
    applicants:[
        {
            applicant:id,
            image:..,
            user:{
                name:""
            }
        }
    ]
}
*/



// company edit status
Router.put("/job-applicants/:jobid/:applicantid",passport.authenticate('jwt', { session: false }),editApplicantStatus)
//apply job
Router.post("/apply-job/:jobid",passport.authenticate('jwt', { session: false }),applyForJob)
//for job cancelling 
Router.delete("/cancel-job/:jobid/",passport.authenticate('jwt', { session: false }),cancelJob)


module.exports=Router;