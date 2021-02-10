using System;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.DTOs;
using FutbotReact.Services.SeleniumServices.Helpers;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using FutbotReact.Models;

namespace FutbotReact.Services.SeleniumServices
{
    public class BidService
    {
        private int _currentPlayersBidded;
        private readonly ChromeDriver _chromeDriver;
        private readonly ClearTargetList _clearTargetList;
        private readonly PlayersHelper _playersHelper;

        public BidService(ChromeDriver chromeDriver)
        {
            _chromeDriver = chromeDriver;
            _clearTargetList = new ClearTargetList();
            _playersHelper = new PlayersHelper(_chromeDriver);
        }

        public void BidPlayer(BidPlayerDTO bidPlayerDTO, EaAccount eaAccount)
        {
            _chromeDriver.OpenSearchTransferMarket(eaAccount);

            var nameInput = _chromeDriver.FindElement(By.ClassName("ut-text-input-control"), 3);
            nameInput.SendKeys(bidPlayerDTO.Name);
            Thread.Sleep(500);
            var searchedPlayers = _chromeDriver.FindElementByClassName("playerResultsList").FindElements(By.CssSelector("button"));
            var selectPlayer = searchedPlayers.FirstOrDefault(p => p.FindElement(By.CssSelector(".btn-subtext")).Text == bidPlayerDTO.Rating.ToString());
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
                players = _playersHelper.InitPlayers();
            }
            while (PlaceBid(players, bidPlayerDTO, eaAccount));

            do
            {
                players = _playersHelper.InitTargetListOutbidBidPlayers();
            }
            while (PlaceBidActivePlayers(players, bidPlayerDTO));
        }

        private bool PlaceBid(List<IWebElement> players, BidPlayerDTO bidPlayerDTO, EaAccount eaAccount)
        {
            try
            {
                foreach (var player in players)
                {
                    var transferListFullElements = _chromeDriver.FindElementsByClassName("ui-dialog-type-alert");
                    if (transferListFullElements.Count > 0)
                    {
                        var transferListFullWindow = transferListFullElements.FirstOrDefault();
                        var okButton = transferListFullWindow.FindElement(By.ClassName("ut-button-group"));
                        Thread.Sleep(840);
                        okButton.Click();
                        Thread.Sleep(840);

                        if (_clearTargetList.TryClearTargetList(_chromeDriver, bidPlayerDTO, eaAccount))
                            BidPlayer(bidPlayerDTO, eaAccount);
                        return false;
                    }

                    var classes = player.GetAttribute("class").Split(" ").ToList();
                    if (classes.Contains("highest-bid"))
                    {
                        _currentPlayersBidded++;
                        continue;
                    }

                    player.Click();
                    var period = _chromeDriver.FindElementByClassName("subContent").Text;
                    var isPeriodTooLong = period.Contains("Hour") | period.Contains("Day");
                    if (isPeriodTooLong) return false;

                    int.TryParse(_chromeDriver.FindElementByClassName("auctionInfo").FindElement(By.ClassName("currency-coins")).Text, out int currentPrice);
                    if (currentPrice > bidPlayerDTO.MaxPrice)
                        continue;

                    // var inputPrice = _chromeDriver.FindElementByClassName("numericInput");
                    // inputPrice.Clear();
                    // inputPrice.SendKeys(Keys.Backspace);
                    // inputPrice.SendKeys(Keys.Backspace);
                    // inputPrice.SendKeys(Keys.Backspace);
                    // inputPrice.SendKeys(Keys.Backspace);
                    // inputPrice.SendKeys(Keys.Backspace);
                    // inputPrice.SendKeys(Keys.Backspace);
                    // inputPrice.SendKeys(Keys.Backspace);
                    // inputPrice.SendKeys(bidPlayerDTO.MaxPrice.ToString());
                    var bidButton = _chromeDriver.FindElementByClassName("bidButton");
                    if (_currentPlayersBidded >= bidPlayerDTO.MaxActiveBids)
                        return false;

                    _currentPlayersBidded++;
                    bidButton.Click();
                    Thread.Sleep(2000);
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
            catch
            {
                players = _playersHelper.InitPlayers();
                PlaceBid(players, bidPlayerDTO, eaAccount);
                return true;
            }
        }

        public bool PlaceBidActivePlayers(List<IWebElement> players, BidPlayerDTO bidPlayerDTO)
        {
            if (!players.Any()) return false;

            try
            {
                foreach (var player in players.Where(p => p.GetAttribute("class").Split(" ").Contains("outbid")))
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
                            _chromeDriver.FindElement(By.ClassName("watch"), 5).Click();
                        else
                            _chromeDriver.FindElement(By.ClassName("bidButton"), 5).Click();
                    }
                    Thread.Sleep(1734);
                }
            }
            catch
            {
                players = _playersHelper.InitTargetListOutbidBidPlayers();
                PlaceBidActivePlayers(players, bidPlayerDTO);
            }

            return true;
        }
    }
}
