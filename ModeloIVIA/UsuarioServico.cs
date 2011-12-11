using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class UsuarioServico
    {
        // TODO: deve ficar no repositório
        private List<Usuario> listaUsuarios;
        
        /// <summary>
        /// Recebe lista de usuários como parâmetros (ficará no repositório)
        /// </summary>
        /// <param name="listaUsuarios"></param>
        public UsuarioServico(List<Usuario> listaUsuarios)
        {
            this.listaUsuarios = listaUsuarios;
        }

        public UsuarioServico()
        {
            this.listaUsuarios = new UsuarioRepositorio().ObterTodos();
        }

        /// <summary>
        /// Verifica um usuário em uma tentativa de login. Retorna o usuário quando login e senha estiverem corretos. 
        /// </summary>
        /// <param name="login"></param>
        /// <param name="senha"></param>
        /// <returns></returns>
        public Usuario ValidarLogin(string login, string senha)
        {
            var usuario = (from u in listaUsuarios where u.Login == login && u.Senha == senha select u).FirstOrDefault();

            return usuario;
        }

        /// <summary>
        /// Obtem usuário por id (deve usar o repositório)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Usuario ObterUsuario(int id)
        {
            return (from u in listaUsuarios where u.Id == id select u).FirstOrDefault();
        }

        public IList<Usuario> ObterTodos()
        {
            return listaUsuarios;
        }
    }
}
