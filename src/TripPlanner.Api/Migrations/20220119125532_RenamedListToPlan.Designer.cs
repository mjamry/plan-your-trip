﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using trip_planner.Data.Contexts;

namespace trip_planner.Migrations
{
    [DbContext(typeof(TripPlannerContext))]
    [Migration("20220119125532_RenamedListToPlan")]
    partial class RenamedListToPlan
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("trip_planner.Data.Models.Coordinate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Lat")
                        .HasColumnType("float");

                    b.Property<double>("Lon")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Coordinates");
                });

            modelBuilder.Entity("trip_planner.Data.Models.List", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("bit");

                    b.Property<string>("Link")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Plan");
                });

            modelBuilder.Entity("trip_planner.Data.Models.ListLocations", b =>
                {
                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<int>("ListId")
                        .HasColumnType("int")
                        .HasColumnName("PlanId");

                    b.Property<bool>("Owner")
                        .HasColumnType("bit");

                    b.HasKey("LocationId", "ListId");

                    b.HasIndex("ListId");

                    b.ToTable("PlanLocations");
                });

            modelBuilder.Entity("trip_planner.Data.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CoordinatesId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CoordinatesId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("trip_planner.Data.Models.UserLists", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ListId")
                        .HasColumnType("int")
                        .HasColumnName("PlanId");

                    b.Property<bool>("Owner")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "ListId");

                    b.HasIndex("ListId");

                    b.ToTable("UserPlans");
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

                    b.Navigation("List");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("trip_planner.Data.Models.Location", b =>
                {
                    b.HasOne("trip_planner.Data.Models.Coordinate", "Coordinates")
                        .WithMany()
                        .HasForeignKey("CoordinatesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coordinates");
                });

            modelBuilder.Entity("trip_planner.Data.Models.UserLists", b =>
                {
                    b.HasOne("trip_planner.Data.Models.List", "List")
                        .WithMany("Users")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("List");
                });

            modelBuilder.Entity("trip_planner.Data.Models.List", b =>
                {
                    b.Navigation("Locations");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("trip_planner.Data.Models.Location", b =>
                {
                    b.Navigation("Lists");
                });
#pragma warning restore 612, 618
        }
    }
}