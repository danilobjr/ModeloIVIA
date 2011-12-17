/// <reference path="../../Main/MainScript.js" />

ModeloIVIA.Elemento.TabelaGrupos = function TabelaGrupos(idTabela) {

    // Construtor

    ModeloIVIA.Componente.DataTables.call(this, idTabela);

};

ModeloIVIA.Elemento.TabelaGrupos.prototype = new ModeloIVIA.Componente.DataTables();