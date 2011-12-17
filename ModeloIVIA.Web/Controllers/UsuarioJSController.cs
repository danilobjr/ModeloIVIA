using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}
