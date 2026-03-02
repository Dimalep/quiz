using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace database.Migrations
{
    /// <inheritdoc />
    public partial class removeIsStartAndAddStatusFeild : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_started",
                table: "progresses");

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "progresses",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "status",
                table: "progresses");

            migrationBuilder.AddColumn<bool>(
                name: "is_started",
                table: "progresses",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
