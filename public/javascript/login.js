console.log('this is connected')
const logIn = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#floating_username").value;
  const password = document.querySelector("#floating_password").value;

  if (username && password) {
      const response = await fetch('/api/profile/login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {'Content-Type': 'application/json'},
      });
      console.log(response);
      if(response.ok) {
          //refresh to signed in profile page goes here
        document.location.replace('/dashboard');
      } else {
          window.alert('Login failed')
      }
  } 
};

const home = () => {
    document.location.replace('/');
};

const signUP = () => {
    document.location.replace('/signup');
}

const contactPage = () => {
document.location.replace('/contact');
}

if (document.querySelector('#contact-button')) {
document.querySelector('#contact-button').addEventListener('click', contactPage);
}

document.querySelector("#login_submit").addEventListener('click', logIn);
document.querySelector('#home-button').addEventListener('click', home);
document.querySelector('#signup-button').addEventListener('click', signUP);