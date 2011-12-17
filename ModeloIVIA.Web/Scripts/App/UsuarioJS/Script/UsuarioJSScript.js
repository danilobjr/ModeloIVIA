/// <reference path="../../Main/MainScript.js" />

ModeloIVIA.Script.UsuarioJS = function UsuarioJSScript() {

    // Propriedades

    var _viewModel = new ModeloIVIA.ViewModel.UsuarioJS();

};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    new ModeloIVIA.Script.UsuarioJS();
});