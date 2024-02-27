import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-graphical-header',
  templateUrl: './graphical-header.component.html',
  styleUrls: ['./graphical-header.component.scss']
})
export class GraphicalHeaderComponent implements OnChanges {
  Highcharts!: Chart;
  @Input() xAxisArray: any[] = [];
  @Input() yAxisArray: any[] = [];
  @Input() headerData: any;
  @Input() dataLoading: boolean = false;
  @Input() headers: { title: any, data: any }[] = [];
  barCount = 3




  remainingPercentage: any;
  completedPercentage: any;
  timeSpent: any;


  ngOnChanges(changes: SimpleChanges): void {

    if (this.headerData) {
      this.timeSpent = this.DisplayTime(this.headerData.timeSpent);
    }

    this.Highcharts = new Chart({
      chart: {
        type: 'column',
        spacing: [5, 5, 0, 0],
        backgroundColor: undefined
      },
      credits: {
        enabled: false
      },
      title: {
        text: '',
        align: 'left'
      },
      subtitle: {
        text:
          '',
        align: 'left'
      },
      xAxis: {
        categories: this.xAxisArray,
        crosshair: true,
        accessibility: {
          description: 'Countries'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        valueSuffix: ''
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      series: [
        {
          showInLegend: false,
          name: '',
          data: this.yAxisArray,
          type: 'column'
        }
      ]



    })



    am4core.ready(() => {
      // Themes begin
      am4core.useTheme(am4themes_animated);

      var chart = am4core.create("CWA_chart_web", am4charts.PieChart);

      // Calculate the sum of progress values for Completed status
      var completedSum = 0;
      for (var i = 0; i < this.yAxisArray.length; i++) {
        completedSum += this.yAxisArray[i];
      }

      // Calculate the total number of workItemName items
      var totalWorkItems = this.xAxisArray.length;

      // Calculate the value for Remaining status
      var totalProgressSum = totalWorkItems * 100;
      var remainingValue = totalProgressSum - completedSum;

      // Calculate the values out of 100 and round to 2 decimal points
      this.completedPercentage = ((completedSum / totalProgressSum) * 100).toFixed(2);
      this.remainingPercentage = ((remainingValue / totalProgressSum) * 100).toFixed(2);

      // Check if completedPercentage is NaN and assign 0 if true
      this.completedPercentage = isNaN(this.completedPercentage) ? 0 : this.completedPercentage;

      // Check if remainingPercentage is NaN and assign 0 if true
      this.remainingPercentage = isNaN(this.remainingPercentage) ? (100 - this.completedPercentage) : this.remainingPercentage + "%";

      this.completedPercentage = this.completedPercentage + "%";
      // document.getElementById("remainingId").innerText = remainingPercentage + "%";
      // document.getElementById("timeSpent").innerText = timeSpent;


      // Add data
      chart.data = [{
        "status": "Completed",
        "values": this.completedPercentage
      }, {
        "status": "Remaining",
        "values": this.remainingPercentage
      }];

      // Set inner radius
      chart.innerRadius = am4core.percent(90);

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "values";
      pieSeries.dataFields.category = "status";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 0;
      pieSeries.slices.template.strokeOpacity = 0;
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      pieSeries.colors.list = [
        am4core.color("#e9621f"),
        am4core.color("#f9f8fa")
      ];

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

    });


  }

  DisplayTime(ticks: number): string {
    const ticksInSec: number = ticks / 1000;
    const hh: number = Math.floor(ticksInSec / 3600);
    const mm: number = Math.floor((ticksInSec % 3600) / 60);
    // const ss = ticks % 60;
    return this.pad(hh, 2) + ":" + this.pad(mm, 2);
  }

  pad(n: number, width: number): string {
    const strN: string = n.toString();
    return strN.length >= width ? strN : "0".repeat(width - strN.length) + strN;
  }



}
