import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './Components/Homepage';
import QuoteGenerator from './Components/Quote';
import Memes from './Components/Memes';
import Postcreate from './Components/Postcreate';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/generate" element={<Postcreate />} />

        </Routes>     
         </BrowserRouter>
    </div>
  );
}

export default App;
