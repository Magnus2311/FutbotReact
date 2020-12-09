using System.Linq;
using System.Threading;
using FutbotReact.Helpers.Enums;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace FutbotReact.Services.SeleniumServices
{
    public class SellingService
    {
        private readonly ChromeDriver _chromeDriver;

        public SellingService(ChromeDriver chromeDriver)
        {
            _chromeDriver = chromeDriver;
        }

        public void Sell(SellPlayerDTO sellPlayer)
        {
            _chromeDriver.OpenTransferTargets();

            var wonItemsGroup = _chromeDriver.FindElements(By.ClassName("sectioned-item-list"), 10).ToList()[2];
            var itemList = wonItemsGroup.FindElement(By.ClassName("itemList"));
            var players = itemList.FindElements(By.ClassName("listFUTItem"));

            foreach (var player in players)
            {
                if (player.FindElement(By.ClassName("name")).Text.ToUpper() != sellPlayer.Name.ToUpper()) continue;

                player.Click();
                var listOnTM = _chromeDriver.FindElementByClassName("accordian");
                listOnTM.Click();
                Thread.Sleep(450);

                var pricesInputs = _chromeDriver.FindElementsByClassName("numericInput");
                var bidPriceInput = pricesInputs.FirstOrDefault();
                var binPriceInput = pricesInputs.LastOrDefault();

                bidPriceInput.SendKeys(Keys.Backspace);
                bidPriceInput.SendKeys(Keys.Backspace);
                bidPriceInput.SendKeys(Keys.Backspace);
                bidPriceInput.SendKeys(Keys.Backspace);
                bidPriceInput.SendKeys(Keys.Backspace);
                bidPriceInput.SendKeys(Keys.Backspace);
                bidPriceInput.SendKeys(Keys.Backspace);
                bidPriceInput.SendKeys(Keys.Backspace);
                bidPriceInput.SendKeys(sellPlayer.BidPrice.ToString());

                binPriceInput.SendKeys(Keys.Backspace);
                binPriceInput.SendKeys(Keys.Backspace);
                binPriceInput.SendKeys(Keys.Backspace);
                binPriceInput.SendKeys(Keys.Backspace);
                binPriceInput.SendKeys(Keys.Backspace);
                binPriceInput.SendKeys(Keys.Backspace);
                binPriceInput.SendKeys(Keys.Backspace);
                binPriceInput.SendKeys(Keys.Backspace);
                binPriceInput.SendKeys(sellPlayer.BinPrice.ToString());

                var durationCombo = _chromeDriver.FindElementByClassName("ut-drop-down-control");
                durationCombo.Click();
                Thread.Sleep(654);

                var durationOptions = durationCombo.FindElements(By.CssSelector("li"));

                switch (sellPlayer.SellDuration)
                {
                    case SellDuration.OneHour:
                        durationOptions[0].Click();
                        break;
                    case SellDuration.ThreeHours:
                        durationOptions[1].Click();
                        break;
                    case SellDuration.SixHours:
                        durationOptions[2].Click();
                        break;
                    case SellDuration.TwelveHours:
                        durationOptions[3].Click();
                        break;
                    case SellDuration.OneDay:
                        durationOptions[4].Click();
                        break;
                    case SellDuration.ThreeDays:
                        durationOptions[5].Click();
                        break;
                }

                _chromeDriver.FindElementByClassName("panelActions").FindElement(By.ClassName("call-to-action")).Click();

                Thread.Sleep(1850);
            }
        }
    }
}