using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace database.Migrations
{
    /// <inheritdoc />
    public partial class littleBitChaged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_progresses_session_id",
                table: "progresses",
                column: "session_id");

            migrationBuilder.AddForeignKey(
                name: "FK_progresses_games_session_id",
                table: "progresses",
                column: "session_id",
                principalTable: "games",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_progresses_games_session_id",
                table: "progresses");

            migrationBuilder.DropIndex(
                name: "IX_progresses_session_id",
                table: "progresses");
        }
    }
}
