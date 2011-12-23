/// <reference path="../../Main/Namespace.js" />
/// <reference path="../ViewModel/UsuarioJSViewModel.js" />
/// <reference path="../Elementos/SliderCRUD.js" />
/// <reference path="../../../Servidor/Servidor.js" />
/// <reference path="../Elementos/Form.js" />
/// <reference path="../../../../jquery-1.5.1-vsdoc.js" />


ModeloIVIA.Script.UsuarioJS = function UsuarioJSScript() {

    // Propriedades

    var that = this;
    that.viewModel = new ModeloIVIA.ViewModel.UsuarioJS();
    that.form = that.viewModel.form;
    that.tabelaUsuarios = that.viewModel.tabelaUsuarios;
    that.slider = that.viewModel.sliderCRUD;
    that.validador = that.viewModel.validador;
    that.bigLoader = $('.loader');


    // Comportamentos ======================================== /

    // Slide

    that.mudarSlide = function (event) {
        var elemento = $(event.currentTarget);
        //elemento.siblings().removeClass('tab-ativa');
        //elemento.addClass('tab-ativa');
        var indiceSlide = elemento.attr('data-slide');
        that.slider.irParaSlide(indiceSlide);
        that.validador.removerTodos();
    };

    $("#crudSections a").click(that.mudarSlide);


    // CRUD

    that.obterUsuarioParaAlteracao = function (event) {
        event.preventDefault();
        var elemento = $(event.currentTarget);
        var url = elemento.attr('href');
        $('select[name=Cidade]').removeAttr('disabled');
        ModeloIVIA.Servidor.ajax({
            url: url,
            successCallback: function (resultado) {
                that.form.preencher(resultado.Dados);
            },
            loader: that.bigLoader
        });
        that.slider.irParaSlide(1);
    };

    //$(that.tabelaUsuarios.obterTodasAsLinhas()).find('.alterar').live('click', that.obterUsuarioParaAlteracao);
    $('.alterar').live('click', that.obterUsuarioParaAlteracao);

    that.limparCamposForm = function (event) {
        event.preventDefault();
        that.form.limpar();
    };

    $('#limparForm').click(that.limparCamposForm);

    that.obterCidadesPorEstado = function (event) {
        var elemento = $(event.currentTarget);
        var idEstado = elemento.children(':selected').val();
        var parametros = "idEstado=" + idEstado;

        ModeloIVIA.Servidor.ajax({
            url: "/UsuarioJS/ObterCidadesPorEstado",
            parametros: parametros,
            successCallback: function (resultado) {
                var dropDown = $('select[name=Cidade]').removeAttr('disabled');

                dropDown.children().remove();
                dropDown.append(new Option('Selecione'));

                $.each(resultado.Dados, function (cont, cidade) {
                    dropDown.append(new Option(cidade.Descricao, cidade.Id));
                });
            },
            loader: $('#cidadeLoader')
        });
    };

    $('select[name=Estado]').change(that.obterCidadesPorEstado);

    that.salvarUsuario = function (event) {
        event.preventDefault();
        // TODO - validação

        var callback = function () { that.tabelaUsuarios.atualizar(); };

        that.form.salvarUsuario(callback);
    };

    $('#salvar').click(that.salvarUsuario);

    that.excluirUsuario = function (event) {
        event.preventDefault();

        //var callback = function () { that.tabelaUsuarios.atualizar(); };

        var funcaoConfirmacao = function () {
            that.tabelaUsuarios.excluirUsuario(event);
        }

        ModeloIVIA.Componente.Dialog.confirm("Exclusão", "Deseja realmente excluir este usuário?", funcaoConfirmacao);
    };

    $('.excluir').live('click', that.excluirUsuario);
};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    var usuarioScript = new ModeloIVIA.Script.UsuarioJS();
});