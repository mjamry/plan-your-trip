﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using trip_planner.Data.Contexts;

namespace trip_planner.Migrations
{
    [DbContext(typeof(TripPlannerContext))]
    [Migration("20200706170515_RenamedAttractivnessToRating")]
    partial class RenamedAttractivnessToRating
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("trip_planner.Data.Models.Coordinate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Lat")
                        .HasColumnType("double");

                    b.Property<double>("Lon")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.ToTable("Coordinates");
                });

            modelBuilder.Entity("trip_planner.Data.Models.List", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Link")
                        .HasColumnType("varchar(100) CHARACTER SET utf8mb4")
                        .HasMaxLength(100);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(60) CHARACTER SET utf8mb4")
                        .HasMaxLength(60);

                    b.Property<DateTime>("Updated")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Lists");
                });

            modelBuilder.Entity("trip_planner.Data.Models.ListLocations", b =>
                {
                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<int>("ListId")
                        .HasColumnType("int");

                    b.Property<bool>("Owner")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("LocationId", "ListId");

                    b.HasIndex("ListId");

                    b.ToTable("ListLocations");
                });

            modelBuilder.Entity("trip_planner.Data.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CoordinatesId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Image")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(60) CHARACTER SET utf8mb4")
                        .HasMaxLength(60);

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CoordinatesId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("trip_planner.Data.Models.UserLists", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.Property<int>("ListId")
                        .HasColumnType("int");

                    b.Property<bool>("Owner")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("UserId", "ListId");

                    b.HasIndex("ListId");

                    b.ToTable("UserLists");
                });

            modelBuilder.Entity("trip_planner.Data.Models.ListLocations", b =>
                {
                    b.HasOne("trip_planner.Data.Models.List", "List")
                        .WithMany("Locations")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("trip_planner.Data.Models.Location", "Location")
                        .WithMany("Lists")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("trip_planner.Data.Models.Location", b =>
                {
                    b.HasOne("trip_planner.Data.Models.Coordinate", "Coordinates")
                        .WithMany()
                        .HasForeignKey("CoordinatesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("trip_planner.Data.Models.UserLists", b =>
                {
                    b.HasOne("trip_planner.Data.Models.List", "List")
                        .WithMany("Users")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
