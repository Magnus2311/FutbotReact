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

        public ChromeDriver Add(string username)
        {
            if (ChromeDrivers.ContainsKey(username)) return ChromeDrivers[username];

            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArguments("--disable-backgrounding-occluded-windows");
            chromeOptions.AddArgument(@$"user-data-dir={Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)}\Google\Chrome\User Data\{username.Split("@").FirstOrDefault()}\Default");

            var chromeDriver = new ChromeDriver(chromeOptions);
            if (ChromeDrivers.TryAdd(username, chromeDriver)) return chromeDriver;

            return null;
        }
    }
}
