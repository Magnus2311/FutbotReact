using FutbotReact.Helpers.Enums;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.DTOs;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace FutbotReact.Services.SeleniumServices
{
    public class LoginService 
    {
        private readonly ChromeDriver _driver;

        public LoginService(ChromeDriver driver) =>
            _driver = driver;

        public LoginStatus Start(LoginDTO loginDTO)
        {
            _driver.Navigate().GoToUrl(@"https://www.ea.com/fifa/ultimate-team/web-app/");

            var startButton = _driver.FindElement(By.ClassName("btn-standard"), 13);
            Thread.Sleep(1000);
            if (startButton == null)
                return LoginStatus.Logged;
            startButton.Click();

            // Entering credentials
            _driver.FindElement(By.Id("email"), 10).SendKeys(loginDTO.Username);
            _driver.FindElementById("password").SendKeys(loginDTO.Password);
            _driver.FindElementById("btnLogin").Click();

            var confirmationCodeInput = _driver.FindElement(By.Id("btnSendCode"), 3);
            if (confirmationCodeInput == null)
                return LoginStatus.WrongCredentials;

            confirmationCodeInput.Click();
            return LoginStatus.WaitingForSecurityCode;
        }

        internal LoginStatus SubmitSecurityCode(string securityCode)
        {
            _driver.FindElementById("oneTimeCode").SendKeys(securityCode);
            _driver.FindElementById("btnSubmit").Click();
            return LoginStatus.Logged;
        }

        internal void ResendSecurityCode()
        {
            _driver.FindElementById("resend_link").Click();
        }
    }
}