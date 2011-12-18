/// <reference path="../../Main/MainScript.js" />

ModeloIVIA.Elemento.ValidadorUsuario = function ValidadorUsuario(seletor) {

    // Construtor SuperTipo

    ModeloIVIA.Componente.Validador.call(this, seletor);

};

ModeloIVIA.Elemento.ValidadorUsuario.prototype = new ModeloIVIA.Componente.Validador();