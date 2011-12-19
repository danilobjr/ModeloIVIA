/// <reference path="Namespace.js" />

ModeloIVIA.Script.Main = function Main() {

    var that = this;
    that.mainViewModel = new ModeloIVIA.ViewModel.Main();

};

// Carregamento do script de usuário no onload do DOM.

$(function () {
    var mainScript = new ModeloIVIA.Script.Main();
});
