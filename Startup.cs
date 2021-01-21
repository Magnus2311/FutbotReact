using System.Threading.Tasks;
using FutbotReact.Services.DbServices;
using FutbotReact.Services.ScheduledServices;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using utbotReact.Services;

namespace FutbotReact
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(option =>
                {
                    option.SlidingExpiration = true;
                });

            services.AddControllersWithViews();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddTransient<UsersDbService>();
            services.AddTransient<HashPassword>();
            services.AddTransient<ConfigureDb>();
            services.AddTransient<LoggerDbService>();
            services.AddTransient<ActivePlayersDbService>();
            services.AddTransient<RebidPlayerService>();
            services.AddTransient<RolesDbService>();
        }

        public void Configure(IApplicationBuilder app,
            IWebHostEnvironment env,
            ConfigureDb configureDb,
            LoggerDbService logger,
            RebidPlayerService rebidService)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseExceptionHandler(ex => ex.Run(async context =>
            {
                var exception = context.Features.Get<IExceptionHandlerFeature>().Error;
                await logger.Log(exception);
            }));

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                        ForwardedHeaders.XForwardedProto
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            app.UseCors(
                options => options.WithOrigins("https://localhost:44312/", "https://localhost:5001/").AllowAnyMethod()
            );

            configureDb.Start();
            Task.Run(() => rebidService.StartAsync(new System.Threading.CancellationToken()));
        }
    }
}
