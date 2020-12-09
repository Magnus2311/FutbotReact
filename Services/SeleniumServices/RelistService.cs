using System.Linq;
using FutbotReact.Helpers.Extensions;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace FutbotReact.Services.SeleniumServices
{
    public class RelistService
    {
        private readonly ChromeDriver _chromeDriver;

        public RelistService(ChromeDriver chromeDriver)
            => _chromeDriver = chromeDriver;

        public void RelistAll()
        {
            _chromeDriver.OpenTransferList();
            var relistBtn = _chromeDriver.FindElement(By.XPath("//*[contains(text(), 'Re-list All')]"), 5);
            relistBtn.Click();
            var msgBox = _chromeDriver.FindElement(By.ClassName("dialog-body"), 10);
            var yesBtn = msgBox.FindElements(By.ClassName("btn-text")).FirstOrDefault(e => e.Text.ToUpper() == "YES");
            yesBtn.Click();
        }
    }
}