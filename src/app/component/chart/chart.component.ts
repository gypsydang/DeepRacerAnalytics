import {Component, Injectable} from '@angular/core';
import {FileService} from '../../service/file.service';
import * as ChartJsChart from 'chart.js';
import {DataService} from '../../service/data.service';
import {AnalyticData} from '../../objects/data/analytic-data';
import {Run} from '../../objects/run';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChartComponent {

  private showingChart: ChartJsChart;
  showingData: AnalyticData;

  constructor(public fileService: FileService,
              public dataService: DataService) {
  }

  public getData(): Run {
    return this.fileService.getShowingRun();
  }

  public updateChart(data: AnalyticData): void {
    const chart = data.chart;

    this.showingData = data;
    this.destroyToPreventJumpingChart();
    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');
    this.showingChart = new ChartJsChart(ctx, chart.getChart(this.getData().getSteps()));
    this.showingData.chart.afterChartDisplayed(this.showingChart);
  }

  // todo 在 hover 時還是會一直亂跳圖表，看網路上的資料好像是要完全移除 html element 重新創一個
  private destroyToPreventJumpingChart(): void {
    if (this.showingChart) {
      this.showingChart.destroy();
    }
  }
}
