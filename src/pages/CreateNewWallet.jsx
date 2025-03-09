import { useState } from 'react'
import './CreateNewWallet.css'
import CreateWith12Word from '../components/button/Createwith12word'
import CreateWith24Word from '../components/button/Createwith24word'
import BackButton from "../components/button/BackButton";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import generateWallet from "./CreateWith12Word"
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    
    <div className="container">
      <div className='header1'>
      <h1 className="app-title">Arfhe Wallet</h1>
    <img src="/Arfhe-logo.png" alt='Logo' className='app-logo' />
      

      </div>
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
      </div>
    </div>

    </>
  )
}

export default App