using Microsoft.EntityFrameworkCore.Migrations;

namespace trip_planner.Migrations
{
    public partial class RenamedPrivateFieldOnList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Private",
                table: "Lists");

            migrationBuilder.AddColumn<bool>(
                name: "IsPrivate",
                table: "Lists",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPrivate",
                table: "Lists");

            migrationBuilder.AddColumn<bool>(
                name: "Private",
                table: "Lists",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
