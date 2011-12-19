using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class EnderecoServico
    {
        #region Propriedades e Campos

        private EnderecoRepositorio _enderecoRepositorio;

        #endregion

        #region Construtor

        public EnderecoServico()
        {
            _enderecoRepositorio = new EnderecoRepositorio();
        }

        #endregion

    }
}
