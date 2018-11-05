// Create function 'showImages' which
// loads images.json which has links to images as an array.

// create a loop which builds the following HTML from every image in the array: 
/*
<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>
*/
// Make the above HTML by using DOM methods.
// Create elements with createElement()
// Add attributes with setAttribute()
// Add elements with appendChild
// When the above HTML is ready append it to the <ul> element

const showImages = (images) => {

  const ul = document.querySelector('ul');
  images.forEach((image) => {

    const h3 = document.createElement('h3');
    h3.innerText = image.mediaTitle;

    const figcaption =document.createElement('figcaption');
    figcaption.appendChild(h3);

    const figure = document.createElement('figure');
    figure.innerHTML = `<img src="img/thumbs/${image.mediaThumb}">`;
    figure.appendChild(figcaption);

    const li = document.createElement('li');
    li.appendChild(figure);
    ul.appendChild(li);

  });
};

fetch('images.json').then((response) => {
  return response.json();
}).then((json) => {
  showImages(json);
});
