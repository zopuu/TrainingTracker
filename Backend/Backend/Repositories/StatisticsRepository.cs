using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly AppDbContext _db;
        private readonly ILogger<StatisticsRepository> _logger;

        public StatisticsRepository(AppDbContext db,ILogger<StatisticsRepository> logger)
        {
            _db = db;
            _logger= logger;
        }

    public async Task<MonthStatsDto> GetMonthSummaryAsync(int userId, int year, int month) {
        var query = _db.TrainingRecords.Where(r =>
               r.UserId == userId &&
               r.TrainingDateTime.Year == year &&
               r.TrainingDateTime.Month == month);
        if (!await query.AnyAsync()) {
            return new MonthStatsDto(
                TotalMinutes: 0,
                Sessions: 0,
                TotalCalories: 0,
                FavouriteType: "N/A",
                AvgDifficulty: 0,
                AvgFatigue: 0
            );
        }

        var totalMinutes = await query.SumAsync(r => r.Duration);
        var sessions = await query.CountAsync();
        var totalCalories = await query.SumAsync(r => r.Calories);
        var avgDifficulty = await query.AverageAsync(r => r.Difficulty);
        var avgFatigue = await query.AverageAsync(r => r.Fatigue);

        

        var favouriteType = await query
            .GroupBy(r => r.TrainingType)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key.ToString())          // stringify enum
            .FirstOrDefaultAsync() ?? "N/A";

        return new MonthStatsDto(
            TotalMinutes: totalMinutes,
            Sessions: sessions,
            TotalCalories: totalCalories,
            FavouriteType: favouriteType,
            AvgDifficulty: Math.Round(avgDifficulty, 1),
            AvgFatigue: Math.Round(avgFatigue, 1));
    }

    public async Task<List<WeekSeriesItemDto>> GetWeekSeriesAsync(int userId, int year, int month) {
        // 1. load all records for the specified month
        var monthRecs = await _db.TrainingRecords
            .Where(r => r.UserId == userId &&
                        r.TrainingDateTime.Year == year &&
                        r.TrainingDateTime.Month == month)
            .ToListAsync();

        // 2. group by ISO week number
        var grouped = monthRecs
            .GroupBy(r => ISOWeek.GetWeekOfYear(r.TrainingDateTime))
            .OrderBy(g => g.Key)
            .Select(g => new WeekSeriesItemDto(
                Week: g.Key,
                Series: new List<NamedValueDto> {
                    new("cardio", g.Where(r => r.TrainingType == TrainingType.Cardio).Sum(r => r.Duration)),
                    new("strength", g.Where(r => r.TrainingType == TrainingType.Strength).Sum(r => r.Duration)),
                    new("flexibility", g.Where(r => r.TrainingType == TrainingType.Flexibility).Sum(r => r.Duration)),
                    new("recovery", g.Where(r => r.TrainingType == TrainingType.Recovery).Sum(r => r.Duration)),
                    new("other", g.Where(r => r.TrainingType == TrainingType.Other).Sum(r => r.Duration))
                }
            ))
            .ToList();

        return grouped;
    }



    public async Task<WeekStatsDto> GetWeekAveragesAsync(int userId, int year, int month, int weekIndex) {
        if (weekIndex < 1 || weekIndex > 53) {
            _logger.LogWarning("Invalid week index received: {Week}", weekIndex);
            throw new ArgumentOutOfRangeException(nameof(weekIndex), "The week parameter must be in the range 1 through 53.");
        }
        var weekStartLocal = FirstDateOfWeek(year, weekIndex);
        var weekEndLocal = weekStartLocal.AddDays(7);
        _logger.LogInformation("Start Local: {Start}", weekStartLocal);
        _logger.LogInformation("End Local {End}", weekEndLocal);

        var weekStartUtc = DateTime.SpecifyKind(weekStartLocal, DateTimeKind.Utc);
        var weekEndUtc = DateTime.SpecifyKind(weekEndLocal, DateTimeKind.Utc);

        _logger.LogInformation("Start UTC: {Start}", weekStartUtc);
        _logger.LogInformation("End UTC: {End}", weekEndUtc);



        var weekRecs = _db.TrainingRecords.Where(r =>
            r.UserId == userId &&
            r.TrainingDateTime >= weekStartUtc &&
            r.TrainingDateTime < weekEndUtc);
        if (!await weekRecs.AnyAsync())
            return new WeekStatsDto(
                TotalMinutes: 0,
                Sessions: 0,
                TotalCalories: 0,
                AvgDifficulty: 0,
                AvgFatigue: 0,
                DominantType: "N/A"
            );

        var totalMinutes = await weekRecs.SumAsync(r => r.Duration);
        var sessions = await weekRecs.CountAsync();
        var totalCalories = await weekRecs.SumAsync(r => r.Calories);
        var avgDifficulty = await weekRecs.AverageAsync(r => r.Difficulty);
        var avgFatigue = await weekRecs.AverageAsync(r => r.Fatigue);

        var dominantType = await weekRecs.GroupBy(r => r.TrainingType)
            .OrderByDescending(g => g.Sum(x => x.Duration))
            .Select(g => g.Key.ToString())
            .FirstOrDefaultAsync() ?? "N/A";

        return new WeekStatsDto(
            TotalMinutes: totalMinutes,
            Sessions: sessions,
            TotalCalories: totalCalories,
            AvgDifficulty: Math.Round(avgDifficulty, 1),
            AvgFatigue: Math.Round(avgFatigue, 1),
            DominantType: dominantType);
    }

    private static DateTime FirstDateOfWeek(int year, int isoWeek) {
        return DateTime.SpecifyKind(ISOWeek.ToDateTime(year, isoWeek, DayOfWeek.Monday), DateTimeKind.Utc);
    }


}

