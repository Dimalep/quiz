using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace database.Migrations
{
    /// <inheritdoc />
    public partial class fucknigga : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_players_quiz_sessions_quiz_session_id",
                table: "players");

            migrationBuilder.DropPrimaryKey(
                name: "PK_quiz_sessions",
                table: "quiz_sessions");

            migrationBuilder.RenameTable(
                name: "quiz_sessions",
                newName: "games");

            migrationBuilder.AddPrimaryKey(
                name: "PK_games",
                table: "games",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_players_games_quiz_session_id",
                table: "players",
                column: "quiz_session_id",
                principalTable: "games",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_players_games_quiz_session_id",
                table: "players");

            migrationBuilder.DropPrimaryKey(
                name: "PK_games",
                table: "games");

            migrationBuilder.RenameTable(
                name: "games",
                newName: "quiz_sessions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_quiz_sessions",
                table: "quiz_sessions",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_players_quiz_sessions_quiz_session_id",
                table: "players",
                column: "quiz_session_id",
                principalTable: "quiz_sessions",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
