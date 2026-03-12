import React, { useEffect } from 'react';
import './App.css';
import Nav from './components/NavBar';
import Header from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const color = "pink";

  useEffect(() => {
    // 1. Désactiver la restauration automatique du scroll du navigateur
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Tenter un scroll immédiat
    window.scrollTo(0, 0);

    // 3. Sécurité : Relancer un scroll après un très court délai 
    // pour contrer le chargement des composants React
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // On force l'arrivée immédiate en haut
      });
    }, 100); 

    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  return (
    <>
      <Header color={color} />
      <Experience color={color} />
      <Contact color={color} />
      <Footer />
    </>
  );
}

export default App;