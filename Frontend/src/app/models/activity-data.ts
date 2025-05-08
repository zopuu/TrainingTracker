export enum TrainingType {
    Cardio = 'cardio',
    Strength = 'strength',
    Flexibility = 'flexibility',
    Recovery = 'recovery',
    Other = 'other'
  }
  
  export interface ActivityOption {
    value: string;
    label: string;
  }
  
  export const ACTIVITY_MAP: Record<TrainingType, ActivityOption[]> = {
    [TrainingType.Cardio]: [
      { value: 'running',  label: 'Running'  },
      { value: 'cycling',  label: 'Cycling'  },
      { value: 'swimming', label: 'Swimming'}
    ],
    [TrainingType.Strength]: [
      { value: 'bench',     label: 'Bench Press' },
      { value: 'squats',    label: 'Squats'      },
      { value: 'deadlift',  label: 'Deadlift'    }
    ],
    [TrainingType.Flexibility]: [
      { value: 'yoga',      label: 'Yoga'       },
      { value: 'stretch',   label: 'Stretching' },
      { value: 'pilates',   label: 'Pilates'    }
    ],
    [TrainingType.Recovery]: [
      { value: 'foamroll',  label: 'Foam Rolling' },
      { value: 'icebath',   label: 'Ice Bath'     }
    ],
    [TrainingType.Other]: [
      { value: 'other', label: 'Other' }
    ]
  };
  