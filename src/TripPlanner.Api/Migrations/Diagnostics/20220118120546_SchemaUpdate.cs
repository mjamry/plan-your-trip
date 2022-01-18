using Microsoft.EntityFrameworkCore.Migrations;

namespace trip_planner.Migrations.Diagnostics
{
    public partial class SchemaUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "diag");

            migrationBuilder.RenameTable(
                name: "Logs",
                newName: "Logs",
                newSchema: "diag");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Logs",
                schema: "diag",
                newName: "Logs");
        }
    }
}
