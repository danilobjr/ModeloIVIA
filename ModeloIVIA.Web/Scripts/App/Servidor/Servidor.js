/// <reference path="../Main/MainScript.js" />

ModeloIVIA.Servidor = function Servidor() {

    /// <summary>
    /// Faz conexão com o lado servidor via ajax.
    /// </summary>

};

ModeloIVIA.Servidor.prototype = {

    constructor: ModeloIVIA.Servidor,

    ajax: function (url, parametros, loader, successCallback, beforeCallback, completeCallback) {

        /// <summary>
        /// Faz uma requisição ajax.
        /// &#10;Exceções: TypeError.
        /// </summary>
        /// <param name="url" type="string">
        /// Url no padrão ASP.NET MVC: NomeController/NomeAction
        /// &#10;Pode conter os parâmetros no final: NomeController/NomeAction?param=valor&outroParam=outroValor
        /// </param>
        /// <param name="parametros" type="string">
        /// Parâmetros a serem passados à Action.
        /// &#10;Podem ser colocados no final do parâmetro 'url'.
        /// </param>
        /// <param name="loader" type="jQuery">
        /// Figura de carregamento.
        /// </param>
        /// <param name="successCallback" type="Function">
        /// Função a ser executada após uma resposta de sucesso do servidor.
        /// </param>
        /// <param name="beforeCallback" type="Function">
        /// Função a ser executada antes da requisição ser iniciada.
        /// </param>
        /// <param name="completeCallback" type="Function">
        /// Função a ser executada após a chegada da resposta do servidor.
        /// &#10;Esta função será executada mesmo que a resposta seja um erro.
        /// </param>
        /// <returns type="void" />

        $.ajax({
            type: 'post',
            url: url,
            data: parametros,
            beforeSend: function () {
                if (loader) {
                    $(loader).fadeIn();
                }
            },
            success: function (resultado) {
                if (typeof (successCallback) === 'function') {
                    successCallback.call(this, resultado);
                }
                else {
                    throw new TypeError("Servidor.ajax(): O parâmetro 'successCallback' não é uma função.");
                }
            },
            error: function (erro) {
                alert(erro);
            },
            complete: function () {
                if (loader) {
                    $(loader).fadeOut();
                }
            }
        });

    }
};