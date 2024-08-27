import { toast } from "../libs/toast";
import { login } from "../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";


const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const usernameInput = event.target.username;
  const passwordInput = event.target.password;
  try {
    const response = await login({
      username: usernameInput.value,
      password: passwordInput.value,
    });
    setSessionToken(response.token);
    console.log(response);
    toast("Logged in", "success");
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  } catch (error) {
    console.log(error);
    
    errorHandler(error);
  }
});