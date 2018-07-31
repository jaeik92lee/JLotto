drawTotalChart = (legends, sum_datas, avg_datas) => {
    new Chart(document.getElementById("total-chart"), {
        type: 'bar',
        data: {
            labels: legends,
            datasets: [{
                label: "AVG",
                type: "line",
                borderColor: "#8e5ea2",
                data: avg_datas,
                fill: false
            }, {
                label: "SUM",
                type: "bar",
                backgroundColor: "rgba(0,0,0,0.5)",
                backgroundColorHover: "#3e95cd",
                data: sum_datas
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Population growth (millions): Europe & Africa'
            },
            legend: { display: false },
        }
    });
}

getSumTotal = () => {
    var result = [];
    
    $.ajax({ 
        type: "GET",
        dataType: "json",
        async: false,
        url: "/lotto/sum/total",
        success: function(lottos){
            lottos.map(function(sum) { result.push(sum.sum); });
        }
    });

    return result;
}

getAvgTotal = () => {
    var result = [];
    
    $.ajax({ 
        type: "GET",
        dataType: "json",
        async: false,
        url: "/lotto/avg/total",
        success: function(lottos){ 
            lottos.map(function(avg) { result.push(avg.avg); });
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
        url: "/lotto/legends",
        success: function(lottos){ 
            lottos.map(function(legend) { result.push(legend.legend); });
        }
    });

    return result;
}

(function (){
    var legends     = getLegends(),
        sum_datas   = getSumTotal(),
        avg_datas   = getAvgTotal();

    drawTotalChart(legends, sum_datas, avg_datas);
}());