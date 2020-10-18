import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { StatisticsService } from 'src/app/shared/statistics.service';
import { SitesService } from 'src/app/shared/sites.service';

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
  public siteNames: string[];
  public budgets: any[];

  public isLoadingPieChart: boolean;

  //pie chart initialization
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

  //bar chart initialization
  public myChart;
  public labels;
  public values;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [12, 99, 35, 20, 32, 33, 56, 78, 65, 29, 92, 8],
      label: 'Available Budgets',
    },
  ];

  constructor(
    private statisticsService: StatisticsService,
    private siteService: SitesService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  //method to load all details for charts
  ngOnInit(): void {
    this.siteNames = new Array<string>();
    this.budgets = new Array<Number>();
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

    this.siteService
      .getAllSiteNamesAndBudgets()
      .subscribe((res: APIResponse) => {
        console.log(res.data);
        var stringified = JSON.stringify(res.data);
        var json = JSON.parse(stringified);
        //var json = JSON.parse(res.data);

        this.labels = json.map(function (e) {
          return e.siteName;
        });
        console.log(this.labels);
        this.barChartLabels = this.labels;

        this.values = json.map(function (e) {
          return e.budget / 10000; // Divide to billions in units of ten
        });
        console.log(this.values);
      });
  }
}
