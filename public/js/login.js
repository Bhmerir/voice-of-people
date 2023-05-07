const loginBtn = document.querySelector('#login-btn');
const loginSignUpHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const dataLogin = loginBtn.getAttribute('data-login');
    if(!username){
        alert('Please Enter the username.');
        return;
    }
    if(!password){
        alert('Please Enter the password.');
        return;
    }
    if(dataLogin === "login" ){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
    else{
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
  
    if (response.ok) {
        document.location.replace('/');
    } else {
        if(dataLogin === "login" ){
            alert('Failed to log in.');
        }
        else{
            alert('Failed to sign up.'); 
        }
    }
};
  
document
  .querySelector('.login-form').addEventListener('submit', loginSignUpHandler);
  
  