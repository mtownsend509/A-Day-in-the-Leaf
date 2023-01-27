
const loginButton = async (event) => {
  event.preventDefault();

  document.location.replace('/login')
}

document.querySelector("#login-button").addEventListener('click', loginButton);

const signupButton = async (event) => {
  event.preventDefault();

  document.location.replace('/signup')
}

document.querySelector("#signup-button").addEventListener('click', signupButton);