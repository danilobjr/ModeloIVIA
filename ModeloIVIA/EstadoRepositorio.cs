using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class EstadoRepositorio
    {
        #region Propriedades e Campos

        private CidadeRepositorio _cidadeRepositorio;
        public IList<Estado> Estados { get; set; }

        #endregion

        #region Construtor

        public EstadoRepositorio()
        {
            _cidadeRepositorio = new CidadeRepositorio();

            Estados = new List<Estado>
            {
                new Estado { Id = 1, Descricao = "Ceará", Cidades = _cidadeRepositorio.ObterCidadesPorEstado(1).ToList() },
                new Estado { Id = 2, Descricao = "São Paulo", Cidades = _cidadeRepositorio.ObterCidadesPorEstado(2).ToList() },
            };
        }

        #endregion

        public IEnumerable<Estado> ObterTodos()
        {
            return Estados;
        }

        public Estado ObterPorCidade(int idCidade)
        {
            return Estados.FirstOrDefault(e => e.Cidades.Any(c => c.Id == idCidade));
        }
    }
}
