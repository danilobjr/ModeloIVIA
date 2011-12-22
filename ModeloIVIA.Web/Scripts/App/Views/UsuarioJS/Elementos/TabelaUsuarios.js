/// <reference path="../../../Main/Namespace.js" />
/// <reference path="../../../Servidor/Servidor.js" />


ModeloIVIA.Elemento.TabelaUsuarios = function TabelaUsuarios(idTabela) {

    /// <summary>Renderiza a tabela de usuários com o plugin DataTables</summary>

    // Construtor SuperTipo

    ModeloIVIA.Componente.DataTables.call(this, idTabela);

};

ModeloIVIA.Elemento.TabelaUsuarios.prototype = new ModeloIVIA.Componente.DataTables();

ModeloIVIA.Elemento.TabelaUsuarios.prototype.atualizar = function () {

    var limparTabela = this.limparTabela;
    var adicionarLinhas = this.adicionarLinha;

    ModeloIVIA.Servidor.ajax({
        url: '/UsuarioJS/ObterTodosUsuarios',
        parametros: '',
        successCallback: function (resultado) {

            limparTabela();

            if (resultado.Sucesso) {
                listaUsuarios = [];

                $.each(resultado.Dados, function (i, usuario) {
                    listaUsuarios.push([
                        usuario.Nome,
                        usuario.Email,
                        usuario.Grupo.Nome,
                        usuario.Grupo.Perfil,
                        "<a class='alterar' href='/UsuarioJS/ObterUsuarioParaAlteracao?idUsuario='" + usuario.Id + ">alterar</a>"
                    ]);
                });

                adicionarLinhas(listaUsuarios);
            }
        }
    });
};