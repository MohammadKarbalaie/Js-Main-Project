import { toast } from "../libs/toast";
import { signup } from "../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
// import { setSessionToken } from "../libs/session-manager";

const signupForm = document.getElementById("signup");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const usernameInput = event.target.username;
  const passwordInput = event.target.password;
  try {
    console.log("ok1");
    const response = await signup({
      username: usernameInput.value,
      password: passwordInput.value,
    });
    setSessionToken(response.token);
    toast("Signed in", "success");
    console.log("ok2");
    setTimeout(() => {
     window.location.href = "/login";
     }, 3000);
   } catch (error) {
    errorHandler(error);
   }
});