google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(drawCharts);
function drawCharts() {
  // actual bar chart data
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
  // set bar chart options
  var barOptions = {
    focusTarget: "category",
    backgroundColor: "transparent",
    colors: ["cornflowerblue", "tomato"],
    fontName: "Open Sans",
    chartArea: {
      left: 50,
      top: 10,
      width: "100%",
      height: "70%",
    },
    bar: {
      groupWidth: "100%",
    },
    hAxis: {
      textStyle: {
        fontSize: 11,
      },
    },
    vAxis: {
      minValue: 0,
      maxValue: 1500,
      baselineColor: "#DDD",
      gridlines: {
        color: "#DDD",
        count: 4,
      },
      textStyle: {
        fontSize: 11,
      },
    },
    legend: {
      position: "bottom",
      textStyle: {
        fontSize: 12,
      },
    },
    animation: {
      duration: 1200,
      easing: "out",
      startup: true,
    },
  };
  // draw bar chart twice so it animates
  var barChart = new google.visualization.ColumnChart(
    document.getElementById("bar-chart")
  );
  //barChart.draw(barZeroData, barOptions);
  barChart.draw(barData, barOptions);

  // BEGIN LINE GRAPH
  function randomNumber(base, step) {
    return Math.floor(Math.random() * step + base);
  }
  function createData(year, start1, start2, step, offset) {
    var ar = [];
    for (var i = 0; i < 12; i++) {
      ar.push([
        new Date(year, i),
        randomNumber(start1, step) + offset,
        randomNumber(start2, step) + offset,
      ]);
    }
    return ar;
  }
  var randomLineData = [["Year", "Regular Rides", "Unique Rides"]];
  for (var x = 0; x < 7; x++) {
    var newYear = createData(2007 + x, 10000, 5000, 4000, 800 * Math.pow(x, 2));
    for (var n = 0; n < 12; n++) {
      randomLineData.push(newYear.shift());
    }
  }
  var lineData = google.visualization.arrayToDataTable(randomLineData);

  // pie chart data
  var pieData = google.visualization.arrayToDataTable([
    ["Country", "Page Hits"],
    ["Ram", 7242],
    ["Krishna", 4563],
    ["John", 1345],
    ["Venkozi", 946],
  ]);
  // pie chart options
  var pieOptions = {
    backgroundColor: "transparent",
    pieHole: 0.4,
    colors: [
      "cornflowerblue",
      "olivedrab",
      "orange",
      "tomato",
      "crimson",
      "purple",
      "turquoise",
      "forestgreen",
      "navy",
      "gray",
    ],
    fontName: "Open Sans",
    chartArea: {
      width: "100%",
      height: "94%",
    },
    legend: {
      textStyle: {
        fontSize: 13,
      },
    },
  };
  // draw pie chart
  var pieChart = new google.visualization.PieChart(
    document.getElementById("pie-chart")
  );
  pieChart.draw(pieData, pieOptions);
}