function notify_user(title, body){
    event.preventDefault();
    Push.create(title, {
        body: body,
        link: "link",
        timeout: 5000
    });
}

