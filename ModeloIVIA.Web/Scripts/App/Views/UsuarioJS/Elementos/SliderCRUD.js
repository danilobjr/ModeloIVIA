ModeloIVIA.Elemento.SliderCRUD = function SliderCRUD(idContainer, options) {

    // Construtor SuperTipo

    ModeloIVIA.Componente.Slider.call(this, idContainer, options);

};

ModeloIVIA.Elemento.SliderCRUD.prototype = new ModeloIVIA.Componente.Slider();

ModeloIVIA.Elemento.SliderCRUD.prototype.irParaSlide = function (indice) {

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

    var elementoClicado = $('a').filter('[data-slide=' + indice + ']');
    elementoClicado.addClass('tab-ativa');
    elementoClicado.siblings().removeClass('tab-ativa');

    this.slider.goToSlide(indice);
}