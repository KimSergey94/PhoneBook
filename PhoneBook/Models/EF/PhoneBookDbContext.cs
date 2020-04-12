using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace PhoneBook.Models.EF
{
    public class PhoneBookDbContext : DbContext
    {
        public PhoneBookDbContext() : base("name = PhoneBookDbContext")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        static PhoneBookDbContext()
        {
            Database.SetInitializer<PhoneBookDbContext>(new PhoneBookDbInitializer());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<PhoneNumber> PhoneNumbers { get; set; }
        public DbSet<Note> Notes { get; set; }
    }

    public class PhoneBookDbInitializer : DropCreateDatabaseAlways<PhoneBookDbContext>
    {
        protected override void Seed(PhoneBookDbContext context)
        {
            Contact contact1 = new Contact();
            contact1.Email = "aasd@anasd.er";
            contact1.FirstName = "aaer";
            contact1.LastName = "aaer";
            contact1.Patronymic = "asder";
            Contact contact2 = new Contact();
            contact2.Email = "test@test.com";
            contact2.FirstName = "testName";
            contact2.LastName = "testSurname";
            contact2.Patronymic = "testPatro";

            PhoneNumber phoneNumber1 = new PhoneNumber();
            phoneNumber1.ContactId = 1;
            phoneNumber1.Number = "9379992";
            PhoneNumber phoneNumber2 = new PhoneNumber();
            phoneNumber2.ContactId = 1;
            phoneNumber2.Number = "9366692";

            Note note1 = new Note();
            note1.ContactId = 1;
            note1.NoteText = "testData";
            Note note2 = new Note();
            note2.ContactId = 1;
            note2.NoteText = "testData2";

            context.Contacts.Add(contact1);
            context.Contacts.Add(contact2);
            context.PhoneNumbers.Add(phoneNumber1);
            context.PhoneNumbers.Add(phoneNumber2);
            context.Notes.Add(note1);
            context.Notes.Add(note2);
            context.SaveChanges();

            base.Seed(context);
        }
    }

}