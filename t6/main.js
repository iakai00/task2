'use strict';

const berry = document.getElementById("berry");
console.log("berry");
console.log("I found the berry: " + berry.innerHTML);

const orange = document.querySelector("li[data-foodtype= squishy]");
console.log(orange);
console.log("I found the fruit :" + orange.innerHTML);

const liElement = document.getElementsByTagName('li');
console.log(liElement);


console.log("Using the loop here: ");
for (let i = 0; i <liElement.length; i++){
  console.log(liElement[i].innerHTML);
  liElement[i].style.width  = "100px";
  liElement[i].style.listStyleType  = "None";
  liElement[2].style.background  = "orange";
  liElement[3].style.background  = "green";
  liElement[5].style.background  = "rgb(220,53,101)";

}

const elements = document.querySelectorAll("li");
console.log(elements);

elements.forEach((elements) =>{
  elements.style.border = "1px solid black"
});