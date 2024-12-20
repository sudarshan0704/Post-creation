import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './Components/Homepage';
import QuoteGenerator from './Components/Quote';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/generate" element={<QuoteGenerator />} />
        </Routes>     
         </BrowserRouter>
    </div>
  );
}

export default App;
