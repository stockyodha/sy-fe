import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-portfolio-analysis',
    standalone: true,
    imports: [CommonModule, BaseChartDirective],
    templateUrl: './portfolio-analysis.component.html',
    styleUrls: ['./portfolio-analysis.component.scss']
})
export class PortfolioAnalysisComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
    selectedRange: string = '1D';

    public lineChartData: ChartData<'line', number[]> = {
        datasets: [
            {
                data: [9400, 10200, 9700, 10800, 10950, 10900, 11000, 10650, 11275, 11400, 11450, 11500, 10000],
                label: 'Portfolio Value',
                borderColor: '#0169cd',
                backgroundColor: 'rgba(1, 105, 205, 0.1)',
                pointRadius: 0,
                borderWidth: 2,
                fill: true,
            }
        ],
        labels: ['10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm']
    };

    public lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                display: true,
                grid: { color: 'rgba(200,200,200,0.1)' },
            },
            y: {
                display: true,
                position: 'right',
                grid: { color: 'rgba(200,200,200,0.1)' }
            }
        },
        plugins: {
            tooltip: { enabled: false },
        }
    };

    public lineChartType: ChartType = 'line';
    public lineChartLegend = false;

    public lineChartPlugins: Plugin<'line'>[] = [{
        id: 'gradientBackground',
        beforeDraw: (chart) => {
            const { ctx, chartArea, data } = chart;
            const datasets = data.datasets;

            ctx.clearRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);

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

                    dataset.data.forEach((value, index) => {
                        const point = chart.getDatasetMeta(0).data[index];
                        ctx.lineTo(point.x, point.y);
                    });

                    ctx.lineTo(chart.getDatasetMeta(0).data[dataset.data.length - 1].x, chartArea.bottom);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
            });
        }
    }];

    // Market and Time Range Controls
    activeMarket = 'NSE';
    activeTimeRange = '1D';
    timeRanges: string[] = ['1D', '5D', '1M', '6M', '1Y', '5Y', 'Max'];

    ngOnInit(): void {
        const ctx = (this.chart?.chart?.ctx as CanvasRenderingContext2D) || new CanvasRenderingContext2D();
        const gradient = ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, 'rgba(1, 105, 205, 0.35)');
        gradient.addColorStop(0.25, 'rgba(1, 105, 205, 0.25)');
        gradient.addColorStop(0.5, 'rgba(1, 105, 205, 0.15)');
        gradient.addColorStop(0.75, 'rgba(255, 0, 0, 0.0)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.0)');
        this.lineChartData.datasets[0].backgroundColor = gradient;
    }

    changeMarket(market: string) {
        this.activeMarket = market;
    }

    changeTimeRange(timeRange: string) {
        this.activeTimeRange = timeRange;
        // Trigger data update here
    }

    selectRange(range: string): void {
        this.selectedRange = range;
        // Handle data update based on selected range
    }
}
