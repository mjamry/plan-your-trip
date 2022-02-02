using Microsoft.EntityFrameworkCore.Migrations;

namespace trip_planner.Migrations
{
    public partial class ExtendsUserPlansKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserPlans",
                table: "UserPlans");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserPlans",
                table: "UserPlans",
                columns: new[] { "UserId", "PlanId", "Owner" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserPlans",
                table: "UserPlans");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserPlans",
                table: "UserPlans",
                columns: new[] { "UserId", "PlanId" });
        }
    }
}
