using domains.domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.entity_configuration
{
    public class ProgressConfiguration : IEntityTypeConfiguration<Progress>
    {
        public void Configure(EntityTypeBuilder<Progress> builder)
        {
            builder.ToTable("progresses");

            builder.HasKey(el => el.Id);

            builder.Property(el => el.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(el => el.PlayerId)
                .HasColumnName("player_id");

            builder.HasOne(el => el.Player)
                .WithMany()
                .HasForeignKey(el => el.PlayerId);

            builder.Property(el => el.GameId)
                .HasColumnName("game_id");

            builder.HasOne(el => el.Game)
                .WithMany()
                .HasForeignKey(el => el.GameId);

            //*
            builder.Property(el => el.CurrentQuestionIndex)
                .HasColumnName("current_question_index");

            builder.Property(el => el.QuantityQuestions)
                .HasColumnName("quantity_questions");

            builder.Property(el => el.QuantityCompletedQuestions)
                .HasColumnName("quantity_completed_questions");

            builder.Property(el => el.StartAt)
                .HasColumnName("start_at");

            builder.Property(el => el.CompleteAt)
                .HasColumnName("complete_at");

            builder.Property(el => el.Status)
                .HasColumnName("status");

            // Owned json object
            builder.OwnsOne(el => el.QuizResult, qr =>
            {
                qr.ToJson("quiz_result");

                qr.Property(el => el.QuizId);
                qr.Property(el => el.QuantityCorrectAnswers);
                qr.Property(el => el.IsFinished);

                qr.OwnsMany(q => q.Questions, question =>
                {
                    question.OwnsMany(q => q.Answers);
                });
            });
        }
    }
}
