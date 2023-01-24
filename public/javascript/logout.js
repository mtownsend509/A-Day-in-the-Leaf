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
    document.location.replace('/dashboard');
};

const singlePlantPage = async (event) => {
  console.log('card container works')
  if (event.target.class = "relative px-4 -mt-16") {
      if(parseInt(event.target.id)) {
      document.location.replace('dashboard/plant/' + event.target.id);
      } else if (event.target.id == 'delete-button') {
        var species = event.target.parentNode.parentNode.parentNode.children[0].children[0].innerHTML.trim();
        var name = event.target.parentNode.parentNode.parentNode.parentNode.children[1].innerHTML.trim();
        console.log({name, species, profile_id})
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
            location.reload();
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
    alert("Please fill out the height field");
    return false;
  }
  var waterMax = document.querySelector('#water').value;
  if (!waterMax) {
    alert("Please fill out the water frequency field");
    return false;
  }
  var sunshineNeeds = document.querySelector('#sunshine-needs').value;
  if (!sunshineNeeds) {
    alert("Please fill out the sun requirement field");
    return false;
  }
  //this next stuff is complicated but needs to be this way since we
  //are letting the user select from options
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
  // var stage = 'mature'
  var watered = true;
  var generalNotes = document.querySelector('#general-notes').value;
  if (!generalNotes) {
    alert("Please add some notes about your plant. If you don't have any please enter 'none'. You may go back and edit these later");
    return false;
  }

  // var plantType = 'flower';
  var waterCurrent = 0;
  var waterFrequency = document.querySelector('#water').value;
  if (!waterFrequency) {
    alert("Please fill out the water frequency field");
    return false;
  }
 
  const newPlant = await fetch('/api/plant', {
    method: 'POST',
    body: JSON.stringify({name, species, scientificName, adoptionDate, height,
    stage, waterMax, watered, sunshineNeeds, plantType, waterCurrent, waterFrequency,
  generalNotes, profile_id}),
    headers: {'Content-Type': 'application/json'},
  })
  document.location.replace('/dashboard');
  console.log('got here?');
}

const editPage = () => {
  document.location.replace('/dashboard/plantedit');
}

const contactPage = () => {
  document.location.replace('/contact');
}

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
// if (document.querySelector('#water-button')) {
//   document.querySelector('#water-button').addEventListener('click', plantWater)
// }
if (document.querySelector('#edit-button')) {
  document.querySelector('#edit-button').addEventListener('click', editPage)
}

if (document.querySelector('#contact-button')) {
  document.querySelector('#contact-button').addEventListener('click', contactPage)
}

