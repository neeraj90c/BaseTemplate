import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { DashboardInputParams, KeyValue } from '../interface/ticket.interface';
import { FormGroup, FormControl } from '@angular/forms';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am5 from '@amcharts/amcharts5/';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
//import * as am5xy from '@amcharts/amcharts5/.internal/charts/xy/axes/';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private _ticketService: TicketService) { }

  today = new Date()
  startDate = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0))
  CategoryWiseCount: KeyValue[] = []
  ClientWiseCount: KeyValue[] = []
  SupportUserWiseCount: KeyValue[] = []
  PriorityWiseCount: KeyValue[] = []
  TicketCount: KeyValue[] = []

  dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  })
  openTicket!:number
  CloseTicket !:number
  InProgressTicket!:number
  ReOpenTicket!:number
  TotalTicket!:number


  ngOnInit(): void {
    let data: DashboardInputParams = {
      startDate: this.startDate,
      endDate: this.today
    }
    this._ticketService.getAdminDashboard(data).subscribe(res => {
      this.CategoryWiseCount = res.categoryWiseCount
      this.ClientWiseCount = res.clientWiseCount
      this.SupportUserWiseCount = res.supportUserWiseCount
      this.PriorityWiseCount = res.priorityWiseCount
      this.TicketCount = res.ticketCount

      if(this.TicketCount){
        this.openTicket = this.TicketCount?.find((ticket) => ticket.key === "Open")?.value as number;
        this.CloseTicket = this.TicketCount?.find((ticket) => ticket.key === "Close")?.value as number;
        this.InProgressTicket = this.TicketCount?.find((ticket) => ticket.key === "InProgress")?.value as number;
        this.ReOpenTicket = this.TicketCount?.find((ticket) => ticket.key === "ReOpen")?.value as number;
        this.TotalTicket = this.TicketCount?.find((ticket) => ticket.key === "Total")?.value as number;
      }
this.readyCategoryWise(res.categoryWiseCount)
this.readyPriorityWisePieChart(res.priorityWiseCount)




    })
  }

  SupportDashBoardLoadAdminDashboard() {
    console.log(this.dateForm.value);
    
  }

  readyCategoryWise(dashData:KeyValue[]){
    let data = dashData.filter( (el:any) =>  el.key != "Total" );    
    am4core.ready(function () {
   
        // Themes begin
        am4core.useTheme(am4themes_animated);
   
        var chart = am4core.create("CategoryWisePieChart", am4charts.PieChart);
   
        // Add data
        chart.data = data;
   
        // Set inner radius
        chart.innerRadius = am4core.percent(90);
   
        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "key";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 0;
        pieSeries.slices.template.strokeOpacity = 0;
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.colors.list = [
            am4core.color("#F24800"),
            am4core.color("#F89C00")
        ];
   
        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.maxWidth = 300;
        chart.legend.valueLabels.template.align = "right";
        chart.legend.valueLabels.template.textAlign = "end";
        chart.legend.position = "right";
        let markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 10;
        markerTemplate.height = 10;
   
        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
   
    });
  }

  readyPriorityWisePieChart(dashData:KeyValue[]){
    let data = dashData.filter( (el:any) =>  el.key != "Total" );    
    am4core.ready(function () {

      // Themes begin
      am4core.useTheme(am4themes_animated);
  
      var chart = am4core.create("PriorityWisePieChart", am4charts.PieChart);
  
      // Add data
      chart.data = data;
  
      // Set inner radius
      chart.innerRadius = am4core.percent(90);
  
      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "key";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 0;
      pieSeries.slices.template.strokeOpacity = 0;
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      pieSeries.colors.list = [
          am4core.color("#F24800"),
          am4core.color("#F89C00")
      ];
  
      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.maxWidth = 300;
      chart.legend.valueLabels.template.align = "right";
      chart.legend.valueLabels.template.textAlign = "end";
      chart.legend.position = "right";
      let markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 10;
      markerTemplate.height = 10;
  
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
  
  });
  }


// readyClientWiseChart(dashData:KeyValue[]): void {
//     am5.array.each(am5.registry.rootElements, function (root) {
//         if (root && root.dom && root.dom.id && root.dom.id === "ClientWiseChart") {
//             root.dispose();
//         }
//     });

//     // Client wise chart
//     am5.ready(function () {
//         // Create root element
//         const root = am5.Root.new("ClientWiseChart");

//         // Set themes
//         root.setThemes([am5themes_Animated.new(root)]);

//         // Create chart
//         const chart = root.container.children.push(am5xy.XYChart.new(root, {
//             panX: true,
//             panY: true,
//             wheelX: "panX",
//             wheelY: "zoomX",
//             pinchZoomX: true,
//             paddingLeft: 0,
//             paddingRight: 1,
//         }));

//         // Add cursor
//         const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
//         cursor.lineY.set("visible", false);

//         // Create axes
//         const xRenderer = am5xy.AxisRendererX.new(root, {
//             minGridDistance: 30,
//             minorGridEnabled: true,
//         });

//         xRenderer.labels.template.setAll({
//             rotation: -90,
//             centerY: am5.p50,
//             centerX: am5.p100,
//             paddingRight: 15,
//         });

//         xRenderer.grid.template.setAll({
//             location: 1,
//         });

//         const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
//             maxDeviation: 0.3,
//             categoryField: "key",
//             renderer: xRenderer,
//             tooltip: am5.Tooltip.new(root, {}),
//         }));

//         const yRenderer = am5xy.AxisRendererY.new(root, {
//             strokeOpacity: 0.1,
//         });

//         const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//             maxDeviation: 0.3,
//             renderer: yRenderer,
//         }));

//         // Create series
//         const series = chart.series.push(am5xy.ColumnSeries.new(root, {
//             name: "Series 1",
//             xAxis: xAxis,
//             yAxis: yAxis,
//             valueYField: "totalTickets",
//             sequencedInterpolation: true,
//             categoryXField: "key",
//             tooltip: am5.Tooltip.new(root, {
//                 labelText: "{valueY}",
//             }),
//         }));

//         series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
//         series.columns.template.adapters.add("fill", function (fill, target) {
//             return chart.get("colors").getIndex(series.columns.indexOf(target));
//         });

//         series.columns.template.adapters.add("stroke", function (stroke, target) {
//             return chart.get("colors").getIndex(series.columns.indexOf(target));
//         });

//         // Set data
//         xAxis.data.setAll(dashData);
//         series.data.setAll(dashData);

//         // Make stuff animate on load
//         series.appear(1000);
//         chart.appear(1000, 100);
//     });
// }


}
