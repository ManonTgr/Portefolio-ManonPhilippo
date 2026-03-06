import { useState, useEffect } from "react";

const parseExperience = (mdContent) => {
  // On découpe le fichier par les titres "##"
  const sections = mdContent.split("## ").slice(1);
  
  return sections.map((section) => {
    const lines = section.split("\n").map(l => l.trim()).filter(l => l !== "");
    const company = lines[0]; // Le titre après le ##
    
    // On cherche l'image peu importe où elle est dans le bloc
    const imageMatch = section.match(/!\[.*\]\((.*)\)/);
    const image = imageMatch ? imageMatch[1] : "";

    return {
      company,
      image,
      tags: "Category 1", // On force le tag pour éviter les bugs de filtre
    };
  });
};

const ExperienceArray = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch("/content/Experience.md")
      .then((response) => {
        if (!response.ok) throw new Error("Fichier introuvable");
        return response.text();
      })
      .then((mdContent) => {
        setExperience(parseExperience(mdContent));
      })
      .catch((err) => console.error("Erreur:", err));
  }, []);

  return experience;
};

export default ExperienceArray;