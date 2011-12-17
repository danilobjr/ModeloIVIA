/// <reference path="../Main/MainScript.js" />
/// <reference path="../../jquery-1.5.1-vsdoc.js" />
/// <reference path="../../Plugins/TipValidation/js/jquery.tipValidation.js" />

ModeloIVIA.Componente.Validador = function Validador(seletor) {

    /// <summary>
    /// Renderiza tooltips de validação para input's.
    /// </summary>
    /// <param name="selector" type="String">
    /// Seletor jQuery representando os input's que terão tooltips.
    /// </param>


    // Propriedades

    this.validador = null;


    // Construtor

    if (seletor) {
        this.validador = $(seletor).tipValidation();
    }

};

ModeloIVIA.Componente.Validador.prototype = {

    constructor: ModeloIVIA.Componente.Slider,

    removerTodos: function () {

        /// <summary>
        /// Remove todos os tooltips.
        /// </summary>
        /// <returns type="void" />

        this.validador.removeAll();
    }
};

// USAGE =================================================================================//

//<input type="text" tipvalidation="required-email" />
//var validador = new ModeloIVIA.Componente.Validador("input[type=text]");
//validador.removerTodos();
