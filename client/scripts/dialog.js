var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');

showDialogButton.addEventListener('click', function() {
    dialog.showModal();
});

dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});

