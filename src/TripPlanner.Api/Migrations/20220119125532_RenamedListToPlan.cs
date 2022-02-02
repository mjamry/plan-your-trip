using Microsoft.EntityFrameworkCore.Migrations;

namespace trip_planner.Migrations
{
    public partial class RenamedListToPlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListLocations_Lists_ListId",
                table: "ListLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_ListLocations_Locations_LocationId",
                table: "ListLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLists_Lists_ListId",
                table: "UserLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLists",
                table: "UserLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lists",
                table: "Lists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ListLocations",
                table: "ListLocations");

            migrationBuilder.RenameTable(
                name: "UserLists",
                newName: "UserPlans");

            migrationBuilder.RenameTable(
                name: "Lists",
                newName: "Plan");

            migrationBuilder.RenameTable(
                name: "ListLocations",
                newName: "PlanLocations");

            migrationBuilder.RenameColumn(
                name: "ListId",
                table: "UserPlans",
                newName: "PlanId");

            migrationBuilder.RenameIndex(
                name: "IX_UserLists_ListId",
                table: "UserPlans",
                newName: "IX_UserPlans_PlanId");

            migrationBuilder.RenameColumn(
                name: "ListId",
                table: "PlanLocations",
                newName: "PlanId");

            migrationBuilder.RenameIndex(
                name: "IX_ListLocations_ListId",
                table: "PlanLocations",
                newName: "IX_PlanLocations_PlanId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserPlans",
                table: "UserPlans",
                columns: new[] { "UserId", "PlanId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Plan",
                table: "Plan",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlanLocations",
                table: "PlanLocations",
                columns: new[] { "LocationId", "PlanId" });

            migrationBuilder.AddForeignKey(
                name: "FK_PlanLocations_Locations_LocationId",
                table: "PlanLocations",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlanLocations_Plan_PlanId",
                table: "PlanLocations",
                column: "PlanId",
                principalTable: "Plan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPlans_Plan_PlanId",
                table: "UserPlans",
                column: "PlanId",
                principalTable: "Plan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanLocations_Locations_LocationId",
                table: "PlanLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_PlanLocations_Plan_PlanId",
                table: "PlanLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPlans_Plan_PlanId",
                table: "UserPlans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserPlans",
                table: "UserPlans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlanLocations",
                table: "PlanLocations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Plan",
                table: "Plan");

            migrationBuilder.RenameTable(
                name: "UserPlans",
                newName: "UserLists");

            migrationBuilder.RenameTable(
                name: "PlanLocations",
                newName: "ListLocations");

            migrationBuilder.RenameTable(
                name: "Plan",
                newName: "Lists");

            migrationBuilder.RenameColumn(
                name: "PlanId",
                table: "UserLists",
                newName: "ListId");

            migrationBuilder.RenameIndex(
                name: "IX_UserPlans_PlanId",
                table: "UserLists",
                newName: "IX_UserLists_ListId");

            migrationBuilder.RenameColumn(
                name: "PlanId",
                table: "ListLocations",
                newName: "ListId");

            migrationBuilder.RenameIndex(
                name: "IX_PlanLocations_PlanId",
                table: "ListLocations",
                newName: "IX_ListLocations_ListId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLists",
                table: "UserLists",
                columns: new[] { "UserId", "ListId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_ListLocations",
                table: "ListLocations",
                columns: new[] { "LocationId", "ListId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lists",
                table: "Lists",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ListLocations_Lists_ListId",
                table: "ListLocations",
                column: "ListId",
                principalTable: "Lists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ListLocations_Locations_LocationId",
                table: "ListLocations",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLists_Lists_ListId",
                table: "UserLists",
                column: "ListId",
                principalTable: "Lists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
