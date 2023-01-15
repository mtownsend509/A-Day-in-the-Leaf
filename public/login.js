//still needs to be matched with html elements and api routes, and linked to HTML files

const signUp = async(event) => {
    event.preventDefault();

    const userName = document.querySelector(/*Not sure what the id is yet*/).value;
    const password = document.querySelector(/*Not sure what the id is yet*/).value;
    const passwordMatch = document.querySelector(/*Not sure what the id is yet*/).value;

    if (password !== passwordMatch) {
        window.alert('passwords do not match');
        //we can add some flair to this if we want
        return
    }

    if (userName && password) {
        //we need to make the following result in a signed in status 
        //on the backend, & add username check for unique
        const response = await fetch(/*route for signup*/, {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.ok) {
            //refresh to signed in profile page goes here
        } else {
            window.alert('signUp failed')
        }
    }
};

const logIn = async (event) => {
    event.preventDefault();

    const userName = document.querySelector(/*Not sure what the id is yet*/).value;
    const password = document.querySelector(/*Not sure what the id is yet*/).value;

    if (userName && password) {
        //we need to make the following result in a signed in status 
        //on the backend, & add username password check
        const response = await fetch(/*route for login*/, {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.ok) {
            //refresh to signed in profile page goes here
        } else {
            window.alert('Login failed')
        }
    } 
};

document.querySelector(/*sign up input element*/).addEventListener('submit', signUp);
document.querySelector(/*log in input element*/).addEventListener('submit', signUp);