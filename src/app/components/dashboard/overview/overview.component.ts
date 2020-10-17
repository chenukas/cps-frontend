import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { StatisticsService } from 'src/app/shared/statistics.service';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  public isLoadingPieChart: boolean;

  public requisitionsCounts: any;
  public approvedReqCount: any;
  public declinedReqCount: any;
  public pendingReqCount: any;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Approved'], ['Pending'], ['Declined']];
  public pieChartData: SingleDataSet = [2, 7, 3];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['#f69223', '#1f3146', '#f8f8f8'],
    },
  ];

  constructor(private statisticsService: StatisticsService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.requisitionsCounts = [];

    this.statisticsService
      .getRequisitionsByStatus()
      .subscribe((res: APIResponse) => {
        this.approvedReqCount = res.data.approvedReqCount;
        this.declinedReqCount = res.data.declinedReqCount;
        this.pendingReqCount = res.data.pendingReqCount;

        this.requisitionsCounts.push(this.approvedReqCount);
        this.requisitionsCounts.push(this.pendingReqCount);
        this.requisitionsCounts.push(this.declinedReqCount);

        this.pieChartData = this.requisitionsCounts;
      });
  }
}
