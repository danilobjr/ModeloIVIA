/// <reference path="../Main/MainScript.js" />


ModeloIVIA.Script.Usuario = function UsuarioScript () {

    // Propriedades e Campos

    var _usuarioViewModel = new ModeloIVIA.ViewModel.Usuario();

};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    new ModeloIVIA.Script.Usuario();
});