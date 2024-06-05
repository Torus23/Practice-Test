namespace Backend;

public class Restaurant
{
 public int RestaurantId { get; set; }
 public string Name {get; set;} =default!;
 public int? Rating {get; set;}
public List<Food> Foods {get; set;} = new();

}
