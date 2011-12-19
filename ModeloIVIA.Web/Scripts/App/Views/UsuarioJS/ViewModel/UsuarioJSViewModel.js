/// <reference path="../../Main/Namespace.js" />

ModeloIVIA.ViewModel.UsuarioJS = function UsuarioJSViewModel() {

    // Propriedades

    this.form = new ModeloIVIA.Elemento.Form();
    this.tabelaUsuarios = new ModeloIVIA.Elemento.TabelaUsuarios("tabelaUsuarios");
    this.tabelaGrupos = new ModeloIVIA.Elemento.TabelaGrupos("tabelaGrupos");
    this.sliderCRUD = new ModeloIVIA.Elemento.SliderCRUD("crud", { childrenPadding: 10 });
    this.validador = new ModeloIVIA.Elemento.ValidadorUsuario("input[type=text]");
};