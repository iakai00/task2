// Create function 'showImages' which
// adds the loaded HTML content to <ul> element

//create function "show images" which
// add the loaded HTML content to <ul> element

const showImages = (html) => {
  document.querySelector('ul').innerHTML = html;
};

fetch('images.html').then((response) => {
  return response.text();
}).then((html) => {
  showImages(html);
});


/*

task B
 const showImages = (images) => {
 images.forEach((images) =>{
 document.querySelector('ul').innerHTML += `something....`;
 });

 //or
 for(let i = 0; i < images.length; i++){
 console.log(images[i]);
 }
 //or
 document.querySelector('ul').innerHTML = images.map((image) => {
 return `dfsd...`;
 });

 };


fetch('images.json').then((response)) => {
  return response.json();
  console.log(response.text());
}).then((json)) => {
  showImages(json);*/
