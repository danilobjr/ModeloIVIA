using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModeloIVIA.Web.ViewModels.UsuarioJS
{
    public class SalvarUsuarioViewModel
    {
        public int Id { get; set; }

        public string Nome { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }

        public string Logradouro { get; set; }
        public int Numero { get; set; }
        public string Bairro { get; set; }
        public string Complemento { get; set; }
        public int Cidade { get; set; }
        public int Estado { get; set; }

        public int Grupo { get; set; }
    }
}