import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Index from 'pages/Index'
import Layout from 'Layouts/PublicLayout'
import Home from 'pages/Home'
import PrivateLayout from 'Layouts/PrivateLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route  path="/" element={<Layout/>}>
          <Route path="/" element={<Index/>} />
        </Route>
        <Route  path="/" element={<PrivateLayout/>}>
          <Route path="/home" element={<Home/>} />
        </Route>

      </Routes>     
  </BrowserRouter>
  );
}

export default App;
