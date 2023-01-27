//lines 2-22 get the values of the form and sees if they are associated with a profile in the database, if yes redirects to the dashboard with logged in status true
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

//below are navigation button event listeners and redirections
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