import { useState } from 'react'
import './FirstLogin.css'
<<<<<<< HEAD
=======
import Createwalletbutton from '../components/button/Createwalletbutton'
import Importwalletbutton from '../components/button/Importwalletbutton'
>>>>>>> Arfhe-v1.0.0-relax

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
<<<<<<< HEAD
    <div className="app-container">
      <div className='header'>
=======
    
    <div className="container">
      <div className='header3'>
>>>>>>> Arfhe-v1.0.0-relax
      <h1 className="app-title">Arfhe Wallet</h1>
    <img src="/Arfhe-logo.png" alt='Logo' className='app-logo' />
      

      </div>

      <div className='content'>
<<<<<<< HEAD
        <button className='create-wallet-button'>Cüzdan Oluştur</button>
        <button className='import-wallet-button'>İçe Aktar</button>
=======
       
        <Importwalletbutton />
        <Createwalletbutton />
>>>>>>> Arfhe-v1.0.0-relax
      </div>
    </div>

    </>
  )
}

export default App