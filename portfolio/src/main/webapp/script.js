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
var noComm = 3;

function addRandomFact() {
  const facts =
      ['I am currently learning to play guitar!', 'My favourite language is turkish', 'I have been practising dancing for 10 years', 'For a couple of time I did not know if I wanted to become a doctor or a programmer', 'My favourite Netflix series is Dark', 'I love reading, but also writing'];

  // Pick a random fact.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
  factContainer.style.fontSize = "20px";
  factContainer.style.color = "aliceblue";

}

/*function getMessage() {
  fetch('/data').then(response => response.text()).then((message) => {
    document.getElementById('message-container').innerText = message;
  });
}

function getComments(){
  fetch('/data').then(response => response.json()).then((comms) => {

    const commsListElement = document.getElementById('server-comments-container');
    commsListElement.innerHTML = '';
    for(var i = 0; i < comms.length; i++){
        commsListElement.appendChild(createListElement("Comment number " + i + " : " + comms[i] + "\n"));
    }
  });
}*/


function createListElement(comment) {
  console.log("in createListElement");
  const liElement = document.createElement('li');
  var text = "User "+comment.name+"   added this comment: "+comment.message+" , posted on "+comment.date;
  liElement.innerText = text;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);
    liElement.remove();
    //location.reload();
  });
  liElement.appendChild(deleteButtonElement);
  return liElement;
}

function noOfComments(selectedValue) {
  console.log("nuca");
  console.log(selectedValue);
  noComm = selectedValue.value;
  console.log(noComm);
  loadComments();
}

function loadComments() {
    console.log("loadComments");
  fetch('/comments').then(response => response.json()).then((comments) => {
    console.log(comments);
    const commentListElement = document.getElementById('previous-comments');
    commentListElement.innerHTML = '';
    if(noComm > comments.length) noComm = comments.length; 
    console.log(noComm);
    console.log(comments);
    console.log(comments[0].name);
    console.log(comments[0]);
    for(var i = 0; i < noComm; i++){
        commentListElement.appendChild(createListElement(comments[i]));
        
    }
  });
  
  console.log("loadComments");
}


/** Tells the server to delete the comment. */

function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comments', {method: 'POST', body: params});
}


