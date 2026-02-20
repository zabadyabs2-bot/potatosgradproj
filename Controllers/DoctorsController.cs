using Microsoft.AspNetCore.Mvc;
using OnlineMedicalSystem.Data;
using Microsoft.EntityFrameworkCore;
using OnlineMedicalSystem.Models;
using Microsoft.AspNetCore.Authorization;

namespace OnlineMedicalSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly AppDbContext _context;
    public DoctorsController(AppDbContext context) => _context = context;

    [HttpGet]
    public IActionResult GetDoctors()
    { 
        var data =  _context.Doctors.ToList();
        return Ok(data);
    }
   [HttpPost]
    public IActionResult CreateDoctor([FromBody] Doctor doctor)
    {
        if (doctor == null)
            return BadRequest();

        _context.Doctors.Add(doctor);
        _context.SaveChanges();

        return Ok(doctor);
    }
    [Authorize(Roles = "Doctor")]
    [HttpDelete("{id}")]
    public IActionResult DeleteDoctor(int id)
    {
        var doctor = _context.Doctors.Find(id);
        if (doctor == null)
            return NotFound();

        _context.Doctors.Remove(doctor);
        _context.SaveChanges();

        return NoContent();
    }

    [Authorize(Roles = "Doctor")]
    [HttpPut("{id}")]
    public IActionResult UpdateDoctor(int id, [FromBody] Doctor updatedDoctor)
    {
        if (id != updatedDoctor.Id)
            return BadRequest("ID mismatch");

        var doctor = _context.Doctors.Find(id);
        if (doctor == null)
            return NotFound();

        doctor.Name = updatedDoctor.Name;
        doctor.Email = updatedDoctor.Email;
        doctor.Phone = updatedDoctor.Phone;
       

        _context.SaveChanges();

        return Ok(doctor);
    }
}