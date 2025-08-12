import { useState } from 'react'
import './Portfolio.css'
import Bottommenu from "../components/menu/Bottommenu";
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  const navigate=useNavigate();
  

  return (
    <>
    <div className="container">
      <div className='header'>
      </div>
      <button className='create-to-import-button'
onClick={() => {
   navigate('/crypto')
}}
>Kripto</button>
      <button className='create-to-import-button'
onClick={() => {
   navigate('/NFT')
}}
>NFT</button>



      
      <Bottommenu />
      </div>
    </>
  )
}

export default App