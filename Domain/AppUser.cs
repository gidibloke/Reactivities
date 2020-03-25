using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
namespace Domain
{
    // ReSharper disable once ClassWithVirtualMembersNeverInherited.Global
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; }
    }
}