namespace OnlineMedicalSystem.Models;
public class Appointment
{
    public int Id { get; set; }
    public int DoctorId { get; set; }
    public int PatientId { get; set; }
<<<<<<< HEAD
    public Patient? Patient { get; set; }
    public Doctor? Doctor { get; set; }
=======
>>>>>>> b2704bc6d18ccaa3f15d790767d00a8b9a23e467
    public DateTime AppointmentDate { get; set; }
    public string Status { get; set; } = "Pending";
}