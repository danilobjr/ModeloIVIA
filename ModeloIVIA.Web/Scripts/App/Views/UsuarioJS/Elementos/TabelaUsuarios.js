/// <reference path="../../../Main/Namespace.js" />
/// <reference path="../../../Servidor/Servidor.js" />


ModeloIVIA.Elemento.TabelaUsuarios = function TabelaUsuarios(idTabela) {

    /// <summary>Renderiza a tabela de usuários com o plugin DataTables</summary>

    // Construtor SuperTipo

    ModeloIVIA.Componente.DataTables.call(this, idTabela);

};

ModeloIVIA.Elemento.TabelaUsuarios.prototype = new ModeloIVIA.Componente.DataTables();

ModeloIVIA.Elemento.TabelaUsuarios.prototype.atualizar = function () {

    var that = this;

    ModeloIVIA.Servidor.ajax({
        url: '/UsuarioJS/ObterTodosUsuarios',
        parametros: '',
        successCallback: function (resultado) {

            that.limparTabela();

            if (resultado.Sucesso) {
                listaUsuarios = [];

                $.each(resultado.Dados, function (i, usuario) {
                    listaUsuarios.push([
                        usuario.Nome,
                        usuario.Email,
                        usuario.Grupo.Nome,
                        usuario.Grupo.Perfil,
                        "<a class='alterar' href='/UsuarioJS/ObterUsuarioParaAlteracao?idUsuario=" + usuario.Id + "'>alterar</a> | " +
                        "<a class='excluir' href='/UsuarioJS/ExcluirUsuario?idUsuario=" + usuario.Id + "'>excluir</a>"
                    ]);
                });

                that.adicionarLinhas(listaUsuarios);
            }
        }
    });
};

ModeloIVIA.Elemento.TabelaUsuarios.prototype.excluirUsuario = function (event) {

    var that = this;
    var elemento = $(event.currentTarget);
    var url = elemento.attr('href');

    ModeloIVIA.Servidor.ajax({
        url: url,
        successCallback: function (resultado) {
            if (resultado.Sucesso) {
                ModeloIVIA.Componente.Dialog.alert(resultado.Mensagem.Titulo, resultado.Mensagem.Descricao);
                that.atualizar();
            }
        }
    });
};