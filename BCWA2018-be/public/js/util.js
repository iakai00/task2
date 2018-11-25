const frm = document.querySelector('#mediaform');
const img = document.querySelector('#image');
const aud = document.querySelector('#aud');
const vid = document.querySelector('#vid');

const update = document.getElementById('update');
const signUp = document.getElementById('signUp');
const logIn = document.getElementById('logIn');

const setCookie = (key, value,days) => {
  let expires;
  if(days) {
    expires = new Date(new Date().getTime() + days*24*60*60*1000);
  } else{
    expires = '';
  }
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};expires=${expires}`;
}

const getCookie = key => decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

message.style.color = 'red';
const cookieSet = getCookie('cookieName');
if(cookieSet) {
  signUp.style.display = 'none';
  logIn.innerText = 'Logout';
}

logIn.addEventListener('click',(evt) => {
  evt.preventDefault();
  if(cookieSet) {
    const settings = {
      method: 'post',
      headers:{'x-access-token':cookieSet}
    };

    fetch('/node/user/logout/', settings)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if(json.logout) {
        setCookie('cookieName','', -1);
        window.location.replace('/node/');
      }
    })
    .catch(error => {
      message.style.color = 'red';
      message.innerText = 'An error occured while logging out.';
    });
  } else {
    window.location.replace('/node/login.html');
  }
})