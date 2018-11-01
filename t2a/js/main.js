'use strict';
function validateForm() {

  const f_name =document.getElementById("id_name").value;
  const l_name = document.getElementById("id_lname").value;
  const mail = document.getElementById("id_email").value;
  const pwd = document.getElementById("id_pwd").value;
  const phone = document.getElementById("id_phone").value;
  const post = document.getElementById("id_post").value;

  //firstname and last name validation
  if (f_name == ""){
    document.getElementById('name_error').innerHTML = "** Please fill the first name";
    return false;
  }
  if (l_name == ""){
    document.getElementById('lname_error').innerHTML = "** Please fill the last name";
    return false;
  }
  //mail validation
  if (mail != ""){
    if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(mail)){
      document.getElementById('mail_error').innerHTML = "** Please give a valid email";
      return false;
    }
  }
  //password validation
  if(pwd == ""){
    document.getElementById('pwd_error').innerHTML = "** Password required";
    return false;
  }
  //phone validation
  if (phone != ""){
    if(!/\+358[0-9]{9}/.test(phone)) {
      document.getElementById('phone_error').innerHTML = "** Please fill a valid phone number";
      return false;
    }
  }
  //postal code validation
  if (post!=""){
    if(!/[0-9]{5}/.test(post)){
      document.getElementById('code_error').innerHTML = "** Postal code is invalid";
      return false;
    }
  }
}




