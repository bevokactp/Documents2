
export const solidsAttrs = {
  sphere: { color: 'purple', edgeColor: 'black', name: 'Сфера' },
  hexagon: { color: 'blue', edgeColor: 'black', name: 'Гексаэдр' },
  icosahedron: { color: 'lightgreen', edgeColor: 'black', name: 'Икосаэдр' },
  tetrahedron: { color: 'red', edgeColor: 'black', name: 'Тетраэдр' },
  dodecahedron: { color: 'orange', edgeColor: 'black', name: 'Додекаэдр' },
  octahedron: { color: 'yellow', edgeColor: 'black', name: 'Октаэдр' },
  star_dodecahedron: { color: 'pink', edgeColor: 'black', name: 'Додекаэдр*' }
};


export const getSolidInfo = (type, sideLength) => {
    let volume = 0;
    let surfaceArea = 0;
    let vertices = 0;
    let edges = 0;
    let faces = 0;

    switch (type) {
      case 'hexagon':
        volume = Math.pow(sideLength, 3);
        surfaceArea = 6 * Math.pow(sideLength, 2);
        vertices = 8;
        edges = 12;
        faces = 6;
        break;
      case 'sphere':
        volume = (4 / 3) * Math.PI * Math.pow(sideLength, 3);
        surfaceArea = 4 * Math.PI * Math.pow(sideLength, 2);
        vertices = 0;
        edges = 0;
        faces = 0;
        break;
      case 'icosahedron':
        volume = (5 / 12) * Math.sqrt(3) * Math.pow(sideLength, 3);
        surfaceArea = 5 * Math.sqrt(3) * Math.pow(sideLength, 2);
        vertices = 12;
        edges = 30;
        faces = 20;
        break;
      case 'tetrahedron':
        volume = (Math.sqrt(2) / 12) * Math.pow(sideLength, 3);
        surfaceArea = Math.sqrt(3) * Math.pow(sideLength, 2);
        vertices = 4;
        edges = 6;
        faces = 4;
        break;
      case 'dodecahedron':
        volume = (15 + 7 * Math.sqrt(5)) / 4 * Math.pow(sideLength, 3);
        surfaceArea = 3 * Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(sideLength, 2);
        vertices = 20;
        edges = 30;
        faces = 12;
        break;
      case 'octahedron':
        volume = Math.sqrt(2) / 3 * Math.pow(sideLength, 3);
        surfaceArea = 2 * Math.sqrt(3) * Math.pow(sideLength, 2);
        vertices = 6;
        edges = 12;
        faces = 8;
        break;
      case 'star-dodecahedron':
        volume = (15 + 7 * Math.sqrt(5)) / 4 * Math.pow(sideLength, 3); // Approximate
        surfaceArea = 3 * Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(sideLength, 2); // Approximate
        vertices = 20; // Approximate
        edges = 30; // Approximate
        faces = 12; // Approximate
        break;
      default:
        break;
    }

    return { volume, surfaceArea, vertices, edges, faces };
  };
