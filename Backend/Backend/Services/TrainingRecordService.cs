using Backend.Models;
using Backend.Repositories;

namespace Backend.Services;

public class TrainingRecordService : ITrainingRecordService {
    private readonly ITrainingRecordRepository _repo;
    public TrainingRecordService(ITrainingRecordRepository repo) { _repo = repo; }

    public Task<IEnumerable<TrainingRecord>> GetAllAsync() => _repo.GetAllAsync();
    public Task<TrainingRecord?> GetAsync(int id) => _repo.GetByIdAsync(id);

    public Task<TrainingRecord> CreateAsync(TrainingRecord t) => _repo.AddAsync(t);

    public async Task<bool> UpdateAsync(int id, TrainingRecord t) {
        if (id != t.Id) return false;
        await _repo.UpdateAsync(t);
        return true;
    }

    public async Task<bool> DeleteAsync(int id) {
        await _repo.DeleteAsync(id);
        return true;
    }
}