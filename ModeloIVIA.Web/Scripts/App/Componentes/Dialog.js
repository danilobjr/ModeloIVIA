/// <reference path="../../jquery-1.5.1-vsdoc.js" />
/// <reference path="../Main/Namespace.js" />


ModeloIVIA.Componente.Dialog = function () {

    this.container = undefined;
    this.mensagem = undefined;

    if (!($('.dialog').length)) {
        this.container = $('<div>').addClass('dialog').appendTo('body');
        this.mensagem = $('<p>').appendTo(this.container);
    }
    else {
        this.container = $('.dialog');
        this.mensagem = $(this.container).find('p');
    }

    $(this.container).dialog({
        autoOpen: false,
        modal: true,
        draggable: true,
        resizable: false
    });

};

ModeloIVIA.Componente.Dialog.alert = function (titulo, mensagem) {

    var dialog = new ModeloIVIA.Componente.Dialog();

    $(dialog.mensagem).html(mensagem);
    $(dialog.container)
        .dialog('option', {
            width: 350,
            title: titulo,
            buttons: { "OK": function () { $(this).dialog('close'); } }
        })
        .dialog('open');
};

ModeloIVIA.Componente.Dialog.confirm = function (titulo, mensagem, funcaoConfirmacao) {

    var dialog = new ModeloIVIA.Componente.Dialog();

    $(dialog.mensagem).html(mensagem);
    $(dialog.container)
    .dialog('option', {
        width: 350,
        title: titulo,
        buttons: [
            {
                text: "Sim",
                click: function () {
                    $(this).dialog('close');
                    if (typeof (funcaoConfirmacao) === 'function') {
                        funcaoConfirmacao();
                    }
                }
            },
            {
                text: "Não",
                click: function () { $(this).dialog('close'); }
            }
        ]
    })
    .dialog('open');
};