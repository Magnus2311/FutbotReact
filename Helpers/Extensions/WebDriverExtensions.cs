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

        public static void OpenSearchTransferMarket(this IWebDriver driver)
        {
            driver.GoToTransferMenu();
            var searchTransfer = driver.FindElement(By.ClassName("ut-tile-transfer-market"), 4);
            searchTransfer.Click();
            Thread.Sleep(1000);
        }

        public static void OpenTransferTargets(this IWebDriver driver)
        {
            driver.GoToTransferMenu();
            var transferTargets = driver.FindElement(By.ClassName("ut-tile-transfer-targets"), 3);
            transferTargets.Click();
        }

        public static void OpenTransferList(this IWebDriver driver)
        {
            driver.GoToTransferMenu();
            var transferTargets = driver.FindElement(By.ClassName("ut-tile-transfer-list"), 3);
            transferTargets.Click();
        }

        public static void GoToTransferMenu(this IWebDriver driver)
        {
            if (driver.Url != "https://www.ea.com/fifa/ultimate-team/web-app/")
            {
                driver.Navigate().GoToUrl("https://www.ea.com/fifa/ultimate-team/web-app/");
                Thread.Sleep(10000);
            }

            var transferMenu = driver.FindElement(By.ClassName("icon-transfer"), 10);
            transferMenu.Click();
            Thread.Sleep(1000);
        }
    }
}
