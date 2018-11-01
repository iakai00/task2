'use strict';
function validateForm() {

  const f_name = document.forms["myForm"]["firstname"].value;
  const l_name = document.forms["myForm"]["lastname"].value;
  const mail = document.forms["myForm"]["email_address"].value;
  const pwd = document.forms["myForm"]["password"].value;
  const phone = document.forms["myForm"]["phone_number"].value;
  const addrs = document.forms["myForm"]["address"].value;
  const post = document.forms["myForm"]["postal_code"].value;

  
  if (f_name == "" || l_name == "") {
    alert("First name and last name is required");
    return false;
  }

  if (mail != "") {
    if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
        mail)) {
      alert("Please type a valid e-mail address");
      return false;
    }
  }

  if (pwd == ""){
     alert("Password is required");
     return false;
   }

   if (phone != ""){
    if(!/\+358[0-9]{9}/.test(phone)) {

      alert("Phone number is invalid");
      return false;
    }
  }

   if (post!=""){
    if(!/[0-9]{5}/.test(post)){
      alert("Postal code must be 5 characters")
      return false;
    }
  }
}




