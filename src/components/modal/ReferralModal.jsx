import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ReferralModal = () => {
    const[form, setForm] = useState({
        name:'',
        email:'',
        phoneNumber:'',
        jobTitle:'',
        resume:null
    });
    const {url} = useSelector(state => state.candidateReducer);
    const token = sessionStorage.getItem('token');
    const closeButtonRef = useRef(null);

    // handle onchange event
    function handleChange(event){
        const {name, value, files} = event.target;
        
        if(name === 'resume'){
            setForm((prev) => ({
                ...prev,
                [name]:files[0]
            }))
            console.log('file', files[0]);
            console.log('type', typeof files[0]);
        } else {
            setForm((prev) => ({
                ...prev,
                [name]:value || ''
            }))
        }     
    }

    // post form on sumbit
    async function handleReferralForm(){
        try {
            // check for url
            if(!url){
                return
            }
            // validate the input
            const isFormValid = validateForm();
            if(!isFormValid){
                return toast.warn('please fill all the fields'.toUpperCase());
            }
            // if the form is valid then proceed to post form
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('phoneNumber', form.phoneNumber);
            formData.append('jobTitle', form.jobTitle);
            formData.append('resume', form.resume);
            const response = await axios.post(`${url}/candidate`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('form', response);
            toast.success(response.data.message.toUpperCase());
            const clickEvent = new MouseEvent('click');
            closeButtonRef.current.dispatchEvent(clickEvent);
            // reset form fields
            setForm({
                name:'',
                email:'',
                phoneNumber:'',
                jobTitle:'',
                resume:null
            });
        } catch (error) {
            console.log('error in submitting referral form', error);
            toast.error('form submission failed.try later'.toUpperCase());
        }
    }

    // validate form input 
    function validateForm(){
        for(let field in form){
            if(!form[field]){
                return false
            }
        }
        return true
    }

  return (
    <div>
        <div className="modal fade" id="referralFormModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="referralFormModalLabel">Referral Form</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        <div>
            
            {/* name */}
            <div>
                <label htmlFor='username'>USERNAME</label> <br/>
                <input id='username' name='name' value={form.name} onChange={handleChange} className='input-field'  />
            </div>
            {/* email */}
            <div>
                <label htmlFor='email'>EMAIL</label> <br/>
                <input id='email' name='email' value={form.email} onChange={handleChange} className='input-field'  />
            </div>
            {/* phone number */}
            <div>
                <label htmlFor='phoneNumber'>PHONE NUMBER</label> <br/>
                <input id='phoneNumber' name='phoneNumber' value={form.phoneNumber} onChange={handleChange} className='input-field'  />
            </div>
            {/* job title */}
            <div>
                <label htmlFor='jobTitle'>JOB TITLE</label> <br/>
                <input id='jobTitle' name='jobTitle' value={form.jobTitle} onChange={handleChange} className='input-field'  />
            </div>
            {/* resume */}
            <div>
                <label htmlFor='resume'>UPLOAD RESUME</label> <br/>
                <input type='file' id='resume' name='resume' onChange={handleChange} className='input-field' accept='.pdf'  />
            </div>
            
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" ref={closeButtonRef} > Close </button>
        <button type="submit" className="btn btn-primary"  onClick={handleReferralForm}> Save changes </button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default ReferralModal