/// <reference path="../Main/MainScript.js" />
/// <reference path="../../jquery-1.5.1-vsdoc.js" />
/// <reference path="../../Plugins/ezSlider/jquery.ezSlider.js" />

ModeloIVIA.Componente.Slider = function Slider(idContainer) {

    /// <summary>
    /// Configura um container como um Slider. 
    /// &#10;Os elementos filhos deste container serão os slides.    
    /// </summary>
    /// <param name="idContainer" type="String">
    /// Id do elemento container com elementos filhos.
    /// </param>


    // Propriedades

    this.slider = null;
    var _idContainer = '#' + idContainer;


    // Construtor

    if (idContainer) {
        this.slider = $(_idContainer).ezSlider();
    }

};

ModeloIVIA.Componente.Slider.prototype = {

    constructor: ModeloIVIA.Componente.Slider,

    proximo: function () {

        /// <summary>
        /// Avança para próximo slide.
        /// </summary>
        /// <returns type="void" />

        this.slider.goToNextSlide();
    },
    anterior: function () {

        /// <summary>
        /// Volta para slide anterior.
        /// </summary>
        /// <returns type="void" />

        this.slider.goToPreviousSlide();
    },
    irParaSlide: function (indice) {

        /// <summary>
        /// Vai para um slide específico.
        /// </summary>
        /// <param name="indice" type="int">
        /// Indice do slide alvo.
        /// </param>
        /// <returns type="void" />

        if (!indice || !(!isNaN(parseFloat(indice)) && isFinite(indice))) {
            throw new TypeError("Slider.irParaSlide(): O parâmetro 'indice' deve ser um número válido.");
        }

        this.slider.goToSlide(indice);
    }
};

// USAGE =================================================================================//

//var slider = new ModeloIVIA.Componente.Slider("idSlidesContainer");
//slider.anterior();
//slider.proximo();
//slider.irParaSlide(1);