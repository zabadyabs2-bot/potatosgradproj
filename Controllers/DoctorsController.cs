using Microsoft.AspNetCore.Mvc;
using OnlineMedicalSystem.Data;
using Microsoft.EntityFrameworkCore;
using OnlineMedicalSystem.Models;

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
}