using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace trip_planner.Migrations
{
    public partial class ExtendedListDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations");

            migrationBuilder.AlterColumn<int>(
                name: "CoordinatesId",
                table: "Locations",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Lists",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Lists",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Lists",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations",
                column: "CoordinatesId",
                principalTable: "Coordinates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Lists");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Lists");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Lists");

            migrationBuilder.AlterColumn<int>(
                name: "CoordinatesId",
                table: "Locations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations",
                column: "CoordinatesId",
                principalTable: "Coordinates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
