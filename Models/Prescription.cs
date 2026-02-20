namespace OnlineMedicalSystem.Models;
public class Prescription
{
    public int Id { get; set; }
    public int AppointmentId { get; set; }

    public Appointment? Appointment { get; set; }

    public string Medicine { get; set; } = string.Empty;
    public string Remark { get; set; } = string.Empty;
    public string Advice { get; set; } = string.Empty;
}