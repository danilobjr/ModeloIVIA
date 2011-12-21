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
        ModeloIVIA.Servidor.ajax({
            url: url,
            successCallback: function (resultado) {
                that.form.preencher(resultado.Dados);
            }
        });
        that.slider.irParaSlide(1);
    };

    $(that.tabelaUsuarios.obterTodasAsLinhas()).find('.alterar').click(that.obterUsuarioParaAlteracao);

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
                var dropDown = $('select[name=Cidade]');

                dropDown.children().remove();
                dropDown.append(new Option('Selecione'));

                $.each(resultado.Dados, function (cont, cidade) {
                    dropDown.append(new Option(cidade.Descricao, cidade.Id));
                });
            }
        });
    };

    $('select[name=Estado]').change(that.obterCidadesPorEstado);

    that.salvarUsuario = function (event) {
        event.preventDefault();
        // TODO - validação

        var atualizarTabelaUsuarios = function (usuarios) {

            listaUsuarios = [];

            $.each(usuarios, function (i, usuario) {
                listaUsuarios.push([
                    usuario.Nome,
                    usuario.Email,
                    usuario.Grupo.Nome,
                    usuario.Grupo.Perfil,
                    "<a class='alterar' href='/UsuarioJS/ObterUsuarioParaAlteracao?idUsuario='"+ usuario.Id +">alterar</a>"
                ]);
            });

            that.tabelaUsuarios.adicionarLinhas(listaUsuarios);
        };
        that.form.salvarUsuario(atualizarTabelaUsuarios);
    };

    $('#salvar').click(that.salvarUsuario);
};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    var usuarioScript = new ModeloIVIA.Script.UsuarioJS();
});