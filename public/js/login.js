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
    let response;
    if(dataLogin == "login" ){
        response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                 user_name: username, 
                 password: password 
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
    else{
        response = await fetch('/api/users/signup', {
            method: 'POST',
            method: 'POST',
            body: JSON.stringify({
                 user_name: username, 
                 password: password 
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (response.ok) {
        document.location.replace('/');
    } else {
        if(dataLogin === "login" ){
            alert('Failed to login. Username or Passord is not correct.');
        }
        else{
            alert('Failed to signup.'); 
        }
    }
};
  
document
  .querySelector('.login-form').addEventListener('submit', loginSignUpHandler);
  
  