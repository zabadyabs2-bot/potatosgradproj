
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineMedicalSystem.Data;
using OnlineMedicalSystem.Models;
using System.Security.Claims;

using Microsoft.AspNetCore.Mvc;
using OnlineMedicalSystem.Data;
using OnlineMedicalSystem.Models;


namespace OnlineMedicalSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrescriptionsController : ControllerBase
{
    private readonly AppDbContext _context;
    public PrescriptionsController(AppDbContext context) => _context = context;


    [Authorize(Roles = "Doctor")]

    [HttpPost]
    public async Task<IActionResult> Create(Prescription prescription)
    {
        _context.Prescriptions.Add(prescription);
        await _context.SaveChangesAsync();
        return Ok(prescription);
    }

    
    [HttpGet("my-prescription")]
    public async Task<IActionResult> GetMyPrescription()
    {
        var patientId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var prescription = await _context.Prescriptions
            .Where(a => a.Appointment.PatientId == patientId)
            .Include(a => a.Appointment)
            .Select(a => new
            {
                a.Id,
                a.Medicine,
                a.Remark,
                a.Advice,
                a.AppointmentId,
                
            })
            .ToListAsync();

        return Ok(prescription);
    }




}