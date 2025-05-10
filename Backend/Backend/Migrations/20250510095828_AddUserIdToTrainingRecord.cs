using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToTrainingRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TrainingRecords",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TrainingRecords_UserId",
                table: "TrainingRecords",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingRecords_Users_UserId",
                table: "TrainingRecords",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingRecords_Users_UserId",
                table: "TrainingRecords");

            migrationBuilder.DropIndex(
                name: "IX_TrainingRecords_UserId",
                table: "TrainingRecords");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TrainingRecords");
        }
    }
}
