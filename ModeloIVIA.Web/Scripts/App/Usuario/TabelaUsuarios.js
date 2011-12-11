ModeloIVIA.Elemento.tabelaUsuarios = function () {

    // Propriedades e Campos

    var _tabela = ModeloIVIA.Componente.dataTables;

    // Init

    var _init = function () {
        _tabela.init("#usuarios");
    };

    return {
        init: _init
    };

} ();