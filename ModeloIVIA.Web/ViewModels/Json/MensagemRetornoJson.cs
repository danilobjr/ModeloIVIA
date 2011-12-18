using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModeloIVIA.Web.ViewModels.Json
{
    public class MensagemRetornoJson
    {
        public static string ErroUsuarioJSObterUsuarioParaAlteracao = "Ocorreu um erro ao tentar obter usuário.";

        public MensagemRetornoJsonTipo Titulo { get; set; }
        public string Corpo { get; set; }
        public Exception Excecao { get; set; }
    }
}