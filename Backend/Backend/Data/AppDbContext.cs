using Backend.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend.Data {
    public class AppDbContext : DbContext {
        public AppDbContext(DbContextOptions options) : base(options) { }
        public DbSet<TrainingRecord> TrainingRecords => Set<TrainingRecord>();
        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder b)
        {
            b.Entity<TrainingRecord>()
                .Property(t => t.TrainingType)
                .HasConversion<string>();

            base.OnModelCreating(b);
        }
    }
}
