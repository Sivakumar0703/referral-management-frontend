import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../card/Card'
import './homepage.css'
import Navbar from '../navbar/Navbar'
import ReferralModal from '../modal/ReferralModal'

const Homepage = () => {
    const {candidates,isLoading} = useSelector(state => state.candidateReducer);
    console.log('home', candidates);
    const[search, setSearch] = useState('');

  return (
    <div>
        <div>
            <Navbar search={search} setSearch={setSearch}  />
        </div>

        <div id='candidate-list' style={{width:'100%',justifyContent:'center'}}>
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