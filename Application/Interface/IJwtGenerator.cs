using Domain;

namespace Application.Interface
{
    public interface IJwtGenerator
    {
        string GenerateToken(AppUser appUser);
    }
}