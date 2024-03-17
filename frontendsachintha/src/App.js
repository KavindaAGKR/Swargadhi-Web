import React from "react";
import HomePage from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Dispensary from "./pages/Dispensary";

function App() {
  return (
    <div className="App">
    <Header/>  
    <HomePage />
    <Shop/>
    <Dispensary/>
    
    <Footer/>
    </div>
  );
}

export default App;
