using Microsoft.EntityFrameworkCore;
using PlannerApp.Models;

namespace PlannerApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Responsible> Responsibles { get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<MeetingAttendee> Attendees { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestMessage> RequestMessages { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<MeetingAttendee>().HasOne(e => e.Employee).WithMany()
        }
    }
}