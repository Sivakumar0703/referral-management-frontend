import { useEffect, useState } from "react";
import './card.css'
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidates } from "../../redux/asyncThunk";

const Card = ({candidate}) => {
    const[badge, setBadge] = useState('warning');
    const options = ['pending', 'hired', 'rejected'];
    const[changeStatus, setChangeStatus] = useState(candidate.jobStatus);
    const {url} = useSelector(state => state.candidateReducer);
    const isAdmin = sessionStorage.getItem('isAdmin');
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch();

    // change badge color according to job status
    useEffect(() => {
        function changeBadgeColor(){
            if(candidate.jobStatus === 'hired'){
                setBadge('success');
            } else if(candidate.jobStatus === 'rejected'){
                setBadge('danger');
            } else {
                setBadge('warning');
            }
        }
        changeBadgeColor();
    },[candidate.jobStatus]);

    // save the changes in job status of the candidate
    async function handleStatusChange(event){
        try {
            const newJobStatus = event.target.value;
            // check the previous status and new status are same
            if(candidate.jobStatus === newJobStatus){
                return
            }
            // if token is unavailable
            if(!token){
                return toast.error("token missing".toUpperCase());
            }
            // if token is available
            const candidateData = {
                ...candidate,
                jobStatus: newJobStatus
            }
            setChangeStatus();
            const response = await axios.put(`${url}/candidate/${candidate._id}/status`, candidateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }    
            });
            toast.success(response.data.message.toUpperCase());
            dispatch(fetchCandidates());
        } catch (error) {
           console.log('error in changing status candidate job status' ,error);
           toast.error("changing status failed".toUpperCase()); 
        }
    }

  return (
    <div id='card'>   

        <div className="candidate-info">
            <p className="label"> Candidate Name </p>
            <p className="value"> :&nbsp;{candidate.name.toUpperCase()} </p>
        </div>

        <div className="candidate-info">
            <p className="label"> Job Title </p>
            <p className="value"> :&nbsp;{candidate.jobTitle} </p>
        </div>

        <div className="candidate-info">
            <p className="label"> Status </p>
            {
                isAdmin === true ?
                <select value={changeStatus} onChange={handleStatusChange}>
                {
                    options.map((option) => {
                        return <option key={option}> {option} </option>
                    })
                }
            </select>
            :
            <p className="value"> : &nbsp;<span className={`badge text-bg-${badge}`} style={{textAlign:'center'}}> {candidate.jobStatus} </span>  </p>
            }    
        </div>

        <div className="candidate-info">
            <p className="label"> Resume </p>
            <p className="value"> :&nbsp; <a target="_blank" href={candidate.resumeUrl} style={{textDecoration:'none',cursor:'pointer'}}>⬇️</a> </p>
        </div>

    </div>
  )
}

export default Card