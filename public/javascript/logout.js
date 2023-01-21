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

// const plantAdd = () => {
//     document.querySelector('#modal').style.display = "block";
//     // for(i=0; i < document.querySelector('#modal').clientHeight; i++) {
//     // document.querySelector('#modal').children[i].style.display = "block"
//     // }
// }

document.querySelector('#logout-button').addEventListener('click', logout);
document.querySelector('#home-button').addEventListener('click', home);
// document.querySelector('#plant-add').addEventListener('click', plantAdd);