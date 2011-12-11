ModeloIVIA.ViewModel.usuario = function () {

    // Propriedades e Campos

    var _tabelaUsuarios = ModeloIVIA.Elemento.tabelaUsuarios;

    // Init

    var _init = function () {
        _iniciarObjetos();
    };

    // Métodos

    var _iniciarObjetos = function () {
        _tabelaUsuarios.init();
    };

    return {
        init: _init,
        tabelaUsuarios: _tabelaUsuarios
    };

} ();