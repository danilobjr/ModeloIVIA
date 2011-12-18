/// <reference path="../../Main/MainScript.js" />
/// <reference path="../ViewModel/UsuarioJSViewModel.js" />
/// <reference path="../Elementos/SliderCRUD.js" />
/// <reference path="../../../Servidor/Servidor.js" />


ModeloIVIA.Script.UsuarioJS = function UsuarioJSScript() {

    // Propriedades

    var that = this;
    var _servidor = new ModeloIVIA.Servidor();
    var _viewModel = new ModeloIVIA.ViewModel.UsuarioJS();
    var _slider = _viewModel.sliderCRUD;
    var _validador = _viewModel.validador;


    // Comportamentos ======================================== /

    // Slide

    that.mudarSlide = function (event) {
        var elemento = $(event.currentTarget);
        var indiceSlide = elemento.attr('data-slide');
        _slider.irParaSlide(indiceSlide);
        _validador.removerTodos();
    };

    $("#crudSections a").click(that.mudarSlide);


    // CRUD

    that.obterUsuarioParaAlteracao = function (event) {
        var elemento = $(event.currentTarget);
        // TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
        // Show Loader
        _slider.irParaSlide(1);
    };

    $('.alteracao').click(that.obterUsuarioParaAlteracao);
};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    new ModeloIVIA.Script.UsuarioJS();
});