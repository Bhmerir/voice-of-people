const addCommentHandler = async (event) => {
    event.preventDefault();
    
    const addCommentEl = document.querySelector('#add-comment');
    const addComment = addCommentEl.value.trim();
    const postId = addCommentEl.getAttribute("data-id")

    if(!addComment){
        alert('Please Enter the comment.');
        return;
    }

    const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify({
                comment: addComment 
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/comments/${postId}`);
    } else {
        alert('Failed to add new post.'); 
    }
};
  
document
  .querySelector('.add-comment-form').addEventListener('submit', addCommentHandler);
  
  