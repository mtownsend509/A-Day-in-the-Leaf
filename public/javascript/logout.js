console.log('this is connected')
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
      document.location.replace('dashboard/plant/' + event.target.id);
  } else {
      console.log('shooooot')
  }

}

const plantAdd = () => {
  document.location.replace('dashboard/matt')
}

document.querySelector('#logout-button').addEventListener('click', logout);
document.querySelector('#home-button').addEventListener('click', home);
if (document.querySelector('#plants-container')) {
  document.querySelector('#plants-container').addEventListener('click', singlePlantPage)
}
if (document.querySelector('#plant-add')) {
document.querySelector('#plant-add').addEventListener('click', plantAdd);
};