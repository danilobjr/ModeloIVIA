using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class EnderecoRepositorio
    {
        #region Propriedades

        public List<Endereco> Enderecos { get; set; }

        #endregion

        #region Construtor

        public EnderecoRepositorio()
        {
            Enderecos = new List<Endereco>
            {
                new Endereco 
                { 
                    Logradouro = "Av. Santos Dummont", 
                    Numero = 6000, 
                    Complemento = "", 
                    Bairro = "Dunas", 
                    CEP = "60000-000", 
                    Cidade = new Cidade 
                    {
                        Id = 1,
                        Descricao = "Fortaleza",
                        IdEstado = 1
                    }
                },

                new Endereco 
                { 
                    Logradouro = "Av. Paulista", 
                    Numero = 555, 
                    Complemento = "Ap. 102 - Bl 4", 
                    Bairro = "Não sei", 
                    CEP = "14555-000", 
                    Cidade = new Cidade 
                    {
                        Id = 4,
                        Descricao = "São Paulo",
                        IdEstado = 2
                    }
                }
            };
        }

        #endregion

        public IEnumerable<Endereco> ObterTodos()
        {
            return Enderecos;
        }
    }
}
