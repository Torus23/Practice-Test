namespace Backend;

public class Food
{
    public int FoodId { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int RestaurantId { get; set; }
    public Restaurant? Restaurant { get; set; }
}
