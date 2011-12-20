using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class UsuarioRepositorio
    {
        private List<Usuario> Usuarios { get; set; }

        public UsuarioRepositorio()
        {
            CriarUsuarios();
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
    }
}
