var username = document.cookie.slice(9); 
console.log('/api/profile/' + username);

var profile_id = ''

const getProfID = async () => {
    const response = await fetch('/api/profile/' + username);
    response.json().then((data) => {
      profile_id = data.id;
    });
    return response
    };

getProfID();

console.log

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

const home = () => {
    document.location.replace('/');
};

const singlePlantPage = async (event) => {
  console.log('card container works')
  if (event.target.class = "relative px-4 -mt-16") {
      console.log('clicked a plant');
      console.log(event.target.id);
      console.log(parseInt(event.target.id));
      if(parseInt(event.target.id)) {
      document.location.replace('dashboard/plant/' + event.target.id);
      } else if (event.target.id == 'delete-button') {
        const confirm = window.confirm('Are you sure you want to delete this plant?');
        if (confirm == true) {
        const response = await fetch(('/api/plant/' + event.target.parentNode.parentNode.parentElement.id), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          console.log('didnt work?');
        }};
      } else if (event.target.id == 'water-button') {
          const response = await fetch (('/api/plant/' + event.target.parentNode.parentNode.parentElement.id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ waterCurrent: 0, watered: true})
          })
          if (response.ok) {
            window.alert('your plant has been watered!');
          }
      } else {
        console.log('doesnt work');
      }
  } else {
      console.log('shooooot');
  }

}

const plantAdd = () => {
  document.location.replace('dashboard/addPlant')
}

const submitPlant = async (event) => {
  event.preventDefault()

  var name = document.querySelector('#name').value;
  var species = document.querySelector('#species').value;
  var scientificName = document.querySelector('#scientific-name').value;
  var adoptionDate = document.querySelector('#adoption-date').value;
  var height = parseInt(document.querySelector('#height').value);
  //this next stuff is complicated but needs to be this way since we
  //are letting the user select from options
  var stage = document.querySelector('#stage').value;
  // var stage = 'mature'
  var waterNeeds = document.querySelector('#water').value;
  var watered = true;
  var generalNotes = document.querySelector('#general-notes').value;
  var sunshineNeeds = document.querySelector('#sunshine-needs').value;
  var plantType = document.querySelector('#plant-type').value;
  // var plantType = 'flower';
  var waterCurrent = 0;
  var waterFrequency = document.querySelector('#water').value;
 
  const newPlant = await fetch('/api/plant', {
    method: 'POST',
    body: JSON.stringify({name, species, scientificName, adoptionDate, height,
    stage, waterNeeds, watered, sunshineNeeds, plantType, waterCurrent, waterFrequency,
  generalNotes, profile_id}),
    headers: {'Content-Type': 'application/json'},
  })
  document.location.replace('/dashboard');
  console.log('got here?');
}

const plantWater = () => {

}

document.querySelector('#logout-button').addEventListener('click', logout);
document.querySelector('#home-button').addEventListener('click', home);
if (document.querySelector('#plants-container')) {
  document.querySelector('#plants-container').addEventListener('click', singlePlantPage)
}
if (document.querySelector('#plant-add')) {
document.querySelector('#plant-add').addEventListener('click', plantAdd);
};
if (document.querySelector('#plant-submit')) {
  document.querySelector('#plant-submit').addEventListener('click', submitPlant);
}
if (document.querySelector('#water-button')) {
  document.querySelector('#water-button').addEventListener('click', plantWater)
}
