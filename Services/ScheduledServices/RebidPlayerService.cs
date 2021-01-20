using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models.DTOs;
using FutbotReact.Services.DbServices;
using FutbotReact.Services.SeleniumServices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenQA.Selenium;

namespace FutbotReact.Services.ScheduledServices
{
    public class RebidPlayerService : IHostedService, IDisposable
    {
        private readonly IServiceScopeFactory _serviceFactory;
        private Timer _timer;

        public RebidPlayerService(IServiceScopeFactory serviceFactory)
        {
            _serviceFactory = serviceFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceFactory.CreateScope();
            var logger = scope.ServiceProvider.GetService<LoggerDbService>();
            logger.Log("Started rebid player scheduler");

            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(5));

            return Task.CompletedTask;
        }

        public async void DoWork(object state)
        {
            using var scope = _serviceFactory.CreateScope();
            var logger = scope.ServiceProvider.GetService<LoggerDbService>();
            try
            {
                logger.Log("Rebid player scheduler is working");

                var addedEaAccounts = (await scope.ServiceProvider.GetService<UsersDbService>().GetAll()).Where(u => u.EaAccounts.Count > 0).SelectMany(u => u.EaAccounts);
                foreach (var eaAccount in addedEaAccounts)
                {
                    var chromeDriver = ChromeInstances.Instance.Add(eaAccount.Username);
                    var playersToBid = scope.ServiceProvider.GetService<ActivePlayersDbService>().GetActivePlayersToBuy(eaAccount.Username);
                    foreach (var player in playersToBid)
                    {
                        new BidService(chromeDriver).BidPlayer(new BidPlayerDTO
                        {
                            Username = eaAccount.Username,
                            Name = player.Name,
                            IsBin = player.IsBin,
                            MaxActiveBids = player.MaxActiveBids,
                            Rating = player.Rating,
                            MaxPrice = player.MaxPrice
                        }, eaAccount);
                    }
                }
            }
            catch (Exception ex)
            {
                await logger.Log(ex);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceFactory.CreateScope();
            var logger = scope.ServiceProvider.GetService<LoggerDbService>();
            logger.Log("Rebid player scheduler is stopping");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}