using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModeloIVIA.Web.ViewModels.Json
{
    public class MensagemRetornoJson
    {
        public static string ErroUsuarioJSObterUsuarioParaAlteracao = "Ocorreu um erro ao tentar obter usuário.";
        public static string ErroUsuarioJSSalvarNovoUsuario = "Ocorreu um erro ao tentar incluir novo usuário.";
        public static string ErroUsuarioJSObterCidadesPorEstado = "Ocorreu um erro ao tentar obter as cidades.";
        public static string SucessoUsuarioJSSalvarNovoUsuario = "Novo usuário incluído com sucesso.";
        public static string SucessoUsuarioJSSalvarAlteracaoUsuario = "Usuário alterado com sucesso.";
        public static string ErroUsuarioJSSalvarAlteracaoUsuario = "Ocorreu um erro ao tentar alterar usuário.";


        public MensagemRetornoJsonTipo Titulo { get; set; }
        public string Corpo { get; set; }
        public Exception Excecao { get; set; }
    }
}