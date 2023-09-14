import "./css/style.css";
import {  Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CountryDetails from "./components/country/CountryDetails";
import ScrollTop from "./components/scrollTop.jsx/ScrollTop";

function App() {
  return (
    <main>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<CountryDetails />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
