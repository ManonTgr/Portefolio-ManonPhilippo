import { useState, useEffect } from "react";

const parseExperience = (mdContent) => {
  const sections = mdContent.split("## ").slice(1);
  
  return sections.map((section) => {
    const lines = section.split("\n").map(l => l.trim()).filter(l => l !== "");
    const company = lines[0]; 
    
    // Extraction de l'image de la carte
    const imageMatch = section.match(/!\[.*\]\((.*)\)/);
    const image = imageMatch ? imageMatch[1] : "";

    // Extraction des données techniques (vidéos, carrousel)
    const videoLine = lines.find(l => l.toLowerCase().includes("video:"));
    const video = videoLine ? videoLine.split(/video:/i)[1].trim() : null;

    const previewLine = lines.find(l => l.toLowerCase().includes("preview:"));
    const preview = previewLine ? previewLine.split(/preview:/i)[1].trim() : null;

    const imagesLine = lines.find(l => l.toLowerCase().includes("images:"));
    const carouselImages = imagesLine 
      ? imagesLine.split(/images:/i)[1].split(",").map(img => img.trim()) 
      : [];

    // --- NETTOYAGE STRICT DU TEXTE ---
    // On enlève tout ce qui n'est pas du pur texte narratif
    const descriptionLines = lines.slice(1).filter(l => {
      const lower = l.toLowerCase();
      return (
        !l.includes("![") &&           // Enlève les images Markdown
        !lower.includes("video:") &&   // Enlève la ligne vidéo (même avec tiret)
        !lower.includes("preview:") && // Enlève la ligne preview (même avec tiret)
        !lower.includes("images:") &&  // Enlève la ligne du carrousel
        !lower.includes("tags:") &&    // Enlève les tags
        !lower.includes("badges:") &&  // Enlève les badges
        !l.includes("[") &&            // Enlève les lignes avec crochets techniques
        l.length > 3                   // Ignore les caractères isolés
      );
    });

    return { company, image, video, preview, carouselImages, descriptionLines };
  });
};

const ExperienceArray = () => {
  const [experience, setExperience] = useState([]);
  useEffect(() => {
    fetch("/content/Experience.md")
      .then((r) => r.text())
      .then((md) => setExperience(parseExperience(md)))
      .catch((err) => console.error("Erreur parsing:", err));
  }, []);
  return experience;
};

export default ExperienceArray;