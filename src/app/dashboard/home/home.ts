import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const google: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
})
export class DashBoardComponent implements OnInit, AfterViewInit {
    dashboardTitle: string = '';
    someData: string = '0';

    ngOnInit(): void {
        this.dashboardTitle = 'DASHBOARD';
    }

    ngAfterViewInit(): void {
        this.loadGoogleCharts();
    }

    loadGoogleCharts(): void {
        google.load("visualization", "1", { packages: ["corechart"] });
        google.setOnLoadCallback(this.drawCharts);
    }

    drawCharts(): void {
        // The drawing function, move your chart code here
        var barData = google.visualization.arrayToDataTable([
            ["Day", "Regular Rides", "Unique Rides"],
            ["Sun", 1050, 600],
            ["Mon", 1370, 910],
            ["Tue", 660, 400],
            ["Wed", 1030, 540],
            ["Thu", 1000, 480],
            ["Fri", 1170, 960],
            ["Sat", 660, 320],
        ]);

        var barOptions = {
            // Your bar chart options
        };

        var barChart = new google.visualization.ColumnChart(
            document.getElementById("bar-chart")
        );
        barChart.draw(barData, barOptions);

        var pieData = google.visualization.arrayToDataTable([
            ["Country", "Page Hits"],
            ["Ram", 7242],
            ["Krishna", 4563],
            ["John", 1345],
            ["Venkozi", 946],
        ]);

        var pieOptions = {
            // Your pie chart options
        };

        var pieChart = new google.visualization.PieChart(
            document.getElementById("pie-chart")
        );
        pieChart.draw(pieData, pieOptions);
    }
}


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//     selector: 'app-home',
//     templateUrl: './home.html',
//     styleUrls: ['./home.css'],
//   })
//   export class DashBoardComponent implements OnInit {
//     dashboardTitle: string = '';
//     someData: string = '0';
    
//     ngOnInit(): void {
//         this.dashboardTitle = 'DASHBOARD';
//       }
//       firstContainerCards = [
//         { title: 'Card 1', content: 'Content for Card 1' },
//         { title: 'Card 2', content: 'Content for Card 2' },
//         { title: 'Card 3', content: 'Content for Card 3' },
//         { title: 'Card 4', content: 'Content for Card 4' }
//       ];
//       // Card data for the second container
//       secondContainerCards = [
//         { title: 'Card 1', content: 'Content for Card 1' },
//         { title: 'Card 2', content: 'Content for Card 2' },
//         { title: 'Card 3', content: 'Content for Card 3' },
//         { title: 'Card 4', content: 'Content for Card 4' },
//         { title: 'Card 5', content: 'Content for Card 5' }
//       ];
//     }  