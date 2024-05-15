import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import './App.scss';
import Wrapper from './Wrapper';

const App = () => {
  return (
    <Wrapper>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/projects' element={<Projects />} />
        <Route exact path='/resume' element={<Resume />} />
        <Route exact path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </Wrapper>
  );
};

export default App;
