using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AnonymousUser> AnonymousUsers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Newsletter> Newsletters { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<Reply> Replies { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Post>()
                   .HasIndex(u => u.Slug)
                   .IsUnique();

            builder.Entity<Category>()
                   .HasIndex(x => x.Code)
                   .IsUnique();

            builder.Entity<AnonymousUser>()
                   .HasIndex(x => x.Fingerprint)
                   .IsUnique();
        }
    }
}