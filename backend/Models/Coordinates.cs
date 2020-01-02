namespace trip_planner.Models
{
     public class Coordinates{
        public Coordinates(){}
        public Coordinates(double lat, double lon){
            Lat = lat;
            Lon = lon;
        }

        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}