using Microsoft.AspNetCore.Mvc;
using OnlineMedicalSystem.Data;
using OnlineMedicalSystem.Models;

namespace OnlineMedicalSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly AppDbContext _context;
    public PaymentsController(AppDbContext context) => _context = context;

    [HttpPost]
    public async Task<IActionResult> Pay(Payment payment)
    {
        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();
        return Ok(payment);
    }
}