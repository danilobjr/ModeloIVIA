﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ModeloIVIA.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Bem-vindo!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
