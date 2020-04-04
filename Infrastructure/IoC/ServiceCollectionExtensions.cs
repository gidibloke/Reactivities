using Application.Interfaces;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.IoC
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ServicesCollection(this IServiceCollection services)
        {
            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            return services;
        }
    }
}