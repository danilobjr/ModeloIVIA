ModeloIVIA.Componente.dataTables = function () {

    // Propriedades e Campos

    var _tabela = null;


    // Init

    var _init = function (elementId) {
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

        if (!(linha instanceof Array)) {
            throw new TypeError("_adicionarLinha(): O parâmetro 'linha' não é do tipo Array");
        }

        _tabela.fnAddData(linha);
    };

    var _removerLinha = function (linha, callback) {

        if (!($(linha).is('tr')) || typeof (linha) !== "number") {
            throw new TypeError("_removerLinha(): O parâmetro 'linha' deve ser um número ou um elemento do tipo <TR>");
        }

        if (callback && typeof (callback) !== "function") {
            throw new TypeError("_removerLinha(): O parâmetro 'callback' não é uma função");
        }

        //if (callback)
            _tabela.fnDeleteRow(linha, callback);
        //else
           // _tabela.fnDeleteRow(linha);
    };


    return {
        init: _init
    };

} ();