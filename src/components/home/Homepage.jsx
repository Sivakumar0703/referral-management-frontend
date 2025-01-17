import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../card/Card'
import './homepage.css'
import Navbar from '../navbar/Navbar'
import ReferralModal from '../modal/ReferralModal'
import { fetchCandidates } from '../../redux/asyncThunk'

const Homepage = () => {
    const {candidates,isLoading} = useSelector(state => state.candidateReducer);
    const[search, setSearch] = useState('');

   // fetch all candidate data
   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCandidates());
  },[]);

  return (
    <div>
        <div>
            <Navbar search={search} setSearch={setSearch}  />
        </div>

        <div id='candidate-list'>
        {
            isLoading ? <p>Loading...</p> 
            :
            candidates.map((candidate) => {
                return <Card key={candidate._id} candidate={candidate} />
            })
        } 
        </div>

        <ReferralModal />
        
    </div>
  )
}

export default Homepage