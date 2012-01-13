/// <reference path="../Main/Namespace.js" />
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

    constructor: ModeloIVIA.Componente.Validador,

    removerTodos: function () {

        /// <summary>
        /// Remove todos os tooltips.
        /// </summary>
        /// <returns type="void" />

        this.validador.removeAll();
    },
    estahValido: function (destacarCampos, mostrarTooltipOnFocus) {

        /// <summary>Verifica se os campos estao válidos.</summary>
        /// <param name="destacarCampos" type="Boolean">Modifica as cores da borda dos campos.</param>
        /// <param name="mostrarTooltipOnFocus" type="Boolean"></param>
        /// <returns type="Boolean" />

        this.validador.isValid(destacarCampos, mostrarTooltipOnFocus);
    },
    removerDestaquesDoCampos: function () {

        /// <summary>Retira classe dos campos em destaque pelo validador.</summary>
        /// <returns type="void" />

        this.validador.removeHighlights();
    }
};

// USAGE =================================================================================//

//<input type="text" tipvalidation="required-email" />
//var validador = new ModeloIVIA.Componente.Validador("input[type=text]");
//validador.removerTodos();
