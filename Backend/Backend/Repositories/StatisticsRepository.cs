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

        public StatisticsRepository(AppDbContext db)
        {
            _db = db;
        }

    public async Task<MonthStatsDto> GetMonthSummaryAsync(int userId, int year, int month) {
        var query = _db.TrainingRecords.Where(r =>
               r.UserId == userId &&
               r.TrainingDateTime.Year == year &&
               r.TrainingDateTime.Month == month);
        if (!await query.AnyAsync()) {
            return new MonthStatsDto(
                TotalMinutes: 0,
                TotalCalories: 0,
                FavouriteType: "N/A",
                AvgDifficulty: 0,
                AvgFatigue: 0
            );
        }

        var totalMinutes = await query.SumAsync(r => r.Duration);
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
            TotalCalories: totalCalories,
            FavouriteType: favouriteType,
            AvgDifficulty: Math.Round(avgDifficulty, 1),
            AvgFatigue: Math.Round(avgFatigue, 1));
    }

    public async Task<List<WeekSeriesItemDto>> GetWeekSeriesAsync(
        int userId, int year, int month) {
        // 1. load the month into memory
        var monthRecs = await _db.TrainingRecords
            .Where(r => r.UserId == userId &&
                        r.TrainingDateTime.Year == year &&
                        r.TrainingDateTime.Month == month)
            .ToListAsync();

        // 2. group by ISO week number
        var groups = monthRecs
            .GroupBy(r => ISOWeek.GetWeekOfYear(r.TrainingDateTime))
            .OrderBy(g => g.Key)                 // keep natural order
            .Select(g => new WeekSeriesItemDto(
                WeekIndex: g.Key,              // 1‑based ISO week
                Cardio: g.Where(r => r.TrainingType == TrainingType.Cardio).Sum(r => r.Duration),
                Strength: g.Where(r => r.TrainingType == TrainingType.Strength).Sum(r => r.Duration),
                Flexibility: g.Where(r => r.TrainingType == TrainingType.Flexibility).Sum(r => r.Duration),
                Recovery: g.Where(r => r.TrainingType == TrainingType.Recovery).Sum(r => r.Duration),
                Other: g.Where(r => r.TrainingType == TrainingType.Other).Sum(r => r.Duration)))
            .ToList();

        return groups;
    }


public async Task<WeekStatsDto> GetWeekAveragesAsync(int userId, int year, int month, int weekIndex) {
        var weekStart = FirstDateOfWeek(year, weekIndex);
        var weekEnd = weekStart.AddDays(7);

        var weekRecs = _db.TrainingRecords.Where(r =>
            r.UserId == userId &&
            r.TrainingDateTime >= weekStart &&
            r.TrainingDateTime < weekEnd);
        if (!await weekRecs.AnyAsync())
            return new WeekStatsDto(
                TotalMinutes: 0,
                Sessions: 0,
                AvgDifficulty: 0,
                AvgFatigue: 0,
                DominantType: "N/A"
            );

        var totalMinutes = await weekRecs.SumAsync(r => r.Duration);
        var sessions = await weekRecs.CountAsync();
        var avgDifficulty = await weekRecs.AverageAsync(r => r.Difficulty);
        var avgFatigue = await weekRecs.AverageAsync(r => r.Fatigue);

        var dominantType = await weekRecs.GroupBy(r => r.TrainingType)
            .OrderByDescending(g => g.Sum(x => x.Duration))
            .Select(g => g.Key.ToString())
            .FirstOrDefaultAsync() ?? "N/A";

        return new WeekStatsDto(
            TotalMinutes: totalMinutes,
            Sessions: sessions,
            AvgDifficulty: Math.Round(avgDifficulty, 1),
            AvgFatigue: Math.Round(avgFatigue, 1),
            DominantType: dominantType);
    }

    /* ---------------- helper: ISO week to DateTime ---------------- */
    private static DateTime FirstDateOfWeek(int year, int weekIso) {
        // ISO‑8601: week starts Monday, first week has Jan‑4
        var jan4 = new DateTime(year, 1, 4);
        int jan4WeekDay = (int)jan4.DayOfWeek;
        jan4WeekDay = jan4WeekDay == 0 ? 7 : jan4WeekDay; // Sunday=7
        var firstWeekStart = jan4.AddDays(-(jan4WeekDay - 1));
        return firstWeekStart.AddDays((weekIso - 1) * 7);
    }
}

