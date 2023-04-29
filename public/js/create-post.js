async function createPostHandler(event) {
    event.preventDefault();
    //collect needed info
    const title = document.querySelector("#post-title").value.trim();
    const body = document.querySelector("#post-body").value.trim();
    if (body) {
        //confirm comment text
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title,
                body,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        //check for good response
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector("#create-post-btn")
    .addEventListener("click", createPostHandler);