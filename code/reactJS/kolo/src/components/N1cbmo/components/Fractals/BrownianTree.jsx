// components/Fractals/BrownianTree.jsx
import React from 'react';
import DrawBrownianTree from '../../draw/Fractals/BrownianTree';
import useBrownianTree from '../../hooks/Fractals/BrownianTree';

const BrownianTree = () => {
  const [treeParameters, handleTreeParameterChange] = useBrownianTree();

  return (
    <div>
      <h3>Brownian Tree</h3>
      <label>
        Particles:
        <input
          type="number"
          name="particles"
          value={treeParameters.particles}
          onChange={handleTreeParameterChange} disabled
        />
      </label>
      <label>
        Branch Length:
        <input
          type="number"
          name="branchLength"
          value={treeParameters.branchLength}
          onChange={handleTreeParameterChange} disabled
        />
      </label>
      <DrawBrownianTree treeParameters={treeParameters} />
    </div>
  );
};

export default BrownianTree;
