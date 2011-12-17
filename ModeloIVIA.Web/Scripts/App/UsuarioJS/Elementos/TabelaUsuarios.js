/// <reference path="../Main/MainScript.js" />

ModeloIVIA.Elemento.TabelaUsuarios = function TabelaUsuarios(idTabela) {

    // Construtor

    ModeloIVIA.Componente.DataTables.call(this, idTabela);

};

ModeloIVIA.Elemento.TabelaUsuarios.prototype = new ModeloIVIA.Componente.DataTables();