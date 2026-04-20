using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class mig1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_users_username",
                schema: "app",
                table: "users");

            migrationBuilder.CreateIndex(
                name: "IX_users_username",
                schema: "app",
                table: "users",
                column: "username",
                unique: true,
                filter: "\"username\" IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_users_username",
                schema: "app",
                table: "users");

            migrationBuilder.CreateIndex(
                name: "IX_users_username",
                schema: "app",
                table: "users",
                column: "username",
                unique: true);
        }
    }
}
