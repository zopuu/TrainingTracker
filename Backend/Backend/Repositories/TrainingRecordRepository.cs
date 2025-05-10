using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class TrainingRecordRepository : ITrainingRecordRepository {
    private readonly AppDbContext _db;
    public TrainingRecordRepository(AppDbContext db) { _db = db; }

    public async Task<IEnumerable<TrainingRecord>> GetAllAsync() =>
        await _db.TrainingRecords.ToListAsync();

    public async Task<TrainingRecord?> GetByIdAsync(int id) =>
        await _db.TrainingRecords.FindAsync(id);

    public async Task<TrainingRecord> AddAsync(TrainingRecord t) {
        _db.TrainingRecords.Add(t);
        await _db.SaveChangesAsync();
        return t;
    }

    public async Task<TrainingRecord> UpdateAsync(TrainingRecord t) {
        _db.TrainingRecords.Update(t);
        await _db.SaveChangesAsync();
        return t;
    }

    public async Task DeleteAsync(int id) {
        var entity = await _db.TrainingRecords.FindAsync(id);
        if (entity is null) return;
        _db.TrainingRecords.Remove(entity);
        await _db.SaveChangesAsync();
    }

    public async Task<List<TrainingRecord>> GetAllForUserAsync(int userId)
    {
        return await _db.TrainingRecords
            .Where(tr => tr.UserId == userId)
            .ToListAsync();
    }
}