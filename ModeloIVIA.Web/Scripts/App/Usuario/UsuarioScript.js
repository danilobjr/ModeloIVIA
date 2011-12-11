ModeloIVIA.Script.usuario = function () {

    // Propriedades e Campos

    var _usuarioViewModel = ModeloIVIA.ViewModel.usuario;

    // Init

    var _init = function () {
        _iniciarViewModel();
    };

    // Métodos

    var _iniciarViewModel = function () {
        _usuarioViewModel.init();
    };

    return {
        init: _init
    };

} ();


// Carregamento do script de usuário no onload do DOM.

$(function () {
    ModeloIVIA.Script.usuario.init();
});