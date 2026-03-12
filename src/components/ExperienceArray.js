import { useState, useEffect } from "react";

const parseExperience = (mdContent) => {
  const sections = mdContent.split("## ").slice(1);
  
  return sections.map((section) => {
    const lines = section.split("\n").map(l => l.trim()).filter(l => l !== "");
    const company = lines[0]; 
    
    // Extraction de l'image de couverture
    const imageMatch = section.match(/!\[.*\]\((.*)\)/);
    const image = imageMatch ? imageMatch[1] : "";

    // Extraction du lien YouTube
    const videoLine = lines.find(l => l.toLowerCase().includes("video:"));
    const video = videoLine ? videoLine.split(/video:/i)[1].trim() : null;

    // Extraction de l'extrait vidéo local (preview)
    const previewLine = lines.find(l => l.toLowerCase().includes("preview:"));
    const preview = previewLine ? previewLine.split(/preview:/i)[1].trim() : null;

    // Extraction des badges
    const badges = [];
    const badgeMatches = section.matchAll(/-\s*(.*)\s*\[(.*)\]/g);
    for (const match of badgeMatches) {
      badges.push({ name: match[1], color: match[2] });
    }

    // Extraction de la description (lignes de texte pur)
    const descriptionLines = lines.slice(1).filter(l => 
      !l.includes("![") && 
      !l.toLowerCase().includes("video:") && 
      !l.toLowerCase().includes("preview:") && 
      !l.includes("Badges:")
    );

    return {
      company,
      image,
      video,
      preview,
      badges,
      descriptionLines
    };
  });
};

const ExperienceArray = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch("/content/Experience.md")
      .then((r) => r.text())
      .then((md) => setExperience(parseExperience(md)))
      .catch((err) => console.error("Erreur chargement Markdown:", err));
  }, []);

  return experience;
};

export default ExperienceArray;