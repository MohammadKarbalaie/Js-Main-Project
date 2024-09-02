import { errorHandler } from "../libs/error-handler";
import { getUserInfo } from "../apis/services/user.service";
import { removeSessionToken } from "../libs/session-manager"



const greeting = document.getElementById('greeting');
const username = document.getElementById("username");

async function fetchUserInfo() {
  try {
    const response = await getUserInfo();
    username.innerText = response.username;
    username.setAttribute("title", response.username);
  } catch (error) {
    errorHandler(error);
  }
}

async function displayGreeting() {
    try {
        const currentHour = new Date().getHours();
        let greetingMessage;

        if (currentHour < 12) {
            greetingMessage = "Good Morning!👋";
        } else if (currentHour >= 12 && currentHour < 14) {
            greetingMessage = "Good Afternoon! 👋";
        } else if (currentHour >= 14 && currentHour < 18){
            greetingMessage = "Good Evening! 👋";
        } else{
            greetingMessage = "Good Night! 👋";
        }
        
        document.getElementById('greeting').innerText = greetingMessage;
    } catch (error) {
        console.error("Error displaying greeting:", error);
    }
}


function goout() {
    const response =  removeSessionToken()
    window.location.href = '/login.html';
}

const logout = document.getElementById('logout');
logout.addEventListener('click',goout) 


displayGreeting();

fetchUserInfo();
