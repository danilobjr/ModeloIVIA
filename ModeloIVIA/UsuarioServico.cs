using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace ModeloIVIA
{
    public class UsuarioServico
    {
        #region Propriedades e Campos

        private UsuarioRepositorio _usuarioRepositorio;

        #endregion

        #region Construtor

        public UsuarioServico()
        {
            _usuarioRepositorio = new UsuarioRepositorio();
        }

        #endregion

        public Usuario ObterUsuario(int id)
        {
            var usuarios = _usuarioRepositorio.ObterTodos();
            return (from u in usuarios where u.Id == id select u).FirstOrDefault();
        }

        public IList<Usuario> ObterTodos()
        {
            return _usuarioRepositorio.ObterTodos();
        }

        public void SalvarNovoUsuario(Usuario usuario)
        {
            _usuarioRepositorio.SalvarNovo(usuario);
        }

        public void SalvarAlteracaoUsuario(Usuario usuarioAlterado)
        {
            Usuario usuarioOriginal = _usuarioRepositorio.Obter(usuarioAlterado.Id);

            usuarioOriginal.Nome = usuarioAlterado.Nome;
            usuarioOriginal.Login = usuarioAlterado.Login;
            usuarioOriginal.Email = usuarioAlterado.Email;
            usuarioOriginal.Endereco = usuarioAlterado.Endereco;
            usuarioOriginal.Grupo = usuarioAlterado.Grupo;

            _usuarioRepositorio.SalvarAlteracao(usuarioOriginal);
        }

        public void Excluir(int idUsuario)
        {
            var usuario = _usuarioRepositorio.Obter(idUsuario);

            _usuarioRepositorio.Excluir(usuario);
        }
    }
}
