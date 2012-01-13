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
    that.dialog = that.viewModel.dialog;
    that.bigLoader = $('.loader');


    // Métodos

    that.mudarSlide = function (event) {
        var elemento = $(event.currentTarget);
        //elemento.siblings().removeClass('tab-ativa');
        //elemento.addClass('tab-ativa');
        var indiceSlide = elemento.attr('data-slide');
        that.slider.irParaSlide(indiceSlide);
        that.validador.removerTodos();
    };

    that.obterUsuarioParaAlteracao = function (event) {
        event.preventDefault();
        var elemento = $(event.currentTarget);
        var url = elemento.attr('href');
        //$('select[name=Cidade]').removeAttr('disabled');
        ModeloIVIA.Servidor.ajax({
            url: url,
            successCallback: function (resultado) {
                that.form.preencher(resultado.Dados);
            },
            loader: that.bigLoader
        });
        that.slider.irParaSlide(1);
    };

    that.limparCamposForm = function (event) {
        event.preventDefault();
        that.form.limpar();
        that.validador.removerDestaquesDoCampos();
        that.validador.removerTodos();
    };

    that.obterCidadesPorEstado = function (event) {
        var elemento = $(event.currentTarget);
        var idEstado = elemento.children(':selected').val();
        var parametros = "idEstado=" + idEstado;

        ModeloIVIA.Servidor.ajax({
            url: "/UsuarioJS/ObterCidadesPorEstado",
            parametros: parametros,
            successCallback: function (resultado) {
                var dropDown = $('select[name=Cidade]');

                dropDown.children().remove();
                dropDown.append(new Option('Selecione'));

                $.each(resultado.Dados, function (cont, cidade) {
                    dropDown.append(new Option(cidade.Descricao, cidade.Id));
                });
            },
            loader: $('#cidadeLoader')
        });
    };

    that.salvarUsuario = function (event) {
        event.preventDefault();

        var destacarCampos = true;
        var mostrarToolTipsOnFocus = true;

        var formEhValido = that.validador.estahValido(destacarCampos, mostrarToolTipsOnFocus);

        if (formEhValido) {
            var callback = function () { that.tabelaUsuarios.atualizar(); };

            that.form.salvarUsuario(callback);
        }
        else {
            that.dialog.alert("Validação", "Para salvar, é necessário preencher os campos corretamente.");
        }
    };

    that.excluirUsuario = function (event) {
        event.preventDefault();

        var funcaoExecutadaNaConfirmacao = function () {
            that.tabelaUsuarios.excluirUsuario(event);
        };

        that.dialog.confirm("Exclusão", "Deseja realmente excluir este usuário?", funcaoExecutadaNaConfirmacao);
    };
};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    var usuarioScript = new ModeloIVIA.Script.UsuarioJS();

    $("#crudSections a").click(usuarioScript.mudarSlide);
    $('.alterar').live('click', usuarioScript.obterUsuarioParaAlteracao);
    $('.excluir').live('click', usuarioScript.excluirUsuario);
    $('select[name=Estado]').change(usuarioScript.obterCidadesPorEstado);
    $('#salvar').click(usuarioScript.salvarUsuario);
    $('#cancelar').click(usuarioScript.limparCamposForm);
});