import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Viewjob = () => {
    let [joblist, setJoblist] = useState([]);

    const getjob = () => {
        fetch("http://localhost:1234/jobapi?companyid="+localStorage.getItem("userid"))
            .then(response => response.json())
            .then(info => {
                setJoblist(info);
            })
    }

    useEffect(() => {
        getjob();
    });

    const deletejob = (id) => {
        let url = "http://localhost:1234/jobapi/" + id;
        let postdata = { "method": "delete" }
        fetch(url, postdata)
            .then(response => response.json())
            .then(info => {
                getjob();
            })
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4"> {joblist.length} Job Posted By You... </h2>
                {
                    joblist.map((job, index) => {
                        return (
                            <div className="row mb-4" key={index}>
                            <div className="col-xl-12">
                                <div className="card  rounded shadow-lg">
                                    <div className="card-header"> 
                                        <Link to={`/jobapplylist/${job.id}`}>{job.jobtitle}</Link>
                                        <i className="fa fa-trash text-danger float-end" onClick={obj => deletejob(job.id)}></i>
                                        </div>
                                    <div className="card-body">
                                            <div className="row">
                                            <div className="col-xl-2 mb-2"> <i className="fa-solid fa-briefcase"></i> {job.exp} Yrs</div>
                                            <div className="col-xl-2 mb-2">  <i className="fa-solid fa-location-dot"></i> {job.city} </div>
                                            <div className="col-xl-1 mb-2"> <i className="fa-solid fa-indian-rupee-sign"></i> {job.salary} </div>
                                            <div className="col-xl-7 mb-2"><i className="fa-brands fa-github"></i>  Skills : {job.skills} </div>
                                            <div className="col-xl-12 mb-2"> <i className='fa-regular fa-file-lines'></i> Job Description : {job.jd} </div>
                                            </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                        )
                    })
                }
            </div>
     
    )
}


export default Viewjob;