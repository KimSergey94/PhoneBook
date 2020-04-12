using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneBook.Models.EF
{
    public class Contact
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }

        [MaxLength(20)]
        public string Patronymic { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        public virtual ICollection<PhoneNumber> PhoneNumber { get; set; }
        public virtual ICollection<Note> Note { get; set; }
    }
}