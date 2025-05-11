using Backend.DTOs;
using Backend.Repositories.Interfaces;

namespace Backend.Services {
    public class StatisticsService : IStatisticsService {
        private readonly IStatisticsRepository _repo;

        public StatisticsService(IStatisticsRepository repository)
        {
            _repo = repository;
        }

        public async Task<MonthStatsResultDto> GetMonthAsync(int userId, int year, int month)
        {
            var summary = await _repo.GetMonthSummaryAsync(userId, year, month);
            var weekSeries = await _repo.GetWeekSeriesAsync(userId, year, month);

            return new MonthStatsResultDto(summary, weekSeries);
        }

        public async Task<WeekStatsDto> GetWeekAsync(int userId, int year, int month, int weekIndex)
        {
            return await _repo.GetWeekAveragesAsync(userId, year, month, weekIndex);
        }
    }
}
