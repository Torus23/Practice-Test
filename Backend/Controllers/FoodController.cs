using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {   
        private readonly AppDbContext db;
        public FoodController(AppDbContext db)
        {
            this.db = db;   
        } 

        // api/Food/all
        [HttpGet, Route("all")]
        [Authorize("IsAdmin")]
        public ActionResult<List<GetFoodResponse>> GetAllFoodItem()
        {
            var foods = db.Foods.Include(food => food.Restaurant).ToList();
            var response = foods.Select(food => new GetFoodResponse(food)).ToList();
            return response;
        }

        // api/Food/create
        [HttpPost, Route("create")]
          public ActionResult<bool> CreateFoodItem(CreateFoodRequest request)
        {
            var newFood = request.ConvertToFoodModel();
            db.Foods.Add(newFood);
           var numRowsChanged = db.SaveChanges();
           return numRowsChanged == 1;
        }
        // api/delete/1
        [HttpDelete, Route("delete/{id}")]
        [Authorize("IsAdmin")]
          public ActionResult<bool> DeleteFoodItem(int id)
        {
            var foodToDelete = db.Foods.Find(id);
            if(foodToDelete == null)
            {
                return false;
            }
            db.Foods.Remove(foodToDelete);
            var numRowsChanged = db.SaveChanges();
           return numRowsChanged == 1;
        }
    }
    
}