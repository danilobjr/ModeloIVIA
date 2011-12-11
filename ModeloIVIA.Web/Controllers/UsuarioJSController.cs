using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ModeloIVIA.Web.Controllers
{
    public class UsuarioJSController : Controller
    {
        private UsuarioServico _usuarioServico;

        public UsuarioJSController()
        {
            _usuarioServico = new UsuarioServico();
        }

        public ActionResult Index()
        {
            var usuarios = _usuarioServico.ObterTodos();
            return View(usuarios);
        }
    }
}
