using System;
using System.Linq;
using System.Threading;
using FutbotReact.Helpers.Enums;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models;
using FutbotReact.Services.SeleniumServices.Helpers;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace FutbotReact.Services.SeleniumServices
{
    public class SellingService
    {
        private readonly ChromeDriver _chromeDriver;
        private readonly PlayersHelper _playersHelper;

        public SellingService(ChromeDriver chromeDriver)
        {
            _chromeDriver = chromeDriver;
            _playersHelper = new PlayersHelper(_chromeDriver);
        }

        public void Sell(SellPlayerDTO sellPlayerDTO, EaAccount eaAccount)
        {
            _chromeDriver.OpenTransferTargets(eaAccount);

            var wonItemsGroup = _chromeDriver.FindElements(By.ClassName("sectioned-item-list"), 10).ToList()[2];
            var itemList = wonItemsGroup.FindElement(By.ClassName("itemList"));
            var players = itemList.FindElements(By.ClassName("listFUTItem"));

            try
            {
                foreach (var player in players)
                    _playersHelper.SellPlayer(player, sellPlayerDTO);
            }
            catch (Exception)
            {
                Sell(sellPlayerDTO, eaAccount);
            }
        }
    }
}