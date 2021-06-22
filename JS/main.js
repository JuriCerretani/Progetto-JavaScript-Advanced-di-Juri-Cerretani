
//Realizziamo un'app che ci permetta di ottenere
//informazioni sui livelli di inquinamento di una città.

//Dichiarazioni variabili html
let btn = document.getElementById('btn');
let inp = document.getElementById('inp');
let box = document.getElementById('box');
let btnClear = document.getElementById('clear')

//ApiKey
let url = 'https://api.waqi.info'


//Ottenere la posizione
function position(pos){

  let lat = Math.round(pos.coords.latitude);
  let lon = Math.round(pos.coords.longitude);

  let uri = url + '/feed/geo:'+ lat +';'+ lon +'/?token='+ apiKey;

  fetch(uri)
  .then(res => res.json())
  .then(function(data) {

    let el = document.createElement('li');
    el.innerHTML = data.data.city.name + ' : ' + data.data.iaqi.pm25.v;
    box.appendChild(el);
  })
}

navigator.geolocation.getCurrentPosition(position);



//Funzione che restituisce valore di inquinamento data una città

btn.addEventListener('click', inq);

function inq(){

  let city = inp.value;
  let uri = url + '/feed/' + city + '/?token=' + apiKey;
  inp.value = '',

  fetch(uri)
  .then(res => res.json())
  .then(function(data) {

    let el = document.createElement('li');
    el.innerHTML = data.data.city.name + ' : ' + data.data.aqi;
    box.appendChild(el);

      })

  .catch((error) => alert(error.message));

}

btnClear.addEventListener('click', clear=>(box.innerHTML = ''));
