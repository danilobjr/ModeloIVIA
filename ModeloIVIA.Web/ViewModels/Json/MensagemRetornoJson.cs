using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModeloIVIA.Web.ViewModels.Json
{
    public class MensagemRetornoJson
    {
        public static string ErroUsuarioJSObterUsuarioParaAlteracao = "Ocorreu um erro ao tentar obter usuário.";
        public static string ErroUsuarioJSSalvar = "Ocorreu um erro ao tentar salvar usuário.";
        public static string ErroUsuarioJSObterCidadesPorEstado = "Ocorreu um erro ao tentar obter as cidades.";
        public static string SucessoUsuarioJSSalvar = "Usuário salvo com sucesso.";


        public MensagemRetornoJsonTipo Titulo { get; set; }
        public string Corpo { get; set; }
        public Exception Excecao { get; set; }
    }
}