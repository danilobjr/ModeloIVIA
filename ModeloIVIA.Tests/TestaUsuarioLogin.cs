using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ModeloIVIA.Tests
{
    /// <summary>
    /// Summary description for UnitTest1
    /// </summary>
    [TestClass]
    public class TestaUsuarioLogin
    {
        public TestaUsuarioLogin()
        {
            
        }

        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region Additional test attributes
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        private static UsuarioServico usuarioServico = null;

        /// <summary>
        /// Inicializa o teste criando entidades e instanciando o serviço
        /// </summary>
        /// <param name="testContext"></param>
        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext) {

            if (usuarioServico == null)
            {
                List<Usuario> listaUsuarios = new List<Usuario>();
                Grupo grupoAdmin = new Grupo() { Id = 1, Nome = "Administrador", IdPerfil = 1, Perfil = Perfil.Administrador };
                Grupo grupoUsuario = new Grupo() { Id = 2, Nome = "Usuario", IdPerfil = 3, Perfil = Perfil.Usuario };

                listaUsuarios.Add(new Usuario() { Id = 1, Nome = "Pedro Junior", Login = "pedro.junior", Senha = "pedro123", Email = "pedro.junior@ivia.com.br", IdGrupo = 1, Grupo = grupoAdmin });
                listaUsuarios.Add(new Usuario() { Id = 2, Nome = "Mario Marcos", Login = "mario.marcos", Senha = "marcos123", Email = "mario.marcos@ivia.com.br", IdGrupo = 3, Grupo = grupoUsuario });

                usuarioServico = new UsuarioServico(listaUsuarios);

                testContext.Properties.Add("usuarioServico", usuarioServico);
            }
        }

        [TestMethod]
        public void VerificaLoginValido()
        {
            string login = "pedro.junior";
            string senha = "pedro123";

            Assert.IsNotNull(usuarioServico.ValidarLogin(login, senha), String.Format("Não foi possível o login com {0}:{1}", login, senha)); 
        }

        [TestMethod]
        public void VerificaLoginInvalido()
        {
            string login = "pedro.junior";
            string senha = "pedro";

            Assert.IsNull(usuarioServico.ValidarLogin(login, senha), String.Format("Não deveria ser possível o login com {0}:{1}", login, senha));

            login = "joao.neto";
            senha = "pedro123";

            Assert.IsNull(usuarioServico.ValidarLogin(login, senha), String.Format("Não deveria ser possível o login com {0}:{1}", login, senha));
        }
    }
}
