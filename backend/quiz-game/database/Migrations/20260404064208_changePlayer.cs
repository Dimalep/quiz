using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace database.Migrations
{
    /// <inheritdoc />
    public partial class changePlayer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_players_games_quiz_session_id",
                table: "players");

            migrationBuilder.RenameColumn(
                name: "login",
                table: "players",
                newName: "nickname");

            migrationBuilder.RenameColumn(
                name: "quiz_session_id",
                table: "players",
                newName: "game_id");

            migrationBuilder.RenameIndex(
                name: "IX_players_quiz_session_id",
                table: "players",
                newName: "IX_players_game_id");

            migrationBuilder.AddForeignKey(
                name: "FK_players_games_game_id",
                table: "players",
                column: "game_id",
                principalTable: "games",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_players_games_game_id",
                table: "players");

            migrationBuilder.RenameColumn(
                name: "nickname",
                table: "players",
                newName: "login");

            migrationBuilder.RenameColumn(
                name: "game_id",
                table: "players",
                newName: "quiz_session_id");

            migrationBuilder.RenameIndex(
                name: "IX_players_game_id",
                table: "players",
                newName: "IX_players_quiz_session_id");

            migrationBuilder.AddForeignKey(
                name: "FK_players_games_quiz_session_id",
                table: "players",
                column: "quiz_session_id",
                principalTable: "games",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
