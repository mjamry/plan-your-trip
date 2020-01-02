namespace trip_planner.Models
{
    public class LocationDetailsDTO
    {
        public LocationDetailsDTO(){}
        public LocationDetailsDTO(string id, string name, string description, int attractivness, Coordinates coordinates, string image){
            Id = id;
            Name = name;
            Description = description;
            Attractivness = attractivness;
            Coordinates = coordinates;
            Image = image;
        }

        public string Id{ get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public int Attractivness { get; set; }
        public Coordinates Coordinates { get; set; }
        public string Image { get; set; }
    }
}