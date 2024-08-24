const btn1= document.getElementById('gologinbtn');
const swiper = new Swiper('.swiper', {  
    //Optional parameters  
    direction: 'horizontal',  
    loop: true,  
  
    // If we need pagination  
    pagination: {  
      el: '.swiper-pagination',  
    },  
  
    // Navigation arrows  
    navigation: {  
      nextEl: '.swiper-button-next',  
      prevEl: '.swiper-button-prev',  
    },  
   });

function Eyecontrolpass(){
    const inputpass = document.getElementById("password");
    const eyes = document.getElementById("eyes");
      if(inputpass.type === "password"){
       inputpass.type = "text";
       eyes.classList.remove("fa-eye");
       eyes.classList.add("fa-eye-slash")
      }
      else
      {
         inputpass.type = "password";
         eyes.classList.remove("fa-eye-slash");
         eyes.classList.add("fa-eye");
      }
  }

  const btn2= document.getElementById('goonboardingbtn');


function GoToonboard(){
 window.location.href= "http://localhost:5173/index.html"
}

function GoToLogin(){
    window.location.href= "http://localhost:5173/login.html"
}

function GoToSignUp(){
    window.location.href= "http://localhost:5173/signup.html"
   }

   