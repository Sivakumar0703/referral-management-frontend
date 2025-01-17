import { useState } from 'react'
import world from '../../assets/world.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = 'https://referral-management-backend.onrender.com/api';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLoginOnClick(){
        try {
           const response = await axios.post(`${url}/user/login`, {email,password});
           console.log('res',response);
           const token = response.data.token;
           const isAdmin = response.data.isAdmin;
           sessionStorage.setItem('token', token);
           sessionStorage.setItem('isAdmin', isAdmin);
           const payload = {
            token,
            isAdmin
         }
           dispatch(saveUserData(payload));
           toast.success(response.data.message?.toUpperCase()); 
           navigate('/home');
        } catch (error) {
            console.log('error in login', error);
            toast.error(error.response?.data.message.toUpperCase());
        }
    }

  return (
    <div id='login-container'>
        <div id='login-card'>
        {/* first part - logo and title */}
        <div id='login-first-part'>
            <div id='login-image'>
                <img src={world} />
            </div>

            <div style={{color:'white'}}>
                <h3> DOT </h3>
                <p>Welcome Back!</p>
                <p>Sign in to unlock exclusive opportunities,</p>
                <p>connect with top talent, and evlouate your</p>
                <p>career journey.</p>
                <p>Your next success story awaits!</p>
            </div>
        </div>
        {/* second part - contain form */}
        <div id='login-second-part'>

            <div style={{color:'white'}}>
                <h3>
                    Your Referral
                </h3>
                <h3>
                    Universe Awaits:
                </h3>
                <h3>
                    Sign In!
                </h3>
            </div>

            <div id='login-form'>
                <div className="input-group flex-nowrap">
                 <span className="input-group-text" id="addon-wrapping">@</span>
                 <input type="text" 
                  value={email} 
                  onChange={(event) => setEmail(event.target.value)}
                  className="form-control" 
                  placeholder="Email" 
                  aria-label="Email" 
                  aria-describedby="addon-wrapping" 
                  />
                </div> <br/>

                <div className="input-group flex-nowrap">
                 <span className="input-group-text" id="addon-wrapping">#</span>
                 <input 
                 type="password" 
                 className="form-control" 
                 value={password}
                 onChange={(event) => setPassword(event.target.value)}
                 placeholder="Password" 
                 aria-label="Password" 
                 aria-describedby="addon-wrapping" 
                 />
                </div>

                <div>
                    <button className='btn btn-primary' onClick={handleLoginOnClick}>
                        Login
                    </button>
                </div>

                <div>
                 <p>If you don't have an account then <a href='/signup' style={{color:'red',fontWeight:'bold',textDecoration:'none'}}>Click Here</a> to register</p>
                 </div>
            </div>

        </div>

        </div>
    </div>
  )
}

export default Login