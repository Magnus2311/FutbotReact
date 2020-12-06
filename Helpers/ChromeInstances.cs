using System.Linq;
using OpenQA.Selenium.Chrome;
using System.Collections.Concurrent;
using System;

namespace FutbotReact.Helpers
{
    public sealed class ChromeInstances
    {
        public ConcurrentDictionary<string, ChromeDriver> ChromeDrivers { get; } = new ConcurrentDictionary<string, ChromeDriver>();
        public static ChromeInstances Instance { get; private set; } = new ChromeInstances();

        private ChromeInstances()
        {
        }

        public bool Add(string username)
        {
            if (ChromeDrivers.ContainsKey(username)) return true;

            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArguments("--disable-backgrounding-occluded-windows");
            var a = @$"user-data-dir={Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)}\Google\Chrome\User Data\{username.Split("@").FirstOrDefault()}\Default";
            chromeOptions.AddArgument(a);
            return ChromeDrivers.TryAdd(username, new ChromeDriver(chromeOptions));
        }
    }
}
