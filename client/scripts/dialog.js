function registerDialogAndButton(dialog, button) {
    dialog = document.querySelector(dialog);
    button = document.querySelectorAll(button);

    button.forEach(function(button) {
        button.addEventListener('click', function() {
            dialog.showModal();
        });
    });

    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

    dialog.querySelector('.submit').addEventListener('click', function() {
        dialog.close();
    });
}
function registerDialog(dialog) {
    dialog = document.querySelector(dialog);

    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

    dialog.querySelector('.submit').addEventListener('click', function() {
        dialog.close();
    });
}


registerDialogAndButton('#create-lobby', '#create-lobby-btn');
registerDialog('#join-lobby');
