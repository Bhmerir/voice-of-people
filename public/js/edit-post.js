const editPostTitleEl = document.querySelector('#edit-post-title')
const postId = editPostTitleEl.getAttribute('data-id');
const editPostHandler = async (event) => {
    event.preventDefault();

    const editPostTitle = editPostTitleEl.value.trim();
    const editPostContent = document.querySelector('#edit-post-content').value.trim();

    if(!editPostTitle){
        alert('Please Enter the title.');
        return;
    }
    if(!editPostContent){
        alert('Please Enter the content.');
        return;
    }
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
                title: editPostTitle, 
                content: editPostContent 
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to edit post.'); 
    }
};
const deletePostHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post.'); 
    }
};
  
document.querySelector('#edit-post-btn').addEventListener('click', editPostHandler);  
document.querySelector('#delete-post-btn').addEventListener('click', deletePostHandler);


  
  