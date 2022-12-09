using Core.Models.Identity;

namespace Core.Interfaces
{
    public interface ITokenServices
    {
        public string CreateToken(AppUser user);
    }
}