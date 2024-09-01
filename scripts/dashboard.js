import { errorHandler } from "../libs/error-handler";
import { getUserInfo } from "../apis/services/user.service";


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

displayGreeting();

fetchUserInfo();
