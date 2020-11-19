using FutbotReact.Helpers.Enums;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.DTOs;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

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

            var startButton = _driver.FindElement(By.ClassName("btn-standard"), 10);
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
            return LoginStatus.WaitingForPassword;
        }
    }
}