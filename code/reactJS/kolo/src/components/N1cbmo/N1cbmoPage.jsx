import React, { useState } from "react";

import Astroid from "./components/Curves/Astroid";
import BezierCurve from "./components/Curves/BezierCurve";
import Cardioid from "./components/Curves/Cardioid";
import CassiniOval from "./components/Curves/CassiniOval";
import CatenaryCurve from "./components/Curves/CatenaryCurve";
import ClothoidCurve from "./components/Curves/ClothoidCurve";
import Deltoid from "./components/Curves/Deltoid";
import Epitrochoid from './components/Curves/Epitrochoid';
import PolarRose from './components/Curves/PolarRose';
import Hypotrochoid from './components/Curves/Hypotrochoid';
import Nepheloid from './components/Curves/Nepheloid';
import PascalSnail from './components/Curves/PascalSnail';
import Sinusoid from './components/Curves/Sinusoid';
import SinusoidalSpiral from './components/Curves/SinusoidalSpiral';

import ChladniFigures from "./components/Figures/ChladniFigures";
import LichtenbergFigures from "./components/Figures/LichtenbergFigures";
import PolygonsRegular from "./components/Figures/PolygonsRegular";
import ReuleauxTriangle from "./components/Figures/ReuleauxTriangle";
import StarsRegular from "./components/Figures/StarsRegular";

import ArchimedeanSpiral from "./components/Spirals/ArchimedeanSpiral";
import FermatSpiral from "./components/Spirals/FermatSpiral";
import GalileanSpiral from "./components/Spirals/GalileanSpiral";
import GoldenSpiral from "./components/Spirals/GoldenSpiral";
import HyperbolicSpiral from "./components/Spirals/HyperbolicSpiral";
import LogarithmicSpiral from "./components/Spirals/LogarithmicSpiral";

import Knots from "./components/Knots";

import LissajousFigures from "./components/HarmonicCurves/LissajousFigures";

import ApollonianGasket from "./components/Fractals/ApollonianGasket";
import BarnsleyFern from './components/Fractals/BarnsleyFern';
import BrownianTree from './components/Fractals/BrownianTree';
import DragonCurve from './components/Fractals/DragonCurve';
import GosperCurve from './components/Fractals/GosperCurve';
import HilbertCurve from './components/Fractals/HilbertCurve';
import JuliaSet from './components/Fractals/JuliaSet';
import KochSnowflake from './components/Fractals/KochSnowflake';
import MandelbrotSet from './components/Fractals/MandelbrotSet';
import MinkowskiCurve from './components/Fractals/MinkowskiCurve';
import MooreCurve from './components/Fractals/MooreCurve';
import NewtonBasins from './components/Fractals/NewtonBasins';
import PythagorasTree from './components/Fractals/PythagorasTree';

import Apkohtahg from './components/Apkohtahg';


const N1cbmoPage = () => {
  const [activeTab, setActiveTab] = useState("Apkohtahg");
  const renderContent = () => {
    switch (activeTab) {
      case "Mahdapq":
        return "Mahdapq";
      case "Apkohtahg":
        return <Apkohtahg />
      case "Ra9metpi9":
        return "Ra9metpi9";
      case "Curves":
        return (
          <>
            <SinusoidalSpiral />
            <Sinusoid />
            <PascalSnail />
            <Nepheloid />
            <Hypotrochoid />
            <PolarRose />
            <Epitrochoid />
            <BezierCurve />
            <CatenaryCurve />
            <ClothoidCurve />
            <Deltoid />
            <CassiniOval />
            <Cardioid />
            <Astroid />

          </>
        );
      case "Spiral":
      return (
        <>
          <ArchimedeanSpiral />
          <FermatSpiral />
          <GalileanSpiral />
          <GoldenSpiral />
          <LogarithmicSpiral />
          <HyperbolicSpiral />
        </>
      );
      case "Fractals":
        return (
        <>
          <PythagorasTree />
          <NewtonBasins />
          <MooreCurve />
          <MinkowskiCurve />
          <MandelbrotSet />
          <KochSnowflake />
          <JuliaSet />
          <HilbertCurve />
          <DragonCurve />
          <GosperCurve />
          <BrownianTree />
          <BarnsleyFern />
          <ApollonianGasket />
        </>
      )
      case "Figures":
        return (
          <>
            <ChladniFigures />
            <LichtenbergFigures />
            <PolygonsRegular />
            <StarsRegular />
            <ReuleauxTriangle />
          </>
        );
      case "HarmonicCurves":
        return <LissajousFigures />;
      case "Knots":
        return <Knots />;
      default:
        return <div>Select a tab</div>;
    }
  };

      return (
        <div>
      <div>
        <button onClick={() => setActiveTab("Curves")}>Curves</button>
        <button onClick={() => setActiveTab("Spiral")}>Spiral</button>
        <button onClick={() => setActiveTab("Fractals")}>Fractals</button>
        <button onClick={() => setActiveTab("Figures")}>Figures</button>
        <button onClick={() => setActiveTab("Knots")}>Knots</button>
        <button onClick={() => setActiveTab("HarmonicCurves")}> Harmonic Curves </button>
        <button onClick={() => setActiveTab("Apkohtahg")}> Apkohtahg </button>
        <button onClick={() => setActiveTab("Mahdapq")}> Mahdapq </button>
        <button onClick={() => setActiveTab("Ra9metpi9")}> Ra9metpi9 </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default N1cbmoPage;
