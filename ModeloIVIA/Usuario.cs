using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string Email { get; set; }

        public Grupo Grupo { get; set; }
        public int IdGrupo { get; set; }
    }
}
