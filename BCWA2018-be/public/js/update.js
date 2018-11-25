'use strict';

const sendForm = (evt) => {
  evt.preventDefault();
  if(cookieSet) {
    const fd = new FormData(frm);
    const settings = {
      method: 'post',
      body: fd,
      headers:{'x-access-token':cookieSet}
    };

    fetch('/node/update/', settings)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if(json.status != 401) {
        message.style.color = 'green';
        message.innerText = 'Media successfully updated.';
        if (json.mimeType.includes('image')) {
          img.src = json.url;
        } else if (json.mimeType.includes('audio')) {
          aud.src = json.url;
        } else {
          vid.src = json.url;
        }
      } else {
        message.style.color = 'red';
        message.innerText = json.message;
      }
    })
    .catch(error => console.log(error));
  } else {
    message.innerText = 'You are not logged in. Login to update media.'
  }
};

frm.addEventListener('submit', sendForm);