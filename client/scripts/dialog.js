var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');

// TODO: refactor out
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

showDialogButton.addEventListener('click', function() {
    dialog.showModal();
});

dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});

