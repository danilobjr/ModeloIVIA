using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ModeloIVIA.Web.ViewModels.UsuarioJS;

namespace ModeloIVIA.Web.Util
{
    public class Mapeador
    {
        public static Usuario ParaUsuario(SalvarUsuarioViewModel viewModel)
        {
            var idGrupo = viewModel.Grupo;
            var idCidade = viewModel.Cidade;

            return new Usuario
            {
                Id = viewModel.Id,
                Nome = viewModel.Nome,
                Email = viewModel.Email,
                Login = viewModel.Login,
                Grupo = new GrupoServico().Obter(idGrupo),
                Endereco = new Endereco
                {
                    Logradouro = viewModel.Logradouro,
                    Numero = viewModel.Numero,
                    Bairro = viewModel.Bairro,
                    Complemento = viewModel.Complemento,
                    //CEP = viewModel.Cp
                    Cidade = new CidadeServico().Obter(idCidade)
                }
            };
        }
    }
}