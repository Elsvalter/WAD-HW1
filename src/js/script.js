window.onload = function() {
    // fetching the json data from the URL, the data is stored on jsonbin.io
    fetch("https://api.jsonbin.io/v3/b/6728db78ad19ca34f8c3fc58")
    .then((response) => response.json())
    .then(data => {
        console.log(data);

        const postsContainer = document.getElementById("posts_container");

        // get the posts and sort them by ID in a descending order
        const posts = data.record.posts.sort((a, b) => b.id - a.id);

        // loop for each post in the json file
        for (let i = 0; i<posts.length; i++){
            let post = posts[i];
            let postDiv = document.createElement('div');
            let postHead = document.createElement('div');
            let postBody = document.createElement('div');
            let postFoot = document.createElement('div');
            let postText = document.createElement('p');

            postDiv.className = 'post';
            postHead.className = 'post_head';
            postBody.className = 'post_body';
            postFoot.className = 'post-footer';

            postHead.innerHTML = `
            <img src="res/images/user.png" width="25" height="25" alt="Profile picture">
            <span>${new Date(post.date).toDateString()}</span>
            `;
            postText.innerText = post.body;

            if (post.imgLink) {
                let postImg = document.createElement('img');
                postImg.src = post.imgLink;
                postImg.width = 100;
                postImg.height = 80;
                postImg.alt = "Post image";
                postImg.className = "post_picture";
                postBody.appendChild(postImg);
            }

            postFoot.innerHTML = `
            <img src="res/images/like.png" width="20" height="20" alt="like icon">
            `

            postBody.appendChild(postText);
            postDiv.append(postHead, postBody, postFoot);
            postsContainer.appendChild(postDiv);
        }
    })
    .catch(err => {
        let errDiv = document.createElement("div");
        errDiv.className = 'post';
        errDiv.innerText = err;
        document.body.appendChild(errDiv);
        })
}