import { useState } from 'react'
import './CreateNewWallet.css'
<<<<<<< HEAD

=======
import CreateWith12Word from '../components/button/Createwith12word'
import CreateWith24Word from '../components/button/Createwith24word'
import BackButton from "../components/button/BackButton";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
      <div className='header1'>
>>>>>>> Arfhe-v1.0.0-relax
      <h1 className="app-title">Arfhe Wallet</h1>
    <img src="/Arfhe-logo.png" alt='Logo' className='app-logo' />
      

      </div>
<<<<<<< HEAD

      <div className='content'>
    <input
      type="password"
      className="seed-input"
      placeholder="Gizli Kelimeleri Giriniz"
    />

    <input
      type="password"
      className="privatekey-input"
      placeholder="Gizli Anahtarı Giriniz"
    />

        <button className='import-wallet-button'>İçe Aktar</button>
=======
      <div className='alert'>
        <ExclamationCircleOutlined style= {{fontsize:"10px"}} />
      <div>
      Once you generate the seed phrase, save it securely in 
      order to recover your wallet in the future!
      </div>
      </div>
      <div className='content'>
       
        <CreateWith12Word />
        <CreateWith24Word />
        <BackButton />
>>>>>>> Arfhe-v1.0.0-relax
      </div>
    </div>

    </>
  )
}

export default App