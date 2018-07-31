drawLowHighChart = (legends, datas) => {   
    new Chart(document.getElementById("low-high-chart"), {
        type: 'horizontalBar',
        data: {
            labels: legends,
            datasets: [{
                label: "LOW",
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                data: datas.low,
            }, {
                label: "HIGH",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                data: datas.high
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

getLowHighDatas = () => {
    var result = {
        low: [],
        high: []
    };
    
    $.ajax({ 
        type: "GET",
        dataType: "json",
        async: false,
        url: "/lotto/lowhigh/tentimes",
        success: function(lowhighs){ 
            lowhighs.map(function(data) {
                result.low.push(0 - data.low);
                result.high.push(data.high);
            });
        }
    });

    return result;
}

getLegends = () => {
    var result = [];
    
    $.ajax({ 
        type: "GET",
        dataType: "json",
        async: false,
        url: "/lotto/legends/tentimes",
        success: function(legends){ 
            legends.map(function(legend){ result.push(legend.legend); });
        }
    });

    return result;
}

(function (){
    var legends     = getLegends(),
        datas       = getLowHighDatas();

    drawLowHighChart(legends, datas);
}());