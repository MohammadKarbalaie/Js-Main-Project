const btn1= document.getElementById('gologinbtn');
const user =document.getElementById("username");
const Submitbtn =document.getElementById("sbtn");
const inputpass = document.getElementById("password");
const eyes = document.getElementById("eyes");



function Eyecontrolpass(){
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
 window.location.href= "/index.html"
}

function GoToLogin(){
    window.location.href= "/login.html"
}

function GoToSignUp(){
    window.location.href= "/signup.html"
}

function ActiveBtn() {
    if(inputpass.value != "" && user.value != ""){
    //  Submitbtn.classList.add("bg-black")
       Submitbtn.style.backgroundColor = "black";
    }
    else{
        // Submitbtn.classList.remove("bg-black")
        Submitbtn.style.backgroundColor = "";
 }
};
inputpass.addEventListener("input", ActiveBtn)
