using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModeloIVIA.Web.ViewModels.Json
{
    public class JsonViewModel
    {
        public bool Sucesso { get; set; }
        public MensagemRetornoJson Mensagem { get; set; }
        public dynamic Dados { get; set; }
    }
}