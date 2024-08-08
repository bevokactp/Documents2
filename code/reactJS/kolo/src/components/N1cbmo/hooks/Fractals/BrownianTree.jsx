// hooks/Fractals/BrownianTree.jsx
import { useState } from 'react';

const useBrownianTree = () => {
  const [treeParameters, setTreeParameters] = useState({
    particles: 16,
    branchLength: 6
  });

  const handleTreeParameterChange = (e) => {
    const { name, value } = e.target;
    setTreeParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseInt(value, 10) || 0
    }));
  };

  return [treeParameters, handleTreeParameterChange];
};

export default useBrownianTree;
