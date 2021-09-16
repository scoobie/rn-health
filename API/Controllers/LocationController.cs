using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class LocationController:BaseApiController
    {
        private readonly DataContext _context;

        public LocationController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("distrito")]
        public async Task<ActionResult<IEnumerable<DistritoDto>>> GetDistrito()
        {
            return await _context.Freguesias.Select(x=>new DistritoDto{Distrito = x.Distrito}).Distinct().ToListAsync();
        }

        [HttpGet("concelho/{distrito}")]
        public async Task<ActionResult<IEnumerable<ConcelhoDto>>> GetConcelho(string distrito)
        {
            return await _context.Freguesias.Where(x => x.Distrito == distrito)
                .Select(x => new ConcelhoDto{Concelho = x.Concelho}).Distinct().ToListAsync();
        }

        [HttpGet("freguesia/{concelho}")]
        public async Task<ActionResult<IEnumerable<FreguesiaDto>>> GetFreguesias(string concelho)
        {
            return await _context.Freguesias.Where(x => x.Concelho == concelho)
                .Select(x => new FreguesiaDto {Freguesia = x.NomeFreguesia}).Distinct().ToListAsync();
        }
    }
}