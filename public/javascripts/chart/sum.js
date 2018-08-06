var sum_chart = (function (){

    const   SUM_IDX_COUNT = 30,
            START_LEGEND = 0,
            END_LEGEND = 300;

    drawSumChart = (legends, sum_datas, colors) => {
        new Chart(document.getElementById("sum-chart"), {
            type: 'bar',
            data: {
                labels: legends,
                datasets: [{
                    data: sum_datas,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total Sum(Lotto Num) Count'
                }
            }
        });
    }

    initSumResult = () => {
        var result = [];    
        for ( var i=0 ; i<SUM_IDX_COUNT ; i++ ) 
            result.push(0);
        return result;
    }

    setBackgroundColor = () => {
        var result = [];
        for( var i=0 ; i<SUM_IDX_COUNT ; i=i+5 ) {
            result.push("rgba(255, 99, 132, 0.2)");
            result.push("rgba(54, 162, 235, 0.2)");
            result.push("rgba(255, 206, 86, 0.2)");
            result.push("rgba(75, 192, 192, 0.2)");
            result.push("rgba(153, 102, 255, 0.2)");
            result.push("rgba(255, 159, 64, 0.2)");
        }

        return result;
    }

    getSumTotal = () => {
        var result = initSumResult();

        $.ajax({ 
            type: "GET",
            dataType: "json",
            async: false,
            url: "/lotto/sum/total",
            success: function(lottos){
                if( lottos.length == 0 ) return;
                lottos.map(function(sum) { 
                    result[ Math.floor(sum.sum / 10) ]++;
                });
            }
        });

        return result;
    }

    getLegends = () => {
        var result = [];

        for( var i=START_LEGEND ; i<END_LEGEND ; i = i+10 ) {
            result.push(i + " - " + (i+9));
        }

        return result;
    }

    draw = () => {
        var legends     = getLegends(),
            sum_datas   = getSumTotal(),
            colors      = setBackgroundColor();

        drawSumChart(legends, sum_datas, colors);
    }

    return { draw }
}());

sum_chart.draw();