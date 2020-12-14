using FutbotReact.Helpers.Extensions;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace FutbotReact.Services.SeleniumServices
{
    public class ClearTargetList
    {
        public bool TryClearTargetList(ChromeDriver driver)
        {
            try
            {
                driver.OpenTransferTargets();
                var clearExpired = driver.FindElement(By.XPath("//*[contains(text(), 'Clear Expired')]"), 5);
                clearExpired.Click();
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}