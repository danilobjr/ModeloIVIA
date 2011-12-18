using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class Endereco
    {
        public string Logradouro { get; set; }
        public int Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string CEP { get; set; }

        public Cidade Cidade { get; set; }
    }
}
