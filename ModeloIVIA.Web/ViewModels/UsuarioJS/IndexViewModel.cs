using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModeloIVIA.Web.ViewModels.UsuarioJS
{
    public class IndexViewModel
    {
        public IList<Usuario> Usuarios { get; set; }
        public IList<Grupo> Grupos { get; set; }
        public IList<Estado> Estados { get; set; }
    }
}