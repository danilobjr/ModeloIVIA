/// <reference path="../Main/MainScript.js" />

ModeloIVIA.Script.Usuario = function UsuarioScript () {

    // Propriedades

    var _viewModel = new ModeloIVIA.ViewModel.Usuario();

};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    new ModeloIVIA.Script.Usuario();
});