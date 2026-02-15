namespace OnlineMedicalSystem.Models;
public class Prescription
{
    public int Id { get; set; }
    public int AppointmentId { get; set; }
<<<<<<< HEAD
    public Appointment? Appointment { get; set; }
=======
>>>>>>> b2704bc6d18ccaa3f15d790767d00a8b9a23e467
    public string Medicine { get; set; } = string.Empty;
    public string Remark { get; set; } = string.Empty;
    public string Advice { get; set; } = string.Empty;
}