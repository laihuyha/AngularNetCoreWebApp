using System.ComponentModel.DataAnnotations;

namespace API.DTOs.RequestDTO
{
    public class RegisterDto
    {
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string UserName { get; set; }
        [Required]
        [RegularExpression("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}", ErrorMessage = "Password must have 1 Uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 8 characters")]
        public string Password { get; set; }
    }
}