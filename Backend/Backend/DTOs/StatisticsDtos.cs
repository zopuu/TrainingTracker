namespace Backend.DTOs;

public record MonthStatsDto(
    int TotalMinutes,
    int TotalCalories,
    string FavouriteType,
    double AvgDifficulty,
    double AvgFatigue);

public record WeekSeriesItemDto(
    int Week,
    List<NamedValueDto> Series);

public record NamedValueDto(
    string Name,
    int Value);

public record MonthStatsResultDto(
    MonthStatsDto Summary,
    IReadOnlyList<WeekSeriesItemDto> WeekSeries);

public record WeekStatsDto(
    int TotalMinutes,
    int Sessions,
    double AvgDifficulty,
    double AvgFatigue,
    string DominantType);
