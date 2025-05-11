using Backend.DTOs;

namespace Backend.Repositories.Interfaces {
    public interface IStatisticsRepository {
        Task<MonthStatsDto> GetMonthSummaryAsync(int userId, int year, int month);
        Task<List<WeekSeriesItemDto>> GetWeekSeriesAsync(int userId, int year, int month);
        Task<WeekStatsDto> GetWeekAveragesAsync(int userId, int year, int month, int weekIndex);
    }
}
