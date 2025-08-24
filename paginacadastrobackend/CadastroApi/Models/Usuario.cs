using System.ComponentModel.DataAnnotations;

namespace CadastroApi.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string Telefone { get; set; }

        //data nascimento 
        //data cadastro

        public DateTime? DataNascimento { get; set; }

        public DateTime? DataCadastro { get; set; } = DateTime.Now;
    }

}