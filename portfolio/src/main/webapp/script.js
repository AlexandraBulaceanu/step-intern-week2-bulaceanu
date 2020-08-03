// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */

var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;

var my_awesome_script = document.createElement('script');

my_awesome_script.setAttribute('src','https://maps.googleapis.com/maps/api/js?key='+config.SECRET_KEY);

document.head.appendChild(my_awesome_script);

var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;

var my_awesome_script = document.createElement("script");

my_awesome_script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=" + config.SECRET_KEY);

document.head.appendChild(my_awesome_script);

function addRandomFact() {
    const facts = [
        "I am currently learning to play guitar!",
        "My favourite language is turkish",
        "I have been practising dancing for 10 years",
        "For a couple of time I did not know if I wanted to become a doctor or a programmer",
        "My favourite Netflix series is Dark",
        "I love reading, but also writing",
    ];

    // Pick a random fact.
    const fact = facts[Math.floor(Math.random() * facts.length)];

    // Add it to the page.
    const factContainer = document.getElementById("fact-container");
    factContainer.innerText = fact;
    factContainer.style.fontSize = "20px";
    factContainer.style.color = "aliceblue";
}

function createListElement(comment) {
  console.log("in createListElement");
  const liElement = document.createElement('li');
  var text = comment.name+"   added this comment: "+comment.message+" , posted on "+comment.date+" with score of: "+comment.score;
  liElement.innerText = text;
  liElement.style.backgroundColor = comment.score > 0 ? "green" : "red";

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);
    liElement.remove();
    
  });
  liElement.appendChild(deleteButtonElement);
  return liElement;

}

/**limit the numbers of comments */
function noOfComments(selectedValue){ 
  noComm = selectedValue.value;
  loadComments(noComm);

}

/**load the comments */


function loadComments(noComm = "3") {

  fetch('/comments').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('previous-comments');
    commentListElement.innerHTML = '';
    if(noComm > comments.length) noComm = comments.length;
     
    for(var i = 0; i < noComm; i++){
        commentListElement.appendChild(createListElement(comments[i]));
    }

  });
}

/** Tells the server to delete the comment. */

function deleteComment(comment) {
    const params = new URLSearchParams();
    params.append("id", comment.id);
    fetch("/delete-comments", { method: "POST", body: params });
    loadComments();
}
  
function authentication(){
    fetch('/login').then(response => response.json()).then((user) => {
    const commentSection = document.getElementById('comm-section');
    const loginSection = document.getElementById('login');
    const loginMessage = document.getElementById('login-message');
    const logoutSection = document.getElementById('logout');
    console.log(user);
    if (user.loggedIn) {
        commentSection.style.display= 'block';
        loginSection.style.display= 'none';
        logoutSection.innerHTML = '<br><a href="' + user.url + '">Logout</a>';
        
    } else {
        commentSection.style.display= 'none';
        loginSection.style.display= 'block';
        loginMessage.innerHTML += '<a href="' + user.url + '">Login</a>';
        
    }
    });
}

var mapObj = {

}


/** Creates a map that allows users to add markers. */
function initMap() {
  
  const homeBucharestCoords = {
    lat: 44.438138,
    lng: 26.009505,
  };
  const universityOfBucharestCoords = {
    lat: 44.435556,
    lng: 26.099669,
  };
  const academyOfEconomicStudiesCoords = {
    lat: 44.447545,
    lng: 26.096667,
  };

  mapObj["map"] = new google.maps.Map(
      document.getElementById('map'),
      {center: homeBucharestCoords, zoom: 16});

 
 const homeBucharestMarker = new google.maps.Marker({
    position: homeBucharestCoords, 
    map: mapObj["map"]
  });
  const university1Marker = new google.maps.Marker({
    position: universityOfBucharestCoords, 
    map: mapObj["map"]
  });
  const university2Marker = new google.maps.Marker({
    position: academyOfEconomicStudiesCoords, 
    map: mapObj["map"]
  });

  mapObj["map"].addListener('click', (event) => {
    createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
  });

  fetchMarkers();

}

/** Fetches markers and adds them to the map. */
function fetchMarkers() {
    fetch("/markers")
        .then((response) => response.json())
        .then((markers) => {
            markers.forEach((marker) => {
                createMarkerForDisplay(marker.lat, marker.lng, marker.content);
            });
        });
}

/** Creates a marker that shows a info window */
function createMarkerForDisplay(lat, lng, content) {
  const marker =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: mapObj["map"]});
 
  const infoWindow = new google.maps.InfoWindow({content: content});
  marker.addListener('click', () => {
    infoWindow.open(mapObj["map"], marker);
  });
}

/** Sends a marker to the backend for saving. */
function postMarker(lat, lng, content) {
    const params = new URLSearchParams();
    params.append("lat", lat);
    params.append("lng", lng);
    params.append("content", content);

    fetch("/markers", { method: "POST", body: params });
}

/** Creates a marker that shows a textbox the user can edit. */
function createMarkerForEdit(lat, lng) {

  // If we're already showing an editable marker, then remove it.
  if (mapObj["currentMarker"]) {
    mapObj["currentMarker"].setMap(null);
  }
 
  mapObj["currentMarker"] =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: mapObj["map"]});
 
  const infoWindow =
      new google.maps.InfoWindow({content: buildInfoWindowInput(lat, lng)});
 
  // If the user closes the info window, I remove the marker.
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    mapObj["currentMarker"].setMap(null);
  });
 
  infoWindow.open(mapObj["map"], mapObj["currentMarker"]);

}

/**
 * Builds and returns HTML elements that show an editable textbox and a submit
 * button.
 */
function buildInfoWindowInput(lat, lng) {

  const textBox = document.createElement('textarea');
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));
 
  button.onclick = () => {
    postMarker(lat, lng, textBox.value);
    createMarkerForDisplay(lat, lng, textBox.value);
    mapObj["currentMarker"].setMap(null);
  };
 
  const containerDiv = document.createElement('div');
  containerDiv.appendChild(textBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);
 
  return containerDiv;

}
