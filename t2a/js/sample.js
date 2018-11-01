'use strict';

document.querySelector("#test");
const firstElement = document.querySelector('p');

firstElement.innerHTML = 'I added<strong>this</strong> what';
firstElement.setAttribute('style', 'color: red');
firstElement.addEventListener('click', (evt) => {
  console.log(evt.target);
  evt.currentTarget.setAttribute('style', 'background: purple');
});

const exampleElements = document.querySelectorAll('.example');
console.log(exampleElements);

const changeColour = (evt) => {
  console.log(evt.target);
  evt.currentTarget.setAttribute('style', 'background: yellow');
};

for (let i = 0; i < exampleElements.length; i++){
    console.log(exampleElements[i]);
    exampleElements[i].setAttribute('style', 'color: green');
    exampleElements[i].addEventListener('click', changeColour);
}