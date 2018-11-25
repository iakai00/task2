'use strict';

const sendForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(frm);
  console.log(fd.get('username'));
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('/node/user/', settings)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    if(json.affectedRows == 1) {
      message.style.color = 'green';
      message.innerText = 'You are signedUp you can logIn now.';
    } else if(error.errno = 1062) {
      message.style.color = 'red';
      message.innerText = 'Usename not available';
    } else {
      message.style.color = 'red';
      message.innerText = 'An error occured while signing up.';
    }
  })
  .catch(error => {
    if(error.errno = 1062) {
      message.style.color = 'red';
      message.innerText = 'Usename not available';
    } else {
      message.style.color = 'red';
      message.innerText = 'An error occured while signing up.';
    }
  });

};

frm.addEventListener('submit', sendForm);