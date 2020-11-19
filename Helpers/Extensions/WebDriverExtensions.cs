﻿using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

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
    }
}
