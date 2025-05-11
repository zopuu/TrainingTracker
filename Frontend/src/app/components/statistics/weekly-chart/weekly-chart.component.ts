import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActiveElement, ChartData, ChartEvent, elements, plugins } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WeekSeriesItem } from 'src/app/services/training.service';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.css']
})
export class WeeklyChartComponent implements OnChanges {
  @Input() series: WeekSeriesItem[] = [];
  @Output() weekSelect = new EventEmitter<number>();
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true, beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    },
    onClick: (ev: ChartEvent, elements: ActiveElement[]) => {
      if(elements.length) {
        const index = elements[0].index;
        this.weekSelect.emit(index);
      }
    }
  };
  ngOnChanges(changes: SimpleChanges) {
    if (changes['series']) {
      this.updateChart();
    }
  }
  private updateChart() {
    const labels = this.series.map(w => w.name);
    const types = Array.from(
      new Set(this.series.flatMap(w => w.series.map(s => s.name)))
    );
    const datasets = types.map(type => ({
      label: type,
      data: this.series.map(w => {
        const found = w.series.find(s => s.name === type);
        return found ? found.value : 0;
      }),
      backgroundColor: this.colorForType(type),
    }));
    this.barChartData = {
      labels,
      datasets
    };
    this.chart?.update();
  }
  private colorForType(type: string): string {
    switch (type.toLowerCase()) {
      case 'cardio':     return 'rgba(30, 144, 255, 0.7)';
      case 'strength':   return 'rgba(255, 99, 132, 0.7)';
      case 'flexibility':return 'rgba(75, 192, 192, 0.7)';
      case 'recovery':   return 'rgba(153, 102, 255, 0.7)';
      case 'other':      return 'rgba(201, 203, 207, 0.7)';
      default:           return 'rgba(100,100,100,0.7)';
    }
  }
}
