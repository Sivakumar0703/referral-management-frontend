import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
import { filterCandidates } from '../../redux/candidateSlice'
import { fetchCandidates } from '../../redux/asyncThunk'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = ({search, setSearch}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {url} = useSelector(state => state.candidateReducer);
    const token = sessionStorage.getItem('token');

    function handleSearch(){
        // when no value is entered then return the complete candidates detail
        if(search === ''){
            dispatch(fetchCandidates());
        }
        // if we have no candidates to show simply return the function
        if(candidates.length === 0){
            return
        }
        // perform filter operation based on entered string
        const filteredCandidates = candidates.filter((candidate) => {
            if(candidate.jobStatus.includes(search) || candidate.jobTitle.includes(search)){
                return candidate
            }
        })
        setSearch('');
        dispatch(filterCandidates(filteredCandidates));
    }

    // logout user
    async function handleLogout(){
        try {
            const response = await axios.post(`${url}/user/logout`, {} , {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success(response.data.message.toUpperCase());
            sessionStorage.clear();
            navigate('/login');
        } catch (error) {
            console.log('error in logout', error);
            toast.error(error.response.data.message.toUpperCase());
        }
    }
    
  return (
    <nav className='navbar'>
        {/* left side */}
        <div id='search-area'>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder='job title / status' />
            <button className='btn btn-light' onClick={handleSearch}> 🔍 </button>
        </div>

        {/* right end */}
        <ul className='navbar-menu'>
            <li className='navbar-item' data-bs-toggle="modal" data-bs-target="#referralFormModal"> Referral form </li>
            <li className='navbar-item' onClick={handleLogout}> Logout </li>
        </ul>
    </nav>
  )
}

export default Navbar


