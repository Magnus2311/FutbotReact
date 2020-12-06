using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.DTOs;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FutbotReact.Services.SeleniumServices
{
    public class BidService
    {
        private readonly ChromeDriver _chromeDriver;

        public BidService(ChromeDriver chromeDriver)
        {
            _chromeDriver = chromeDriver;
        }

        public void BidPlayer(BidPlayerDTO bidPlayerDTO)
        {
            var transferMenu = _chromeDriver.FindElementByClassName("icon-transfer");
            transferMenu.Click();
            Thread.Sleep(1000);
            var searchTransfer = _chromeDriver.FindElement(By.ClassName("ut-tile-transfer-market"), 4);
            searchTransfer.Click();
            Thread.Sleep(1000);
            var nameInput = _chromeDriver.FindElement(By.ClassName("ut-text-input-control"), 3);
            nameInput.SendKeys(bidPlayerDTO.Name);
            Thread.Sleep(1000);
            var priceElements = _chromeDriver.FindElementsByClassName("numericInput");
            var maxBidPriceElement = priceElements[1];
            maxBidPriceElement.SendKeys(bidPlayerDTO.MaxPrice.ToString());
            Thread.Sleep(1000);
            var searchButton = _chromeDriver.FindElementByClassName("call-to-action");
            searchButton.Click();

            List<IWebElement> players;
            do
            {
                players = _chromeDriver.FindElementsByClassName("listFUTItem").ToList();
            }
            while (PlaceBid(players, bidPlayerDTO));
        }

        private bool PlaceBid(List<IWebElement> players, BidPlayerDTO bidPlayerDTO)
        {
            foreach (var player in players)
            {
                player.Click();
                var isPeriodTooLong = !_chromeDriver.FindElementByClassName("subContent").Text.Contains("Hour");
                if (isPeriodTooLong) return false;

                int.TryParse(_chromeDriver.FindElementByClassName("currency-coins").Text, out int currentPrice);
                if (currentPrice > bidPlayerDTO.MaxPrice)
                    continue;

                var inputPrice = _chromeDriver.FindElementByClassName("numericInput");
                inputPrice.SendKeys(bidPlayerDTO.MaxPrice.ToString());
                var bidButton = _chromeDriver.FindElementByClassName("bidButton");
                bidButton.Click();
                Thread.Sleep(1000);
            }

            try
            {
                var nextPage = _chromeDriver.FindElement(By.ClassName("next"));
                nextPage.Click();
                Thread.Sleep(3000);
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
