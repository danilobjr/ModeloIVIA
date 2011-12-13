//ModeloIVIA.Componente.dataTables = function () {
ModeloIVIA.Componente.DataTables = function DataTables (userConfig) {

    // Propriedades e Campos

    var _tabela = null;


    // Init

    var _init = function (elementId) {

        /// <summary> 
        /// Inicialização.
        /// </summary>

        _tabela = $(elementId).dataTable({
            // Estilo

            "bJQueryUI": true,
            "sPaginationType": "full_numbers",

            // Internacionalização

            "oLanguage": {
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "Nada encontrado",
                "sEmptyTable": "Empty Table",
                "sInfo": "Registro de _START_ a _END_. Total: _TOTAL_",
                "sInfoEmpty": "Nenhum registro",
                "sInfoFiltered": "(_MAX_ registros filtrados)",
                "sSearch": "Busca",

                "oPaginate": {
                    "sFirst": "Primeira",
                    "sLast": "Última",
                    "sNext": "Próxima",
                    "sPrevious": "Anterior"
                }
            }
        });
    };


    // Métodos

    var _adicionarLinha = function (linha) {

        /// <summary>
        /// Adiciona uma linha à tabela.
        /// </summary>

        if (!(linha instanceof Array)) {
            throw new TypeError("_adicionarLinha(): O parâmetro 'linha' não é do tipo Array");
        }

        _tabela.fnAddData(linha);
    };

    var _adicionarLinhas = function (linhas) {

        if (!(linhas instanceof Array)) {
            throw new TypeError("_adicionarLinhas(): O parâmetro 'linhas' não é do tipo Array");
        }

        if (!linhas[0][0]) {
            throw new RangeError("_adicionarLinhas(): O parâmetro 'linhas' deve ser um Array de duas dimensões");
        }

        _tabela.fnAddData(linhas);
    };

    var _removerLinha = function (linha, callback) {

        if (linha instanceof jQuery)
            linha = linha[0];

        if (!(linha instanceof HTMLTableRowElement) || typeof (linha) !== "number") {
            throw new TypeError("_removerLinha(): O parâmetro 'linha' deve ser um número ou um objeto do tipo HTMLTableRowElement");
        }

        if (callback && typeof (callback) !== "function") {
            throw new TypeError("_removerLinha(): O parâmetro 'callback' não é uma função");
        }

        _tabela.fnDeleteRow(linha, callback);
    };

    var _obterIndiceDaLinha = function (linha) {

        if (linha instanceof jQuery)
            linha = linha[0];

        if (!(linha instanceof HTMLTableRowElement)) {
            throw new TypeError("_obterIndiceDaLinha(): O parâmetro 'linha' não é um elemento do tipo TR");
        }

        return _tabela.fnGetPosition(linha);
    };

    var _obterLinhaPorIndice = function (indice) {
        return _tabela.fnGetNodes(indice);
    };

    var _obterTodasAsLinhas = function () {
        return _tabela.fnGetNodes();
    };

    var _limparTabela = function () {
        _tabela.fnClearTable();
    };


    return {
        init: _init,
        adicionarLinha: _adicionarLinha,
        adicionarLinhas: _adicionarLinhas,
        removerLinha: _removerLinha,
        obterIndiceDaLinha: _obterIndiceDaLinha,
        obterLinhaPorIndice: _obterLinhaPorIndice,
        obterTodasAsLinhas: _obterTodasAsLinhas,
        limparTabela: _limparTabela
    };

} ();
