using System.Linq;
using OpenQA.Selenium.Chrome;
using System.Collections.Concurrent;

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
            var chromeOptions = new ChromeOptions();
            var a = @$"user-data-dir=C:\Users\yavor.orlyov\AppData\Local\Google\Chrome\User Data\{username}\Default";
            chromeOptions.AddArgument(a);
            return ChromeDrivers.TryAdd(username, new ChromeDriver(chromeOptions));
        }
    }
}
