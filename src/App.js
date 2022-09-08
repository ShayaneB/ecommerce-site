import "./App.css";
import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDesc from "./components/ProductDesc";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product-description/:id" element={<ProductDesc />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
