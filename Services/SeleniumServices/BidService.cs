using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.DTOs;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

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
            _chromeDriver.OpenSearchTransferMarket();

            var nameInput = _chromeDriver.FindElement(By.ClassName("ut-text-input-control"), 3);
            nameInput.SendKeys(bidPlayerDTO.Name);
            Thread.Sleep(500);
            var selectPlayer = _chromeDriver.FindElementByClassName("playerResultsList").FindElement(By.CssSelector("button"));
            selectPlayer.Click();
            Thread.Sleep(1000);
            var priceElements = _chromeDriver.FindElementsByClassName("numericInput");
            var maxBidPriceElement = priceElements[1];
            maxBidPriceElement.Clear();
            maxBidPriceElement.SendKeys(bidPlayerDTO.MaxPrice.ToString());
            Thread.Sleep(1000);
            var searchButton = _chromeDriver.FindElementByClassName("call-to-action");
            searchButton.Click();
            Thread.Sleep(4000);

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
                var classes = player.GetAttribute("class").Split(" ").ToList();
                if (classes.Contains("highest-bid")) continue;

                player.Click();
                var period = _chromeDriver.FindElementByClassName("subContent").Text;
                var isPeriodTooLong = period.Contains("Hour");
                if (isPeriodTooLong) return false;

                int.TryParse(_chromeDriver.FindElementByClassName("currency-coins").Text, out int currentPrice);
                if (currentPrice > bidPlayerDTO.MaxPrice)
                    continue;

                var inputPrice = _chromeDriver.FindElementByClassName("numericInput");
                inputPrice.Clear();
                inputPrice.SendKeys(Keys.Backspace);
                inputPrice.SendKeys(Keys.Backspace);
                inputPrice.SendKeys(Keys.Backspace);
                inputPrice.SendKeys(Keys.Backspace);
                inputPrice.SendKeys(Keys.Backspace);
                inputPrice.SendKeys(Keys.Backspace);
                inputPrice.SendKeys(Keys.Backspace);
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
