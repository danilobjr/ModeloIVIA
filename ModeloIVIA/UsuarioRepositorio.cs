using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace ModeloIVIA
{
    public class UsuarioRepositorio
    {
        private List<Usuario> Usuarios 
        {
            get
            {
                return (List<Usuario>)HttpContext.Current.Session["Usuarios"];
            }
            set
            {
                HttpContext.Current.Session["Usuarios"] = value;
            }
        }

        public UsuarioRepositorio()
        {
            if (Usuarios == null)
            {
                CriarUsuarios();
            }
        }

        private void CriarUsuarios()
        {
            var usuarios = new List<Usuario>();
            var enderecoRepositorio = new EnderecoRepositorio();

            for (int cont = 0; cont < 25; cont++)
            {
                var id = cont + 1;

                usuarios.Add(new Usuario
                {
                    Id = id,
                    Nome = String.Format("Usuário {0}", id),
                    Email = String.Format("usuario{0}@email.com", id),
                    Login = String.Format("usuario{0}", id),
                    Senha = "123456",
                    Endereco = (cont % 2 == 0) ? enderecoRepositorio.ObterTodos().ElementAt(0) : enderecoRepositorio.ObterTodos().ElementAt(1),
                    Grupo = new GrupoRepositorio().ObterPorIdUsuario(id)
                });
            }

            Usuarios = usuarios;
        }

        internal List<Usuario> ObterTodos()
        {
            return Usuarios;
        }

        internal void SalvarNovo(Usuario usuario)
        {
            Usuarios.Add(usuario);
        }

        internal Usuario Obter(int idUsuario)
        {
            return Usuarios.FirstOrDefault(u => u.Id == idUsuario);
        }

        internal void SalvarAlteracao(Usuario usuarioOriginal)
        {
            Usuarios.RemoveAll(u => u.Id == usuarioOriginal.Id);
            Usuarios.Add(usuarioOriginal);
        }
    }
}
