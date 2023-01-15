const logout = async () => {
    const response = await fetch('/api/profile/logout', {
        method: 'POST',
        headers: {"Content-Type": 'application/json'}
    });

    if (response.ok) {
        //navigation to refresh page in logout state
    } else {
        window.alert('logout failed');
    }
};

document.querySelector(/*html element that is logout*/).addEventListener('click', logout);