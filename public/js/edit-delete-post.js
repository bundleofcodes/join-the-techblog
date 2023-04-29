//edit post
async function editPostHandler(event) {
    event.preventDefault();
    //get post title and text
    const title = document.querySelector("#post-title").innerHTML;
    const body = document.querySelector("#post-body").innerHTML;
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    console.log(title, body);
    document.location.replace("/edit/" + post_id);
}

//deleting the post
async function deletePostHandler(event) {
    event.preventDefault();
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const response = await fetch("/api/posts/" + post_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    //confirm repsonse is good
    if(response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

//edit post
document.querySelector("#edit-btn").addEventListener("click", editPostHandler);
//delete post
document
    .querySelector("#delete-btn")
    .addEventListener("click", deletePostHandler);