using Backend.Models;

namespace Backend.Services;
public interface ITrainingRecordService {
    Task<IEnumerable<TrainingRecord>> GetAllAsync();
    Task<TrainingRecord?> GetAsync(int id);
    Task<TrainingRecord> CreateAsync(TrainingRecord t);
    Task<bool> UpdateAsync(int id, TrainingRecord t);
    Task<bool> DeleteAsync(int id);
}