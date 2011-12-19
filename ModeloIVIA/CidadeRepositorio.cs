using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class CidadeRepositorio
    {
        #region Propriedades e Campos

        public List<Cidade> Cidades { get; set; }

        #endregion

        #region Construtor

        public CidadeRepositorio()
        {
            Cidades = new List<Cidade>
            {
                new Cidade { Id = 1, Descricao = "Fortaleza", IdEstado = 1 },
                new Cidade { Id = 2, Descricao = "Sobral", IdEstado = 1 },
                new Cidade { Id = 3, Descricao = "Quixadá", IdEstado = 1 },
                new Cidade { Id = 4, Descricao = "São Paulo", IdEstado = 2 },
                new Cidade { Id = 5, Descricao = "Pindamonhangaba", IdEstado = 2 },
                new Cidade { Id = 6, Descricao = "Taubaté", IdEstado = 2 }
            };
        }

        #endregion

        public IEnumerable<Cidade> ObterCidadesPorEstado(int idEstado)
        {
            return Cidades.Where(c => c.IdEstado == idEstado);
        }
    }
}
