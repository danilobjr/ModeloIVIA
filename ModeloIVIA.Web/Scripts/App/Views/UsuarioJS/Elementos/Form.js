/// <reference path="../../../Main/Namespace.js" />

ModeloIVIA.Elemento.Form = function Form() {

    /// <summary>
    /// Define comportamentos para um formulário.
    /// </summary>

    this.form = $('#formUsuario');

    this.idUsuario = $('input[name=Id]');

    this.nome = $('input[name=Nome]');
    this.email = $('input[name=Email]');
    this.login = $('input[name=Login]');

    this.logradouro = $('input[name=Logradouro]');
    this.numero = $('input[name=Numero]');
    this.bairro = $('input[name=Bairro]');
    this.complemento = $('input[name=Complemento]');

    this.cidade = $('select[name=Cidade]');
    this.estado = $('select[name=Estado]');
};

ModeloIVIA.Elemento.Form.prototype = {

    constructor: ModeloIVIA.Elemento.Form,

    preencher: function (dados) {

        /// <summary>Preenche os campos do form.</summary>
        /// <param name="dados" type="json">Objeto contendo os valores de cada campo.</param>
        /// <returns type="void" />

        this.idUsuario.val(dados.Id);

        this.nome.val(dados.Nome);
        this.email.val(dados.Email);
        this.login.val(dados.Login);

        this.logradouro.val(dados.Logradouro);
        this.numero.val(dados.Numero);
        this.bairro.val(dados.Bairro);
        this.complemento.val(dados.Complemento);

        this.cidade.val(dados.Cidade);
        this.estado.val(dados.Estado);
    },
    limpar: function () {

        /// <summary>Limpa os campos do form.</summary>
        /// <returns type="void" />

        this.form
            .find('input[type=text], input[type=hidden]').val('').end()
            .find('select').children().removeAttr('selected');
    }//,
    //obterCidadesPorEstado: function (idEstado) {
    //}
};