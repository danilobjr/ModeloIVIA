using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class Grupo
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public int IdPerfil { get; set; }
        public Perfil Perfil { get; set; }
    }
}
