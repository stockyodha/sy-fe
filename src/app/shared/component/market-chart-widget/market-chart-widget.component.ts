import { CommonModule } from '@angular/common';
import { afterRender, Component, ElementRef, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-market-chart-widget',
  standalone: true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './market-chart-widget.component.html',
  styleUrls: ['./market-chart-widget.component.scss']
})
export class MarketChartWidgetComponent {
  @ViewChild('myCanvas') canvas: ElementRef | undefined;

  public lineChartData: ChartData<'line', number[]> = {
    datasets: [
      {
        data: [10500, 11500, 11100, 11250, 11200, 11275],
        label: 'Price',
        borderColor: '#0169cd',
        backgroundColor: 'rgba(1, 105, 205, 0.1)',
        pointRadius: 0,
        borderWidth: 2,
        fill: true,
      }
    ],
    labels: ['10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm']
  };

  // Define your chart options
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true, 
  };

  // Define the chart type
  public lineChartType: ChartType = 'line';

  // Define the legend property
  public lineChartLegend: boolean = true;

  // Define the chart plugins
  public lineChartPlugins: Plugin<'line'>[] = [{
    id: 'gradientBackground',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const datasets = chart.data.datasets;

      // Clear the background
      ctx.clearRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);

      // Draw gradient background for each dataset
      datasets.forEach(dataset => {
        if (dataset.data && dataset.data.length) {
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(1, 105, 205, 0.35)');
          gradient.addColorStop(0.25, 'rgba(1, 105, 205, 0.25)');
          gradient.addColorStop(0.5, 'rgba(1, 105, 205, 0.15)');
          gradient.addColorStop(0.75, 'rgba(255, 0, 0, 0.0)');
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0.0)');
          
          ctx.save();
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(chartArea.left, chartArea.bottom);
          
          // Create path based on the dataset
          dataset.data.forEach((value, index) => {
            const x = chart.getDatasetMeta(0).data[index].x;
            const y = chart.getDatasetMeta(0).data[index].y;
            ctx.lineTo(x, y);
          });
          
          ctx.lineTo(chart.getDatasetMeta(0).data[dataset.data.length - 1].x, chartArea.bottom);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });
    }
  }];

  // Example data
  public high = '11,691.89';
  public low = '11,470.47';
  public prevClose = '11,512.41';
  public open = '11,690.11';

  activeMarket = 'NSE';
  activeTimeRange = '1D';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const gradient = this.canvas?.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(1, 'green');
      this.lineChartData = {
        datasets: [
          {
            data: [10500, 11500, 11100, 11250, 11200, 11275],
            label: 'Price',
            borderColor: '#0169cd',
            backgroundColor: gradient,
            pointRadius: 0,
            borderWidth: 2,
            fill: true,
          }
        ],
      }
  }

  changeMarket(market: string) {
    this.activeMarket = market;
  }

  changeTimeRange(timeRange: string) {
    this.activeTimeRange = timeRange;
  }

}
