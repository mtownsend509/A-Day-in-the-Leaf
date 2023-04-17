//line 2 - 15 gets the users username via cookie, and get requests data 
//associated with that username so that we have the correct profile_id
//in our post routes 
var username = document.cookie.slice(9); 
var profile_id = ''

const getProfID = async () => {
    const response = await fetch('/api/profile/' + username);
    response.json().then((data) => {
      profile_id = data.id;
    });
    return response
    };

getProfID();

//lines 20-38 fetches all of the plant data individually and compares
//two field to see if it's been too long since the plant has been watered
//if it has been to long it sets that plant's watered status to false
plantCardContainer = document.querySelector('#plants-container');
const hydrationCheck = async () => {
  for (i=0; i<plantCardContainer.children.length; i++) {
    let thePlant = plantCardContainer.children[i].children[0].children[1].id;
    const plantData = await (await fetch('/api/plant/' + thePlant)).json();
    console.log(plantData)
    if (plantData.waterCurrent >= plantData.waterMax) {
      const plantUpdate = await fetch('/api/plant/' + thePlant, {
        method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ watered: false })
      })
    }
  }
};

if (plantCardContainer) {
hydrationCheck();
}

//lines 41-47 set's the background image when on the graveyard page
const graveyardSwitch = document.querySelector('#plantgraveyard');
const graveyardCheck = async () => {
  document.getElementById("mainhtml").setAttribute('class', 'graveyardimage')
}
if (graveyardSwitch) {
  graveyardCheck();
}


//lines 51-63 are a function that handles logging the user out
const logout = async () => {
  const response = await fetch('/api/profile/logout', {
      method: 'POST',
      headers: {"Content-Type": 'application/json'}
  });

  if (response.ok) {
    console.log('this happened');
      document.location.replace('/');
  } else {
      window.alert('logout failed');
  }
};

//lines 66-68 are a function that sends you to the dashboard
const home = () => {
    document.location.replace('/dashboard');
};

//singlePlantPage is a function that handles the dashboard functionality for:
//navigating to the single plant page, deleting plants and adding them to the graveyard,
//and updating watered status of plants to true
const singlePlantPage = async (event) => {
  if (event.target.class = "relative px-4 -mt-16") {
    //if the user clicked on the plant card, line 78 sends the user to the single plant page, if they clicked on the delete button, lines
    //79-95 get relevent plant data through the dom, posts the plant into the graveyard table on confirmation and deletes the plant via relevent dom id and refreshes the page,
      if(parseInt(event.target.id)) {
      document.location.replace('dashboard/plant/' + event.target.id);
      } else if (event.target.id == 'delete-button') {
        var species = event.target.parentNode.parentNode.parentNode.children[0].children[0].innerHTML.trim();
        var name = event.target.parentNode.parentNode.parentNode.parentNode.children[1].innerHTML.trim();
        const confirm = window.confirm('Are you sure you want to delete this plant?');
        if (confirm == true) {
        const deadPlant = await fetch(('/api/graveyard'), {
          method: 'POST',
          body: JSON.stringify({name ,species, profile_id}),
          headers: { 'Content-Type': 'application/json' },
        })
        const response = await fetch(('/api/plant/' + event.target.parentNode.parentNode.parentElement.id), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace('/dashboard');
        }};
        //if the water button is hit, lines 97-105 update the plant watered status to true and reloads the page
      } else if (event.target.id == 'water-button') {
          const response = await fetch (('/api/plant/' + event.target.parentNode.parentNode.parentElement.id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ waterCurrent: 0, watered: true})
          })
          if (response.ok) {
            window.alert('your plant has been watered!');
            location.reload();
          }
      } else {
        console.log('doesnt work');
      }
  } else {
      console.log('shooooot');
  }
}

//function that redirects user to the add plant page
const plantAdd = () => {
  document.location.replace('dashboard/addPlant')
}

const submitPlant = async (event) => {
  event.preventDefault()
  //lines 123-184 get relevant data from form for new plant creation
  var name = document.querySelector('#name').value;
  if (!name) {
    alert("Please fill out the name field");
    return false;
  }
  var species = document.querySelector('#species').value;
  if (!species) {
    alert("Please fill out the species field");
    return false;
  }
  var scientificName = document.querySelector('#scientific-name').value;
  if (!scientificName) {
    alert("Please fill out the scientific name field");
    return false;
  }
  var adoptionDate = document.querySelector('#adoption-date').value;
  if (!adoptionDate) {
    alert("Please fill out the adoption date field");
    return false;
  }
  var height = parseInt(document.querySelector('#height').value);
  if (!height) {
    alert("Please use a number to fill out height field");
    return false;
  }
  var waterMax = document.querySelector('#water').value;
  if (!waterMax || isNaN(waterMax) == true) {
    alert("Please use a number to fill out water frequency field");
    return false;
  }
  var sunshineNeeds = document.querySelector('#sunshine-needs').value;
  if (!sunshineNeeds) {
    alert("Please fill out the sun requirement field");
    return false;
  }

  var plantType = document.querySelector('#plant-type').value;
  if (!plantType) {
    alert("Please select the plant type");
    return false;
  }
  var stage = document.querySelector('#stage').value;
  if (!stage) {
    alert("Please select the plant's stage");
    return false;
  }

  var watered = true;

  var generalNotes = document.querySelector('#general-notes').value;
  if (!generalNotes) {
    alert("Please add some notes about your plant. If you don't have any please enter 'none'. You may go back and edit these later");
    return false;
  }

  var waterCurrent = 0;

  var waterFrequency = document.querySelector('#water').value;
  if (!waterFrequency) {
    alert("Please fill out the water frequency field");
    return false;
  }
 
    //lines 187-195 add a new plant to the database and redirects the user to the dashboard
  const newPlant = await fetch('/api/plant', {
    method: 'POST',
    body: JSON.stringify({name, species, scientificName, adoptionDate, height,
    stage, waterMax, watered, sunshineNeeds, plantType, waterCurrent, waterFrequency,
  generalNotes, profile_id}),
    headers: {'Content-Type': 'application/json'},
  })
  document.location.replace('/dashboard');
}

//redirects to the edit plant page
const editPage = () => {
  document.location.replace('/dashboard/plantedit');
}

//will redirect the user to the contact page
const contactPage = () => {
  document.location.replace('/contact');
}


//redirects user to the graveyard
const graveyardPage = () => {
  document.location.replace('/dashboard/graves');
}

//rest of page adds event listeners to dom elements and runs relevent functions
//if statements are used to avoid console errors as this js file is used for different pages that dont have the same dom elements
if (document.querySelector('#contact-button')) {
  document.querySelector('#contact-button').addEventListener('click', contactPage);
}
document.querySelector('#logout-button').addEventListener('click', logout);
if (document.querySelector('#dashboard-button')) {
document.querySelector('#dashboard-button').addEventListener('click', home);
}
if (document.querySelector('#plants-container')) {
  document.querySelector('#plants-container').addEventListener('click', singlePlantPage)
}
if (document.querySelector('#plant-add')) {
document.querySelector('#plant-add').addEventListener('click', plantAdd);
};
if (document.querySelector('#plant-submit')) {
  document.querySelector('#plant-submit').addEventListener('click', submitPlant);
}
if (document.querySelector('#edit-button')) {
  document.querySelector('#edit-button').addEventListener('click', editPage)
}

if (document.querySelector('#contact-button')) {
  document.querySelector('#contact-button').addEventListener('click', contactPage)
}

if (document.querySelector('#graveyard-button')) {
  document.querySelector('#graveyard-button').addEventListener('click', graveyardPage)
}

