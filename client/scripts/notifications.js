function notify_user(title, body, ico){
    Push.create(title, {
        body: body,
        link: "link",
        timeout: 99999000,
        icon: ico
    });
}

