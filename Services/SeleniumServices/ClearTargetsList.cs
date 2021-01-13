using FutbotReact.Helpers.Extensions;
using FutbotReact.Models;
using FutbotReact.Models.DTOs;
using FutbotReact.Services.SeleniumServices.Helpers;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace FutbotReact.Services.SeleniumServices
{
    public class ClearTargetList
    {
        private PlayersHelper _playersHelper;

        public bool TryClearTargetList(ChromeDriver driver, BidPlayerDTO bidPlayerDTO, EaAccount eaAccount)
        {
            _playersHelper = new PlayersHelper(driver);

            try
            {
                driver.OpenTransferTargets(eaAccount);
                var clearExpired = driver.FindElement(By.XPath("//*[contains(text(), 'Clear Expired')]"), 5);
                clearExpired.Click();
                UnwatchOverpricedPlayers(bidPlayerDTO);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public void UnwatchOverpricedPlayers(BidPlayerDTO bidPlayerDTO)
        {
            var players = _playersHelper.InitTargetListOutbidBidPlayers();
            _playersHelper.ClearOverPricedPlayers(players, bidPlayerDTO);
        }
    }
}