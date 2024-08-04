
import React, { useState, useEffect } from 'react';

const coordinates_capital_earth = { latitude: 50.81111762690693, longitude: 46.499307398882245 };;

function getCoordinatesByGrinvich() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          });
        },
        () => {
          reject(null); // В случае ошибки отклоняем Promise
        }
      );
    } else {
      reject(null); // В случае отсутствия поддержки геолокации отклоняем Promise
    }
  });
}


function getCoordinatesByCapitalEarth() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            longitude: position.coords.longitude - coordinates_capital_earth.longitude,
            latitude: position.coords.latitude - coordinates_capital_earth.latitude
          });
        },
        () => {
          reject(null); // В случае ошибки отклоняем Promise
        }
      );
    } else {
      reject(null); // В случае отсутствия поддержки геолокации отклоняем Promise
    }
  });
}


export default function Location () {

  const [coordsGrinvich, setCoordsGrinvich] = useState(null);
  const [coordsCapitalEarth, setCoordsCapitalEarth] = useState(null);

  useEffect(() => {
    getCoordinatesByGrinvich().then(setCoordsGrinvich).catch(console.error);
    getCoordinatesByCapitalEarth().then(setCoordsCapitalEarth).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Location</h2>
      <p>coordinates by Grinvich: {coordsGrinvich ? `${coordsGrinvich.latitude}, ${coordsGrinvich.longitude}` : 'Loading...'}</p>
      <p>coordinates by capital of Earth: {coordsCapitalEarth ? `${coordsCapitalEarth.latitude}, ${coordsCapitalEarth.longitude}` : 'Loading...'}</p>
    </div>

  )
}

