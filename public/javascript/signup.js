const signUp = async(event) => {
  event.preventDefault();

  const username = document.querySelector("#floating_username").value;
  const password = document.querySelector("#floating_password").value;
  const passwordMatch = document.querySelector("#floating_repeat_password").value;
  if (password !== passwordMatch) {
      window.alert('passwords do not match');
      //we can add some flair to this if we want
      return
  }

  if (username && password) {
      const response = await fetch('/api/profile', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3001'},
      });
      console.log("profile made?");
      if(response.ok) {
        document.location.replace('/dashboard');
      } else {
          window.alert('signUp failed')
      }
  }
};

const home = () => {
    document.location.replace('/');
};

const logIN = () => {
    document.location.replace('/login');
};

document.querySelector("#signup_submit").addEventListener('click', signUp);
document.querySelector("#home-button").addEventListener('click', home);
document.querySelector("#login-button").addEventListener('click', logIN);


