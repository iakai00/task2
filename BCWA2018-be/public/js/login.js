use strict';

const sendForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('/node/user/login/', settings)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    if(json.length < 1) {
      message.style.color = 'red';
      message.innerText = 'Username or password is wrong.'
    } else {
      const token = json.token;
      setCookie('cookieName',token,1);
      window.location.replace('/node/');
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