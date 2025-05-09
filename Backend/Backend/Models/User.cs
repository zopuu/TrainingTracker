using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
    public class User {
        [Key]
        public int Id { get; set; }
        [Required]public string Name { get; set; }
        [Required] public string Surname { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string PasswordHash { get; set; }

        private void Validate()
        {

        }

    }

