using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ModeloIVIA.Web.ViewModels.Json;

namespace ModeloIVIA.Web.Controllers
{
    public class UsuarioJSController : Controller
    {
        #region Propriedades

        private UsuarioServico _usuarioServico;

        #endregion

        #region Construtor

        public UsuarioJSController()
        {
            _usuarioServico = new UsuarioServico();
        }

        #endregion

        public ActionResult Index()
        {
            var usuarios = _usuarioServico.ObterTodos();

            return View(usuarios);
        }

        [HttpPost]
        public JsonResult ObterUsuarioParaAlteracao(int idUsuario)
        {
            try
            {
                var usuario = _usuarioServico.ObterUsuario(idUsuario);

                if (usuario != null)
                {
                    return Json(new JsonViewModel
                    {
                        Sucesso = true,
                        Dados = usuario
                    });
                }
                else
                {
                    throw new Exception("Usuário não encontrado.");
                }
            }
            catch (Exception e) 
            {
                return Json(new JsonViewModel
                {
                    Sucesso = false,
                    Mensagem = new MensagemRetornoJson
                    {
                        Titulo = MensagemRetornoJsonTipo.Erro,
                        Corpo = MensagemRetornoJson.ErroUsuarioJSObterUsuarioParaAlteracao,
                        Excecao = e
                    }
                });
            }
        }
    }
}
