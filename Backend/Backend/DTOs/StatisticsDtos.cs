namespace Backend.DTOs;

public record MonthStatsDto(
    int TotalMinutes,
    int TotalCalories,
    string FavouriteType,
    double AvgDifficulty,
    double AvgFatigue);

public record WeekSeriesItemDto(
    int WeekIndex,
    int Cardio,
    int Strength,
    int Flexibility,
    int Recovery,
    int Other);

public record MonthStatsResultDto(
    MonthStatsDto Summary,
    IReadOnlyList<WeekSeriesItemDto> WeekSeries);

public record WeekStatsDto(
    int TotalMinutes,
    int Sessions,
    double AvgDifficulty,
    double AvgFatigue,
    string DominantType);
