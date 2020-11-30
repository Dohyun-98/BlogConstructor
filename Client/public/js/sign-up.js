'use strict';

let signinfo = document.querySelector('.sign-info-1');
let signbtn1 = document.querySelector('.sign-btn-1');
let signup = document.querySelector('.sign-up');

console.log(signinfo);
console.log(signbtn1);
console.log(signup);

signbtn1.addEventListener('click',()=>{
    signinfo.classList.add('disable');
    signup.classList.remove('disable');
})