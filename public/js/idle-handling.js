//This function clears the previous timer and sets new timer whenever user does some action
function resetTimer() {
    console.log("reset")
    window.clearTimeout(timer);
    timer = window.setTimeout(endSession, 1 * 60 * 1000); 
}

//This function sends the logout request to server to end session
const endSession = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to logout.');
    }
}

//We should add event listeners to the document object for various events
document.addEventListener("mousemove", resetTimer);
document.addEventListener("keydown", resetTimer);
document.addEventListener("click", resetTimer);
document.addEventListener("scroll", resetTimer);

let timer;
timer = window.setTimeout(endSession, 1 * 60 * 1000); // 3 minutes