import { useState } from 'react'
import './signup.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
    const[form, setForm] = useState({
        name:'',
        email:'',
        password:'',
    });
    const[confirmPassword, setConfirmPassword] = useState('');
    const[activateError, setActivateError] = useState(false);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    // if user is already logged in then restrict user to visiting signup page
    if(token){
        navigate('/');
        toast.warn('please logout and try again'.toUpperCase());
    }

    // handle onchange event
    function handleChange(event){
        const {name, value} = event.target;
        setForm((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    // check password with confirm password
    function comparepassword(event){
        setConfirmPassword(event.target.value);
        if(form.password !== event.target.value){
            setActivateError(true);
        } else {
            setActivateError(false); 
        }
    }

    // post 
    async function handleSignup(){
        try {
            
        } catch (error) {
            console.log('error in signup', error);
            toast.error(error.message?.toUpperCase());
        }
    }

  return (
    <div id='signup-page'>
        <div id='signup-card'>
            <h2>SIGN-UP FOR DOT</h2>
            <div>
                <label htmlFor='username'>USERNAME</label> <br/>
                <input id='username' name='name' value={form.name} onChange={handleChange} className='input-field' />
            </div>

            <div>
                <label htmlFor='email'>EMAIL</label> <br/>
                <input id='email' name='email' value={form.email} onChange={handleChange} className='input-field' />
            </div>

            <div>
                <label htmlFor='password'>PASSWORD</label> <br/>
                <input id='password' type='password' name='password' value={form.password} onChange={handleChange} className='input-field' />
            </div>

            <div>
                <label htmlFor='confirm-password'>CONFIRM PASSWORD</label> <br/>
                <input id='confirm-password' type='password'  value={confirmPassword} onChange={comparepassword} className={!activateError ? 'input-field' : 'error-input-field input-field'} />
            </div>

            <div>
                <button className='btn btn-success' onClick={handleSignup}>SIGNUP</button>
            </div>

            <div>
                <p>If you already have an account then 
                    <Link to='/login' style={{color:'black',fontWeight:'bold',textDecoration:'none'}}> &nbsp; Click Here</Link> to login</p>
            </div>

        </div>
    </div>
  )
}

export default Signup