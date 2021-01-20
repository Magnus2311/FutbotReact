using System.Threading;
using System.Collections.Generic;
using System.Linq;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using FutbotReact.Models.DTOs;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models;
using FutbotReact.Helpers.Enums;

namespace FutbotReact.Services.SeleniumServices.Helpers
{
    public class PlayersHelper
    {
        private readonly ChromeDriver _chromeDriver;

        public PlayersHelper(ChromeDriver chromeDriver)
            => _chromeDriver = chromeDriver;

        public List<IWebElement> InitPlayers()
            => _chromeDriver.FindElementsByClassName("listFUTItem").ToList();

        public List<IWebElement> InitTargetListOutbidBidPlayers()
        {
            var activeBids = _chromeDriver.FindElements(By.ClassName("sectioned-item-list"), 10).FirstOrDefault();
            var itemList = activeBids?.FindElement(By.ClassName("itemList"));
            return new List<IWebElement>(itemList.FindElements(By.ClassName("listFUTItem")));
        }

        public void ClearOverPricedPlayers(List<IWebElement> players, BidPlayerDTO bidPlayerDTO)
        {
            foreach (var player in players)
            {
                player.Click();
                var classes = player.GetAttribute("class").Split(" ").ToList();
                if (classes.Contains("outbid"))
                {
                    Thread.Sleep(500);
                    var auctionInfo = _chromeDriver.FindElement(By.ClassName("currentBid"));
                    var currentValueStr = auctionInfo.FindElement(By.ClassName("currency-coins")).Text;
                    int.TryParse(currentValueStr, out var currentValue);

                    if (currentValue >= bidPlayerDTO.MaxPrice)
                        auctionInfo.FindElement(By.ClassName("watch")).Click();
                }
            }
        }

        public void SellPlayer(IWebElement player, SellPlayerDTO sellPlayerDTO)
        {
            if (player.FindElement(By.ClassName("name")).Text.ToUpper() != sellPlayerDTO.Name.ToUpper()) return;

            player.Click();
            var listOnTM = _chromeDriver.FindElementByClassName("accordian");
            listOnTM.Click();
            Thread.Sleep(450);

            var pricesInputs = _chromeDriver.FindElementsByClassName("numericInput");
            var bidPriceInput = pricesInputs.FirstOrDefault();
            var binPriceInput = pricesInputs.LastOrDefault();

            try
            {
                bidPriceInput.SendKeys(Keys.Backspace);
            }
            catch
            {
                Thread.Sleep(3000);
                bidPriceInput.SendKeys(Keys.Backspace);
            }
            bidPriceInput.SendKeys(Keys.Backspace);
            bidPriceInput.SendKeys(Keys.Backspace);
            bidPriceInput.SendKeys(Keys.Backspace);
            bidPriceInput.SendKeys(Keys.Backspace);
            bidPriceInput.SendKeys(Keys.Backspace);
            bidPriceInput.SendKeys(Keys.Backspace);
            bidPriceInput.SendKeys(Keys.Backspace);
            bidPriceInput.SendKeys(sellPlayerDTO.BidPrice.ToString());

            binPriceInput.SendKeys(Keys.Backspace);
            binPriceInput.SendKeys(Keys.Backspace);
            binPriceInput.SendKeys(Keys.Backspace);
            binPriceInput.SendKeys(Keys.Backspace);
            binPriceInput.SendKeys(Keys.Backspace);
            binPriceInput.SendKeys(Keys.Backspace);
            binPriceInput.SendKeys(Keys.Backspace);
            binPriceInput.SendKeys(Keys.Backspace);
            binPriceInput.SendKeys(sellPlayerDTO.BinPrice.ToString());

            var durationCombo = _chromeDriver.FindElementByClassName("ut-drop-down-control");
            durationCombo.Click();
            Thread.Sleep(654);

            var durationOptions = durationCombo.FindElements(By.CssSelector("li"));
            durationOptions[sellPlayerDTO.Duration].Click();

            _chromeDriver.FindElementByClassName("panelActions").FindElement(By.ClassName("call-to-action")).Click();

            Thread.Sleep(1850);
        }
    }
}