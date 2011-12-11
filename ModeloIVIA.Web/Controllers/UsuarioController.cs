using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ModeloIVIA.Web.Controllers
{
    public class UsuarioController : Controller
    {
        private UsuarioServico _usuarioServico;

        public UsuarioController()
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
