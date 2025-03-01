import { useState } from 'react'
import './NFT.css'
import Bottommenu from "../components/menu/Bottommenu";
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  const navigate=useNavigate();
  const nfts = [
    { id: 1, name: "CreaArf #1" },
    { id: 2, name: "CreaArf #2" },
    { id: 3, name: "CreaArf #3" },
    { id: 4, name: "CreaArf #4" },
    { id: 5, name: "CreaArf #5" },
    { id: 6, name: "CreaArf #6" },
    { id: 7, name: "CreaArf #7" },
    { id: 8, name: "CreaArf #8" },
  ]
  return (
    <>
    <div className="container">
      <div className="grid">
        {nfts.map((nft) => (
          <div key={nft.id} className="nft-card">
            <img src={`/NFT/${nft.id}.jpg`} alt={nft.name} className="nft-image" />
            <div className="nft-label">{nft.name}</div>
           
          </div>
        
        ))}
      </div>
      <Bottommenu />
      </div>
     
    </>
  )
}

export default App