using FutbotReact.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Threading;

namespace FutbotReact.Helpers.Extensions
{
    public static class WebDriverExtensions
    {
        public static IWebElement FindElement(this IWebDriver driver, By by, int timeOutInSeconds)
        {
            if (timeOutInSeconds > 0)
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(timeOutInSeconds));
                return wait.Until(drv => drv.FindElement(by));
            }

            return driver.FindElement(by);
        }

        public static IEnumerable<IWebElement> FindElements(this IWebDriver driver, By by, int timeOutInSeconds)
        {
            if (timeOutInSeconds > 0)
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(timeOutInSeconds));
                return wait.Until(drv => drv.FindElements(by));
            }

            return driver.FindElements(by);
        }

        public static void OpenSearchTransferMarket(this IWebDriver driver, EaAccount eaAccount)
        {
            driver.GoToTransferMenu(eaAccount);
            Thread.Sleep(3000);
            var searchTransfer = driver.FindElement(By.ClassName("ut-tile-transfer-market"), 4);
            searchTransfer.Click();
            Thread.Sleep(1000);
            var clearParents = driver.FindElements(By.ClassName("search-price-header"), 5);
            foreach (var clearParent in clearParents)
                clearParent.FindElement(By.ClassName("flat")).Click();
        }

        public static void OpenTransferTargets(this IWebDriver driver, EaAccount eaAccount)
        {
            driver.GoToTransferMenu(eaAccount);
            var transferTargets = driver.FindElement(By.ClassName("ut-tile-transfer-targets"), 3);
            transferTargets.Click();
        }

        public static void OpenTransferList(this IWebDriver driver, EaAccount eaAccount)
        {
            driver.GoToTransferMenu(eaAccount);
            var transferTargets = driver.FindElement(By.ClassName("ut-tile-transfer-list"), 3);
            transferTargets.Click();
        }

        public static void GoToTransferMenu(this IWebDriver driver, EaAccount eaAccount)
        {
            driver.TryLogin(eaAccount);
            if (driver.Url != "https://www.ea.com/fifa/ultimate-team/web-app/")
            {
                driver.Navigate().GoToUrl("https://www.ea.com/fifa/ultimate-team/web-app/");
                Thread.Sleep(10000);
            }

            var transferMenu = driver.FindElement(By.ClassName("icon-transfer"), 10);
            transferMenu.Click();
            Thread.Sleep(1000);
        }

        public static void TryLogin(this IWebDriver driver, EaAccount eaAccount)
        {
            driver.Navigate().GoToUrl(@"https://www.ea.com/fifa/ultimate-team/web-app/");

            try
            {
                var startButton = driver.FindElement(By.ClassName("btn-standard"), 13);
                Thread.Sleep(3000);
                if (startButton == null)
                    return;
                startButton.Click();

                // Entering credentials
                driver.FindElement(By.Id("email"), 10).SendKeys(eaAccount.Username);
                driver.FindElement(By.Id("password")).SendKeys(eaAccount.Password);
                driver.FindElement(By.Id("btnLogin")).Click();
            }
            catch
            {
                return;
            }
        }
    }
}
