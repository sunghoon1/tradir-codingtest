import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p><Link to='/beerlist'>비어리스트 바로가기</Link></p>
    </div>  
  )
}

export default Home;
