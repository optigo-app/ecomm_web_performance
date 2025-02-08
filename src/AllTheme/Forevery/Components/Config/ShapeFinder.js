import { storImagePath } from "../../../../utils/Glob_Functions/GlobalFunction";

const shapeImage = [
    { shape: "round", imagePath: `${storImagePath()}/earring-d/round.jpg` },
    { shape: "princess", imagePath: `${storImagePath()}/earring-d/princess.jpg` },
    { shape: "cushion", imagePath: `${storImagePath()}/earring-d/cushion.jpg` },
    { shape: "emerald", imagePath: `${storImagePath()}/earring-d/emerald.jpg` },
    { shape: "oval", imagePath: `${storImagePath()}/earring-d/oval.jpg` },
    { shape: "radiant", imagePath: `${storImagePath()}/earring-d/radiant.jpg` },
    { shape: "asscher", imagePath: `${storImagePath()}/earring-d/ascher.jpg` },
    { shape: "marquise", imagePath: `${storImagePath()}/earring-d/marquise.jpg` },
    { shape: "heart", imagePath: `${storImagePath()}/earring-d/heart.jpg` },
    { shape: "pear", imagePath: `${storImagePath()}/earring-d/pear.jpg` },
    { shape: "shield", imagePath: `${storImagePath()}/earring-d/shield.jpg` },
    { shape: "kite", imagePath: `${storImagePath()}/earring-d/kite.jpg` },
    { shape: "baguette", imagePath: `${storImagePath()}/earring-d/baguette.jpg` },
  ];

  export function getImagePath(shape) {
    const shapeLower = shape?.toLowerCase();
    const shapeObject = shapeImage?.find(item => item?.shape.toLowerCase() === shapeLower);
    if (shapeObject) {
      return shapeObject?.imagePath;
    } else {
      return "Shape not found.";
    }
  }