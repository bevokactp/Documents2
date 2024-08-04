import React from 'react';

const nets = {
  tetrahedron: `
    <polygon points="0,0 50,0 25,43.3" fill="lightblue" stroke="black" strokeWidth="2"/>
    <polygon points="50,0 100,0 75,43.3" fill="lightcoral" stroke="black" strokeWidth="2"/>
    <polygon points="25,43.3 75,43.3 50,86.6" fill="lightgreen" stroke="black" strokeWidth="2"/>
  `,
  cube: `
  `,
  octahedron: `
  `,
  dodecahedron: `
  `,
  icosahedron: `
  `,
};



const PlatonicSolidNet = () => {
  return (
    <div>
      <h1>Platonic Solids Nets</h1>
      {Object.keys(nets).map((key) => (
        <div key={key} style={{ marginBottom: '20px' }}>
          <h2>{key.charAt(0).toUpperCase() + key.slice(1)} Net</h2>
          <svg width="200" height="200" viewBox="0 0 100 100">
            <g dangerouslySetInnerHTML={{ __html: nets[key] }} />
          </svg>


        </div>
      ))}
    </div>
  );
};

export default PlatonicSolidNet;
