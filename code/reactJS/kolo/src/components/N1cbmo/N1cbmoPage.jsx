import React from 'react';

import Chladni from './components/Chladni';
import Lichtenberg from './components/Lichtenberg';
import Lissajous from './components/Lissajous';
import Knots from './components/Knots';
import PolygonsRegular from './components/PolygonsRegular';
import Stars from './components/Stars';

import hookChladni from './hooks/Chladni';
import hookLichtenberg from './hooks/Lichtenberg';
import hookLissajous from './hooks/Lissajous';
import hookKnots from './hooks/Knots';
import hookPolygonsRegular from './hooks/PolygonsRegular';
import hookStars from './hooks/Stars';


const N1cbmoPage = () => {

  const [parametersChladni, handleChangeChladni] = hookChladni();
  const [parametersLichtenberg, handleChangeLichtenberg] = hookLichtenberg();
  const [parametersLissajous, handleChangeLissajous] = hookLissajous();
  const [parametersKnots, handleChangeKnots] = hookKnots();
  const [parametersPolygonsRegular, handleChangePolygonsRegular] = hookPolygonsRegular();
  const [parametersStars, handleChangeStars] = hookStars();

  return (
    <div>
      <Chladni parameters={parametersChladni} onChange={handleChangeChladni} />
      <Lichtenberg parameters={parametersLichtenberg} onChange={handleChangeLichtenberg} />
      <Lissajous parameters={parametersLissajous} onChange={handleChangeLissajous} />
      <Knots parameters={parametersKnots} onChange={handleChangeKnots} />
      <PolygonsRegular parameters={parametersPolygonsRegular} onChange={handleChangePolygonsRegular} />
      <Stars parameters={parametersStars} onChange={handleChangeStars} />
    </div>
  );
};

export default N1cbmoPage;
