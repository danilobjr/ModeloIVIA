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
        public JsonResult SalvarNovoUsuario(SalvarUsuarioViewModel viewModel)
        {
            try
            {
                var usuario = Mapeador.ParaUsuario(viewModel);
                _usuarioServico.SalvarNovoUsuario(usuario);
                var listaUsuariosAtualizados = _usuarioServico.ObterTodos();

                return Json(new JsonViewModel
                {
                    Sucesso = true,
                    Dados = listaUsuariosAtualizados,
                    Mensagem = new MensagemRetornoJson
                    {
                        Titulo = MensagemRetornoJsonTipo.Sucesso.ToString(),
                        Descricao = MensagemRetornoJson.SucessoUsuarioJSSalvarNovoUsuario
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
                        Titulo = MensagemRetornoJsonTipo.Erro.ToString(),
                        Descricao = MensagemRetornoJson.ErroUsuarioJSSalvarNovoUsuario,
                        Excecao = e
                    }
                });
            }
        }

        [HttpPost]
        public JsonResult SalvarAlteracaoUsuario(SalvarUsuarioViewModel viewModel)
        {
            try
            {
                var usuario = Mapeador.ParaUsuario(viewModel);
                _usuarioServico.SalvarAlteracaoUsuario(usuario);

                return Json(new JsonViewModel
                {
                    Sucesso = true,
                    Mensagem = new MensagemRetornoJson
                    {
                        Titulo = MensagemRetornoJsonTipo.Sucesso.ToString(),
                        Descricao = MensagemRetornoJson.SucessoUsuarioJSSalvarAlteracaoUsuario
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
                        Titulo = MensagemRetornoJsonTipo.Erro.ToString(),
                        Descricao = MensagemRetornoJson.ErroUsuarioJSSalvarAlteracaoUsuario,
                        Excecao = e
                    }
                });
            }
        }

        [HttpPost]
        public JsonResult ExcluirUsuario(int idUsuario)
        {
            try
            {
                _usuarioServico.Excluir(idUsuario);

                return Json(new JsonViewModel
                {
                    Sucesso = true,
                    Mensagem = new MensagemRetornoJson
                    {
                        Titulo = MensagemRetornoJsonTipo.Sucesso.ToString(),
                        Descricao = MensagemRetornoJson.SucessoUsuarioJsExcluirUsuario
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
                        Titulo = MensagemRetornoJsonTipo.Erro.ToString(),
                        Descricao = MensagemRetornoJson.ErroUsuarioJsExcluirUsuario,
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
                        Titulo = MensagemRetornoJsonTipo.Erro.ToString(),
                        Descricao = MensagemRetornoJson.ErroUsuarioJSObterUsuarioParaAlteracao,
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
                        Titulo = MensagemRetornoJsonTipo.Erro.ToString(),
                        Descricao = MensagemRetornoJson.ErroUsuarioJSObterCidadesPorEstado,
                        Excecao = e
                    }
                });
            }
        }

        [HttpPost]
        public JsonResult ObterTodosUsuarios()
        {
            try
            {
                var usuarios = _usuarioServico.ObterTodos();

                if (usuarios != null)
                {
                    return Json(new JsonViewModel
                    {
                        Sucesso = true,
                        Dados = usuarios
                    });
                }
                else
                {
                    throw new Exception("Usuários não encontrados.");
                }
            }
            catch (Exception e)
            {
                return Json(new JsonViewModel
                {
                    Sucesso = false,
                    Mensagem = new MensagemRetornoJson
                    {
                        Titulo = MensagemRetornoJsonTipo.Erro.ToString(),
                        Descricao = MensagemRetornoJson.ErroUsuarioJSObterTodosUsuarios,
                        Excecao = e
                    }
                });
            }
        }
    }
}
