using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace database.Migrations
{
    /// <inheritdoc />
    public partial class sync6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_player_progress",
                table: "player_progress");

            migrationBuilder.RenameTable(
                name: "player_progress",
                newName: "player_progresses");

            migrationBuilder.RenameColumn(
                name: "QuizResult",
                table: "player_progresses",
                newName: "quiz_result");

            migrationBuilder.AddPrimaryKey(
                name: "PK_player_progresses",
                table: "player_progresses",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_player_progresses",
                table: "player_progresses");

            migrationBuilder.RenameTable(
                name: "player_progresses",
                newName: "player_progress");

            migrationBuilder.RenameColumn(
                name: "quiz_result",
                table: "player_progress",
                newName: "QuizResult");

            migrationBuilder.AddPrimaryKey(
                name: "PK_player_progress",
                table: "player_progress",
                column: "id");
        }
    }
}
