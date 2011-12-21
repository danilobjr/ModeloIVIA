using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class CidadeServico
    {
        #region Propriedades

        private CidadeRepositorio _cidadeRepositorio;

        #endregion

        #region Construtor

        public CidadeServico()
        {
            _cidadeRepositorio = new CidadeRepositorio();
        }

        #endregion

        public IList<Cidade> ObterCidadesPorEstado(int idEstado)
        {
            return _cidadeRepositorio.ObterCidadesPorEstado(idEstado).ToList();
        }

        public Cidade Obter(int idCidade)
        {
            return _cidadeRepositorio.Obter(idCidade);
        }
    }
}
