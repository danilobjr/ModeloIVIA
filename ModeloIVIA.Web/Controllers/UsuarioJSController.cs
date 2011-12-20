using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ModeloIVIA.Web.ViewModels.Json;
using ModeloIVIA.Web.ViewModels.UsuarioJS;
using ModeloIVIA.Web.Util;

namespace ModeloIVIA.Web.Controllers
{
    public class UsuarioJSController : Controller
    {
        #region Propriedades

        private UsuarioServico _usuarioServico;
        private GrupoServico _grupoServico;
        private EstadoServico _estadoServico;
        private CidadeServico _cidadeServico;

        #endregion

        #region Construtor

        public UsuarioJSController()
        {
            _usuarioServico = new UsuarioServico();
            _grupoServico = new GrupoServico();
            _estadoServico = new EstadoServico();
            _cidadeServico = new CidadeServico();
        }

        #endregion

        public ActionResult Index()
        {
            var viewModel = new IndexViewModel
            {
                Usuarios = _usuarioServico.ObterTodos(),
                Grupos = _grupoServico.ObterTodos(),
                Estados = _estadoServico.ObterTodos()
            };

            return View(viewModel);
        }

        [HttpPost]
        public JsonResult Salvar(SalvarViewModel viewModel)
        {
            try
            {
                var usuario = Mapeador.ParaUsuario(viewModel);
                //_usuarioServico.Salvar();

                return Json(new JsonViewModel
                {
                    Sucesso = true,
                    Mensagem = new MensagemRetornoJson
                    {
                        Titulo = MensagemRetornoJsonTipo.Sucesso,
                        Corpo = MensagemRetornoJson.SucessoUsuarioJSSalvar
                    }
                });
            }
            catch (Exception e)
            {
                return Json(new JsonViewModel
                {
                    Sucesso = false,
                    Mensagem = new MensagemRetornoJson
                    {
                        Titulo = MensagemRetornoJsonTipo.Erro,
                        Corpo = MensagemRetornoJson.ErroUsuarioJSSalvar,
                        Excecao = e
                    }
                });
            }
        }

        [HttpPost]
        public JsonResult ObterUsuarioParaAlteracao(int idUsuario)
        {
            try
            {
                var usuario = _usuarioServico.ObterUsuario(idUsuario);
                var cidadesDoEstado = _cidadeServico.ObterCidadesPorEstado(usuario.Endereco.Cidade.IdEstado);

                if (usuario != null)
                {
                    return Json(new JsonViewModel
                    {
                        Sucesso = true,
                        Dados = new { Usuario = usuario, Cidades = cidadesDoEstado }
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

        [HttpPost]
        public JsonResult ObterCidadesPorEstado(int idEstado)
        {
            try
            {
                var cidades = _cidadeServico.ObterCidadesPorEstado(idEstado);

                if (cidades != null)
                {
                    return Json(new JsonViewModel
                    {
                        Sucesso = true,
                        Dados = cidades
                    });
                }
                else
                {
                    throw new Exception("Cidades não encontradas.");
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
                        Corpo = MensagemRetornoJson.ErroUsuarioJSObterCidadesPorEstado,
                        Excecao = e
                    }
                });
            }
        }
    }
}
