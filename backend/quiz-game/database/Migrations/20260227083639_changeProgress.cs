using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using domains.domains;

#nullable disable

namespace database.Migrations
{
    /// <inheritdoc />
    public partial class changeProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "player_progresses");

            migrationBuilder.CreateTable(
                name: "progresses",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    player_id = table.Column<int>(type: "integer", nullable: false),
                    session_id = table.Column<int>(type: "integer", nullable: false),
                    current_question_index = table.Column<int>(type: "integer", nullable: false),
                    start_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    complete_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    quiz_result = table.Column<PlayerQuizResult>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_progresses", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "progresses");

            migrationBuilder.CreateTable(
                name: "player_progresses",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    complete_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    current_question_index = table.Column<int>(type: "integer", nullable: false),
                    player_id = table.Column<int>(type: "integer", nullable: false),
                    quiz_result = table.Column<PlayerQuizResult>(type: "jsonb", nullable: false),
                    session_id = table.Column<int>(type: "integer", nullable: false),
                    start_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_player_progresses", x => x.id);
                });
        }
    }
}
