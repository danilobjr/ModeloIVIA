using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class Estado
    {
        public int Id { get; set; }
        public string Descricao { get; set; }

        public IList<Cidade> Cidades { get; set; }
    }
}
