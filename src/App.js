import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import components
import Head from "./myComponents/Head.js";
import Add from "./myComponents/add.js";
import View from "./myComponents/view.js";
import Home from './myComponents/Home.js';
import About from './myComponents/About.js';
import Foot from './myComponents/Foot.js';




function App() {
  return (
    <>
      <BrowserRouter>

        <Head />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addHabit" element={<Add />}></Route>
          <Route path="/viewHabit" element={<View />}></Route>
          <Route path="/About" element={<About />}></Route>
        </Routes>
        <Foot />

      </BrowserRouter>
    </>

  );
}



export default App;

