using Backend.Models;

namespace Backend.Repositories {
    public interface ITrainingRecordRepository
    {
        Task<IEnumerable<TrainingRecord>> GetAllAsync();
        Task<TrainingRecord> GetByIdAsync(int id);
        Task<TrainingRecord> AddAsync(TrainingRecord t);
        Task<TrainingRecord> UpdateAsync(TrainingRecord t);
        Task DeleteAsync(int id);
        Task<List<TrainingRecord>> GetAllForUserAsync(int userId);
    }
}
