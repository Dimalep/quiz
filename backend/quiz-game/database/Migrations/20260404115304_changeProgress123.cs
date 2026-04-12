using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace database.Migrations
{
    /// <inheritdoc />
    public partial class changeProgress123 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_progresses_games_session_id",
                table: "progresses");

            migrationBuilder.RenameColumn(
                name: "session_id",
                table: "progresses",
                newName: "game_id");

            migrationBuilder.RenameIndex(
                name: "IX_progresses_session_id",
                table: "progresses",
                newName: "IX_progresses_game_id");

            migrationBuilder.AddForeignKey(
                name: "FK_progresses_games_game_id",
                table: "progresses",
                column: "game_id",
                principalTable: "games",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_progresses_games_game_id",
                table: "progresses");

            migrationBuilder.RenameColumn(
                name: "game_id",
                table: "progresses",
                newName: "session_id");

            migrationBuilder.RenameIndex(
                name: "IX_progresses_game_id",
                table: "progresses",
                newName: "IX_progresses_session_id");

            migrationBuilder.AddForeignKey(
                name: "FK_progresses_games_session_id",
                table: "progresses",
                column: "session_id",
                principalTable: "games",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
