drawOddEvenChart = (legends, datas) => {   
    new Chart(document.getElementById("odd-even-chart"), {
        type: 'horizontalBar',
        data: {
            labels: legends,
            datasets: [{
                label: "ODD",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                data: datas.odd,
            }, {
                label: "EVEN",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                data: datas.even
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

getOddEvenDatas = () => {
    var result = {
        odd: [],
        even: []
    };
    
    $.ajax({ 
        type: "GET",
        dataType: "json",
        async: false,
        url: "/lotto/oddeven/tentimes",
        success: function(oddevens){ 
            oddevens.map(function(oddeven) {
                result.odd.push(0 - oddeven.odd);
                result.even.push(oddeven.even);
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
        datas       = getOddEvenDatas();

    drawOddEvenChart(legends, datas);
}());