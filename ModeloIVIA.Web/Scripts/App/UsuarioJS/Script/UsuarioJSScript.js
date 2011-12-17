/// <reference path="../../Main/MainScript.js" />
/// <reference path="../ViewModel/UsuarioJSViewModel.js" />
/// <reference path="../Elementos/SliderCRUD.js" />


ModeloIVIA.Script.UsuarioJS = function UsuarioJSScript() {

    // Propriedades

    var _viewModel = new ModeloIVIA.ViewModel.UsuarioJS();
    var _slider = _viewModel.sliderCRUD;
    var _validador = _viewModel.validador;


    // Comportamentos ======================================== /

    // Slide

    $("#crudSections a").click(function (e) {
        var indiceSlide = $(this).attr('data-slide');
        _slider.irParaSlide(indiceSlide);
        _validador.removerTodos();
    });
};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    new ModeloIVIA.Script.UsuarioJS();
});