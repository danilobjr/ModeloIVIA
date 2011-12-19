using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class GrupoServico
    {
        #region Propriedades

        private GrupoRepositorio _grupoRepositorio;

        #endregion

        #region Construtor

        public GrupoServico()
        {
            _grupoRepositorio = new GrupoRepositorio();
        }

        #endregion

        public IList<Grupo> ObterTodos()
        {
            return _grupoRepositorio.ObterTodos();
        }
    }
}
