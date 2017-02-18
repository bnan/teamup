function logged_out() {
    var btn = document.getElementById('button_login');
    btn.style.display = 'block';

    var map = document.getElementById('map');
    map.style.display = 'none';

    var fab = document.getElementById('show-dialog');
    fab.style.display = 'none';

    var obfuscator = document.querySelector('.mdl-layout__obfuscator');
    obfuscator.classList.remove('is-visible');

    var drawer = document.querySelector('.mdl-layout__drawer');
    drawer.classList.remove('is-visible');
}

