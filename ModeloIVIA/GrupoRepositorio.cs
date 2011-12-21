using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModeloIVIA
{
    public class GrupoRepositorio
    {
        private List<Grupo> Grupos { get; set; }

        public GrupoRepositorio()
        {
            CriarGrupos();
        }

        private void CriarGrupos()
        {
            var grupos = new List<Grupo>();

            for (int cont = 0; cont < 10; cont++)
            {
                var id = cont + 1;
                var perfil = Perfil.Usuario;

                if (cont == 1)
                    perfil = Perfil.Administrador;
                if (cont > 1 && cont < 4)
                    perfil = Perfil.Chefe;

                grupos.Add(new Grupo
                {
                    Id = id,
                    Nome = String.Format("Grupo {0}", id),
                    Perfil = perfil
                });
            }

            Grupos = grupos;
        }

        internal List<Grupo> ObterTodos()
        {
            return Grupos;
        }

        internal Grupo ObterPorIdUsuario(int idUsuario)
        {
            var grupoDoUsuario = Grupos.FirstOrDefault(g => g.Id == idUsuario);

            if (grupoDoUsuario == null)
                grupoDoUsuario = Grupos.First();

            return grupoDoUsuario;
        }

        internal Grupo Obter(int idGrupo)
        {
            return Grupos.FirstOrDefault(g => g.Id == idGrupo);
        }
    }
}
