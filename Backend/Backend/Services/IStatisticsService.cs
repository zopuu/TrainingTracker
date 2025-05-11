using Backend.DTOs;

namespace Backend.Services {
    public interface IStatisticsService
    {
        Task<MonthStatsResultDto> GetMonthAsync(int userId, int year, int month);
        Task<WeekStatsDto> GetWeekAsync(int userId, int year,int month,int weekIndex);
    }
}
