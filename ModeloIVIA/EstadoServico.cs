using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class EstadoServico
    {
        #region Propriedades

        private EstadoRepositorio _estadoRepositorio;

        #endregion

        #region Construtor

        public EstadoServico()
        {
            _estadoRepositorio = new EstadoRepositorio();
        }

        #endregion

        public IList<Estado> ObterTodos()
        {
            return _estadoRepositorio.ObterTodos().ToList();
        }
    }
}
