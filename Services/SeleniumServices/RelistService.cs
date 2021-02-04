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

        public void RelistAll(EaAccount eaAccount)
        {
            _chromeDriver.OpenTransferList(eaAccount);
            var relistBtn = _chromeDriver.FindElement(By.XPath("//*[contains(text(), 'Re-list All')]"), 5);
            relistBtn.Click();
            var msgBox = _chromeDriver.FindElement(By.ClassName("dialog-body"), 10);
            var yesBtn = msgBox.FindElements(By.ClassName("btn-text")).FirstOrDefault(e => e.Text.ToUpper() == "YES");
            yesBtn.Click();
        }

        public void RelistPlayer(SellPlayerDTO sellPlayerDTO, EaAccount eaAccount)
        {
            _chromeDriver.OpenTransferList(eaAccount);

            ListPlayer(sellPlayerDTO);
        }

        private void ListPlayer(SellPlayerDTO sellPlayerDTO)
        {
            try
            {
                Thread.Sleep(3000);
                var a = _chromeDriver.FindElements(By.ClassName("sectioned-item-list"))[2];
                var b = a.FindElement(By.XPath("./.."));
                var newItems = b.FindElements(By.ClassName("listFUTItem"));
                if (newItems?.Count > 0)
                    foreach (var player in newItems)
                        _playersHelper.SellPlayer(player, sellPlayerDTO);
                else
                {
                    _chromeDriver.OpenTransferTargets(new EaAccount { Username = sellPlayerDTO.Username });
                    Thread.Sleep(3000);
                    var expiredItems = _chromeDriver.FindElements(By.ClassName("expired"));
                    if (expiredItems.Count == 0) return;
                    foreach (var player in expiredItems)
                        _playersHelper.SellPlayer(player, sellPlayerDTO);
                }
            }
            catch (Exception ex)
            {
                ListPlayer(sellPlayerDTO);
            }
        }
    }
}