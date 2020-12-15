using System;
using System.Linq;
using System.Threading;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models;
using FutbotReact.Services.SeleniumServices.Helpers;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace FutbotReact.Services.SeleniumServices
{
    public class RelistService
    {
        private readonly ChromeDriver _chromeDriver;
        private readonly PlayersHelper _playersHelper;

        public RelistService(ChromeDriver chromeDriver)
        {
            _chromeDriver = chromeDriver;
            _playersHelper = new PlayersHelper(_chromeDriver);
        }

        public void RelistAll()
        {
            _chromeDriver.OpenTransferList();
            var relistBtn = _chromeDriver.FindElement(By.XPath("//*[contains(text(), 'Re-list All')]"), 5);
            relistBtn.Click();
            var msgBox = _chromeDriver.FindElement(By.ClassName("dialog-body"), 10);
            var yesBtn = msgBox.FindElements(By.ClassName("btn-text")).FirstOrDefault(e => e.Text.ToUpper() == "YES");
            yesBtn.Click();
        }

        public void RelistPlayer(SellPlayerDTO sellPlayerDTO)
        {
            _chromeDriver.OpenTransferList();

            ListPlayer(sellPlayerDTO);
        }

        private void ListPlayer(SellPlayerDTO sellPlayerDTO)
        {
            try
            {
                var expiredItems = _chromeDriver.FindElements(By.ClassName("expired"));
                if (expiredItems.Count == 0) return;

                var player = expiredItems.FirstOrDefault();
                _playersHelper.SellPlayer(player, sellPlayerDTO);
                ListPlayer(sellPlayerDTO);
            }
            catch
            {
                ListPlayer(sellPlayerDTO);
            }
        }
    }
}