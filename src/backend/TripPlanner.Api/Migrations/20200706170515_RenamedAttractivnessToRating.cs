using Microsoft.EntityFrameworkCore.Migrations;

namespace trip_planner.Migrations
{
    public partial class RenamedAttractivnessToRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Attractivness",
                table: "Locations");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Locations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Locations");

            migrationBuilder.AddColumn<int>(
                name: "Attractivness",
                table: "Locations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
