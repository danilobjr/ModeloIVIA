using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ModeloIVIA.Web.ViewModels.UsuarioJS;

namespace ModeloIVIA.Web.Util
{
    public class Mapeador
    {
        public static Usuario ParaUsuario(SalvarViewModel viewModel)
        {
            return new Usuario
            {
                Id = viewModel.Id,
                Nome = viewModel.Nome,
                Email = viewModel.Email,
                Login = viewModel.Login,
                //Senha = (viewModel.Id == 0) ? String.Format("ivia#{0}", DateTime.Now.Year) 
                Grupo = viewModel.Grupo
            };
        }
    }
}