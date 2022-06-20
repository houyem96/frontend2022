import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  highcharts = Highcharts;
  chartOptions = {};


  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false,
       
      },
      title: {
        text: "Number of employees by gender"
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',

          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: '%',
         data: [
            ['Tunis',   10.0],
           
            {
               name: 'Manubah',
               y: 12.0,
               sliced: true,
               selected: true
            
        }
              ,{name: 'Béja',
              y: 10.0,
              sliced: true,
              selected: true
           }
           ,{
            name: 'Ben Arous',
            y: 5.0,
            sliced: true,
            selected: true
         }
         ,{
          name: 'Bizerte',
          y: 5.0,
          sliced: true,
          selected: true
       }
       ,{
        name: 'Jendouba',
        y: 5.0,
        sliced: true,
        selected: true
     }
     ,{
      name: 'Nabeul',
      y: 5.0,
      sliced: true,
      selected: true
   }
   ,{
    name: 'Le Kef',
    y: 5.0,
    sliced: true,
    selected: true
 }
 ,{
  name: 'Kassérine',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Gabès',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Gafsa',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Sidi Bou Zid',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Sfax',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Siliana',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Mahdia',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Monastir',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Kairouan',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Sousse',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Zaghouan',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Médenine',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Kebili',
  y: 5.0,
  sliced: true,
  selected: true
}
,{
  name: 'Tataouine',
  y: 1.0,
  sliced: true,
  selected: true
}
         ]
      }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
