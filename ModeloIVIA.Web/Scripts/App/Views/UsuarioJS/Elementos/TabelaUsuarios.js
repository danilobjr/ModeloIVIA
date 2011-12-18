/// <reference path="../Main/Namespace.js" />

ModeloIVIA.Elemento.TabelaUsuarios = function TabelaUsuarios(idTabela) {

    // Construtor SuperTipo

    ModeloIVIA.Componente.DataTables.call(this, idTabela);

};

ModeloIVIA.Elemento.TabelaUsuarios.prototype = new ModeloIVIA.Componente.DataTables();