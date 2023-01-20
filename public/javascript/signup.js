//this javascript is associated with the login and signup html pages

const signUp = async(event) => {
  event.preventDefault();

  const userName = document.querySelector("#floating_username").value;
  const password = document.querySelector("#floating_password").value;
  const passwordMatch = document.querySelector("#floating_repeat_password").value;
  console.log('event listened');
  console.log(userName, password, passwordMatch);
  if (password !== passwordMatch) {
      window.alert('passwords do not match');
      //we can add some flair to this if we want
      return
  }

  if (userName && password) {
      const response = await fetch('/api/profile', {
          method: 'POST',
          body: JSON.stringify({userName, password}),
          headers: {'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3001'},
      });
      console.log("profile made?");
      if(response.ok) {
          //refresh to signed in profile page goes here
      } else {
          window.alert('signUp failed')
      }
  }
};



//these may need to be added to handlebars
const signupButton = document.querySelector("#signup_submit");
console.log(signupButton);
signupButton.addEventListener('click', signUp);
// document.querySelector("#login_submit").addEventListener('submit', logIn);
