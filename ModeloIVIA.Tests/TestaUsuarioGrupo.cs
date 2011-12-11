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
    public class TestaUsuarioGrupo
    {
        public TestaUsuarioGrupo()
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
            TestaUsuarioLogin.MyClassInitialize(testContext);
            usuarioServico = (UsuarioServico)testContext.Properties["usuarioServico"];
        }

        [TestMethod]
        public void VerificaUsuarioEmGrupoAdministrador()
        {
            Usuario pedro = usuarioServico.ObterUsuario(1);

            Assert.IsTrue(pedro.Grupo.Perfil == Perfil.Administrador);
        }

        [TestMethod]
        public void VerificaUsuarioEmGrupoUsuario()
        {
            Usuario marcos = usuarioServico.ObterUsuario(2);

            Assert.IsTrue(marcos.Grupo.Perfil == Perfil.Usuario);
        }
    }
}
