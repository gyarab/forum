//FETCH ACTIONS
//Fetch a page of posts from a specific forum
export const fetchPosts = (forumId, forumPage) => dispatch => {
    fetch('http://localhost:7373/post/forum/' + forumId + '/posts?page=' + forumPage + '&size=1', {
        headers: {
            'Authorization': localStorage.getItem('auth')
        },
    })
        .then(response => response.json())
        .then(forums =>
            dispatch({
                type: 'FETCH_POSTS',
                payload: forums
            })
        ).catch(e => {
        dispatch({
            type: 'FETCH_POSTS',
            payload: ""
        })
    });
};
//Fetch a specific post by its unique id
export const fetchPostById = (id) => dispatch => {
    fetch("http://localhost:7373/post/id/" + id).then(response => response.json()).then(e =>
        dispatch({
            type: 'FETCHED_POST_BY_ID',
            payload: e
        }));
};

//INTERNAL ACTIONS
//Sends data to the BigPost component upon clicking on a LilPost, which is used for rendering the said component.
export const getPostById = (id) => dispatch => {
    dispatch({
        type: 'POST_BY_ID',
        payload: id
    })
};
//Used by Navigation component to revert store state and prevent posts from one forum leaking to another forum's page.
export const resetPosts = () => dispatch => {
    dispatch({
        type: 'RESET'
    })
};

//POST ACTIONS
//Creates a post (Auth required).
export const createPost = (post) => dispatch => {
    fetch('http://localhost:7373/post/create', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        },
        body: JSON.stringify(post)
    }).then(res => console.log(res))
};

//PUT ACTIONS
//Like/Dislike a post.
export const updatePost = (liked, commentId) => dispatch => {
    fetch('http://localhost:7373/post/update/' + liked + '/' + commentId, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('auth')
        },
    }).then(res=>res.json()).then(res => dispatch({
        type: 'POST_UPDATE',
        payload: res
    }))
};