using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModeloIVIA.Web.ViewModels.UsuarioJS
{
    public class SalvarViewModel
    {
        public int Id { get; set; }

        public string Nome { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }

        public Endereco Endereco { get; set; }

        public Grupo Grupo { get; set; }
    }
}