import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './Components/Homepage';
import QuoteGenerator from './Components/Quote';
import Memes from './Components/Memes';
import Postcreate from './Components/Postcreate';
import Askpost from "./Components/ASKpost";


function App() {
  return (
    <div className="App"> 
     
  
{/* 
<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <Ribbons
    baseThickness={30}
    colors={['#ffffff']}
    speedMultiplier={0.5}
    maxAge={500}
    enableFade={false}
    enableShaderEffect={true}
  />
  </div> */}
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/generate" element={<Postcreate />} />
        <Route path="/Ask" element={< Askpost/>} />
        </Routes>     
         </BrowserRouter>
  
    </div>
    
  );
}

export default App;
