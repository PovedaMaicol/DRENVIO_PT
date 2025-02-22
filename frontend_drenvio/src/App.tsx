import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductsList from "./components/ProductsList";
import Upload from "./components/Upload";

function App() {


  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  )
}

export default App
