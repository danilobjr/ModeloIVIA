/// <reference path="../Main/MainScript.js" />


ModeloIVIA.Elemento.TabelaUsuarios = function TabelaUsuarios(idTabela) {

    // Construtor SuperTipo

    ModeloIVIA.Componente.DataTables.call(this, idTabela);

    // Os comportamentos deveriam estar aqui ou em UsuarioScript?
    // $('.excluir').click()
};

ModeloIVIA.Elemento.TabelaUsuarios.prototype = new ModeloIVIA.Componente.DataTables();

//ModeloIVIA.Elemento.TabelaUsuarios.prototype.excluir = function (indice) {
//    
//};