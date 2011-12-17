/// <reference path="../../Main/MainScript.js" />

ModeloIVIA.ViewModel.UsuarioJS = function UsuarioJSViewModel() {

    // Propriedades

    this.tabelaUsuarios = new ModeloIVIA.Elemento.TabelaUsuarios("tabelaUsuarios");
    this.tabelaGrupos = new ModeloIVIA.Elemento.TabelaGrupos("tabelaGrupos");
    this.sliderCRUD = new ModeloIVIA.Elemento.SliderCRUD("crud");
    this.validador = new ModeloIVIA.Elemento.ValidadorUsuario("input[type=text]");

};