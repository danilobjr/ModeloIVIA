/// <reference path="../../../Main/Namespace.js" />
/// <reference path="../../../Componentes/Dialog.js" />


ModeloIVIA.Elemento.Form = function Form() {

    /// <summary>
    /// Define comportamentos para um formulário.
    /// </summary>

    this.form = $('#formUsuario');

    this.idUsuario = $('input[name=Id]');

    this.nome = $('input[name=Nome]');
    this.email = $('input[name=Email]');
    this.login = $('input[name=Login]');
    this.grupo = $('select[name=Grupo]');

    this.logradouro = $('input[name=Logradouro]');
    this.numero = $('input[name=Numero]');
    this.bairro = $('input[name=Bairro]');
    this.complemento = $('input[name=Complemento]');

    this.cidade = $('select[name=Cidade]');
    this.estado = $('select[name=Estado]');

    this.cidadeLoader = $('#cidadeLoader');
};

ModeloIVIA.Elemento.Form.prototype = {

    constructor: ModeloIVIA.Elemento.Form,

    preencher: function (dados) {

        /// <summary>Preenche os campos do form.</summary>
        /// <param name="dados" type="json">Objeto contendo os valores de cada campo.</param>
        /// <returns type="void" />

        this.limpar();

        this.idUsuario.val(dados.Usuario.Id);

        this.nome.val(dados.Usuario.Nome);
        this.email.val(dados.Usuario.Email);
        this.login.val(dados.Usuario.Login);
        this.grupo.children().removeAttr('selected');
        this.grupo.children('[value=' + dados.Usuario.Grupo.Id + ']').attr('selected', true);

        this.logradouro.val(dados.Usuario.Endereco.Logradouro);
        this.numero.val(dados.Usuario.Endereco.Numero);
        this.bairro.val(dados.Usuario.Endereco.Bairro);
        this.complemento.val(dados.Usuario.Endereco.Complemento);

        this.estado.children('[value=' + dados.Usuario.Endereco.Cidade.IdEstado + ']').attr('selected', true);

        this.preencherCidades(dados.Cidades);
        this.cidade.children('[value=' + dados.Usuario.Endereco.Cidade.Id + ']').attr('selected', true);
    },
    limpar: function () {

        /// <summary>Limpa os campos do form.</summary>
        /// <returns type="void" />

        this.form
            .find('input[type=text], input[type=hidden]').val('').end()
            .find('select').children().removeAttr('selected').end()
            .filter('[name=Cidade]')
                .children().remove().end()
                .append(new Option('Selecione um estado')); ;
    },
    preencherCidades: function (cidades) {

        /// <summary>Preenche o SELECT de cidades.</summary>
        /// <returns type="void" />

        var dropDownCidade = this.cidade.append(new Option('Selecione'));

        $.each(cidades, function (i, cidade) {
            dropDownCidade.append(new Option(cidade.Descricao, cidade.Id));
        });
    },
    salvar: function (url, callback) {
        var parametros = this.form.serialize();

        var that = this;

        ModeloIVIA.Servidor.ajax({
            url: url,
            parametros: parametros,
            successCallback: function (resultado) {
                if (resultado.Sucesso) {
                    if (typeof (callback) === 'function') {
                        callback();
                    }

                    that.limpar();
                }

                ModeloIVIA.Componente.Dialog.alert('Usuário', resultado.Mensagem.Descricao);
            },
            loader: $('.loader')
        });
    },
    salvarUsuario: function (callback) {

        var url = '';

        if (this.idUsuario.val()) {
            url = '/UsuarioJS/SalvarAlteracaoUsuario';
        }
        else {
            url = '/UsuarioJS/SalvarNovoUsuario';
        }

        this.salvar(url, callback);
    }
};