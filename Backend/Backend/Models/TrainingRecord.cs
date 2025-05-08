using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;

namespace Backend.Models;
    public enum TrainingType
    {
        Cardio,
        Strength,
        Flexibility,
        Recovery,
        Other
    }

    public class TrainingRecord
    {
        [Key]
        public int Id { get; set; }
        public DateTime TrainingDateTime { get; set; }
        public TrainingType TrainingType { get; set; }
        public string Activity { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int Difficulty { get; set; }
        public int Fatigue { get; set; }
        public int Calories { get; set; }
        public string? Notes { get; set; }

        public TrainingRecord(DateTime trainingDateTime, TrainingType trainingType, string activity, int duration,
            int difficulty, int fatigue, int calories, string? notes)
        {
            TrainingDateTime=trainingDateTime;
            TrainingType=trainingType;
            Activity=activity;
            Duration=duration;
            Difficulty=difficulty;
            Fatigue=fatigue;
            Calories=calories;
            Notes=notes;
            Validate();
        }

        private void Validate()
        {
            if (TrainingDateTime.Date > DateTime.Today) throw new ArgumentException("Training date can’t be in the future.");
            if (string.IsNullOrWhiteSpace(Activity)) throw new ArgumentException("Invalid activity!");
            if (Duration < 1) throw new ArgumentException("Invalid training duration!");
            if (Difficulty < 1 || Difficulty > 10) throw new ArgumentException("Invalid training difficulty!");
            if (Fatigue < 1 || Fatigue > 10) throw new ArgumentException("Invalid training fatigue!");
            if (int.IsNegative(Calories)) throw new ArgumentException("Invalid calories!");
        }
}

    

