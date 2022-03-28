let listaLocalizacoes = [];

const options = {
  enableHighAccuracy: true
};


function transferCoords(pos) {
  const coords = pos.coords;

  listaLocalizacoes.push(`${coords.longitude} ${coords.latitude}`)
}

function errorTransferCoords(error) {
  console.warn("ERROR TO GET LOCALIZATION");
}


let gps = navigator.geolocation.watchPosition(
  transferCoords,
   errorTransferCoords,
    options)
    
setInterval(() => {
  navigator.geolocation.clearWatch(gps);
  console.log(listaLocalizacoes);
}, 20000);


