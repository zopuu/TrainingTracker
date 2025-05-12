import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActiveElement, ChartData, ChartEvent, elements, plugins, TooltipItem,ChartOptions } from 'chart.js';
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
        stacked: true,
        title: {
          display: true,
          text: "Weeks",
          font: {
            size: 16
          }
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Minutes",
          font: {
            size: 16
          }
        },
         
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Weekly Training Duration',
        font: {
          size: 20
        }
      },
      tooltip: {
        callbacks: {
          title: (items: TooltipItem<'bar'>[]) => {
            const weekLabel = items[0].label;
            return `Week ${weekLabel}`;
          },
          label: (item: TooltipItem<'bar'>) => {
            const datasetLabel = item.dataset.label || '';
            const value = item.parsed.y;
            return `${datasetLabel}: ${value} min`;
          }
        }
      }

    },
    onClick: (ev: ChartEvent, elements: ActiveElement[]) => {
      if(elements.length) {
        const index = elements[0].index;
        const week = this.series[index].week;
        console.log("Clicked week index:", index, "=> ISO week:", week);
        this.weekSelect.emit(week);
      }
    }
  };
  ngOnChanges(changes: SimpleChanges) {
    if (changes['series']) {
      this.updateChart();
    }
  }
  private updateChart() {
    const labels = this.series.map(w => w.week.toString());
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
