using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ChangedAnonymousUserModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FingerPrint",
                table: "AnonymousUsers",
                newName: "Fingerprint");

            migrationBuilder.RenameIndex(
                name: "IX_AnonymousUsers_FingerPrint",
                table: "AnonymousUsers",
                newName: "IX_AnonymousUsers_Fingerprint");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Fingerprint",
                table: "AnonymousUsers",
                newName: "FingerPrint");

            migrationBuilder.RenameIndex(
                name: "IX_AnonymousUsers_Fingerprint",
                table: "AnonymousUsers",
                newName: "IX_AnonymousUsers_FingerPrint");
        }
    }
}
