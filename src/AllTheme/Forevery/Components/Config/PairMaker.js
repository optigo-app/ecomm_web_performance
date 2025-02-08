
export const pairDiamonds = (db) => {
    const pairedDiamonds = [];
    const pairedDiamondsIndices = new Set();  // To track paired diamonds

    const colorCompatible = (color1, color2) => {
      const colorScale = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      const index1 = colorScale.indexOf(color1);
      const index2 = colorScale.indexOf(color2);
      return Math.abs(index1 - index2) <= 2; // Within 1-2 grades
    };

    const clarityCompatible = (clarity1, clarity2) => {
      const clarityOrder = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
      const index1 = clarityOrder.indexOf(clarity1);
      const index2 = clarityOrder.indexOf(clarity2);
      return Math.abs(index1 - index2) <= 1; // Within 1 grade
    };

    const caratCompatible = (carat1, carat2) => {
      return Math.abs(carat1 - carat2) <= 0.02;
    };

    const sameFluorescence = (fluorescence1, fluorescence2) => {
      return fluorescence1 === fluorescence2;
    };

    const similarCut = (cut1, cut2) => {
      return cut1 === cut2;
    };

    // Iterate through the diamond list to find matching pairs
    for (let i = 0; i < db?.length; i++) {
      // Skip already paired diamonds
      if (pairedDiamondsIndices.has(i)) continue;

      for (let j = i + 1; j < db?.length; j++) {
        // Skip already paired diamonds
        if (pairedDiamondsIndices.has(j)) continue;

        const diamond1 = db[i];
        const diamond2 = db[j];

        // Apply all pairing criteria
        if (
          diamond1?.shapename === diamond2?.shapename &&
          caratCompatible(diamond1?.carat, diamond2?.carat) &&
          colorCompatible(diamond1?.colorname, diamond2?.colorname) &&
          clarityCompatible(diamond1?.clarityname, diamond2?.clarityname) &&
          similarCut(diamond1?.cutname, diamond2?.cutname) &&
          sameFluorescence(diamond1?.fluorescencename, diamond2?.fluorescencename)
        ) {
          // If all conditions are met, add to paired list
          pairedDiamonds.push([diamond1, diamond2]);
          pairedDiamondsIndices.add(i);
          pairedDiamondsIndices.add(j);
          break;
        }
      }
    }

    return pairedDiamonds;
  };