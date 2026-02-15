<<<<<<< HEAD
﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineMedicalSystem.Data;
using System.Security.Claims;

namespace OnlineMedicalSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PatientController : Controller
    {
        private readonly AppDbContext _context;
        public PatientController(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [Authorize(Roles = "Doctor")]
        [HttpGet("my-patients")]
        public async Task<IActionResult> GetMyPatients()
        {
            var doctorId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var patients = await _context.Appointments
                .Where(a => a.DoctorId == doctorId)
                .Include(a => a.Patient)
                .Select(a => new
                {
                    a.Patient.Id,
                    a.Patient.Name,
                    a.Patient.Phone,
                    a.Patient.Email,
                    a.AppointmentDate,
                    a.Status
                })
                .ToListAsync();

            return Ok(patients);
        }

=======
﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OnlineMedicalSystem.Controllers
{
    public class PatientController : Controller
    {
       

        
>>>>>>> b2704bc6d18ccaa3f15d790767d00a8b9a23e467
    }
}
