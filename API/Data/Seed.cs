using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUser(DataContext context)
        {
            if(await context.Users.AnyAsync()) return;
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("pass"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);
            }
            await context.SaveChangesAsync();
        }

        public static async Task SeedFreguesia(DataContext context)
        {
            if(await context.Freguesias.AnyAsync()) return;
            var freguesiaData = await System.IO.File.ReadAllTextAsync("Data/Freguesias.json");
            var freguesias = JsonSerializer.Deserialize<List<Freguesia>>(freguesiaData);
            foreach (var freguesia in freguesias)
            {
                freguesia.Concelho = freguesia.Concelho;
                freguesia.Distrito = freguesia.Distrito;
                freguesia.NomeFreguesia = freguesia.NomeFreguesia;
                freguesia.Dicofre = freguesia.Dicofre;
                context.Freguesias.Add(freguesia);
            }

            await context.SaveChangesAsync();
        }
    }
}