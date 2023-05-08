const addPostHandler = async (event) => {
    event.preventDefault();
  
    const addPostTitle = document.querySelector('#add-post-title').value.trim();
    const addPostContent = document.querySelector('#add-post-content').value.trim();
 //   const addPostBtn = document.querySelector('#add-post-btn');
    if(!addPostTitle){
        alert('Please Enter the title.');
        return;
    }
    if(!addPostContent){
        alert('Please Enter the content.');
        return;
    }

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
                title: addPostTitle, 
                content: addPostContent 
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to add new post.'); 
    }
};
  
document
  .querySelector('.add-post-form').addEventListener('submit', addPostHandler);
  
  