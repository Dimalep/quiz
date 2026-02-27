using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace database.Migrations
{
    /// <inheritdoc />
    public partial class syncGames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_progresses_player_id",
                table: "progresses",
                column: "player_id");

            migrationBuilder.AddForeignKey(
                name: "FK_progresses_players_player_id",
                table: "progresses",
                column: "player_id",
                principalTable: "players",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_progresses_players_player_id",
                table: "progresses");

            migrationBuilder.DropIndex(
                name: "IX_progresses_player_id",
                table: "progresses");
        }
    }
}
