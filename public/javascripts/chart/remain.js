var remain_chart = (function(window) {
    const   START_LOTTO_NUM = 1,
            END_LOTTO_NUM = 45,
            COLOR_COUNT = 45;
    
    const   REMAIN_HEIGHT = 10,
            NOT_REMAIN_HEIGHT = 0;

    drawRemainChart = (legends, remain_datas, colors) => {
        new Chart(document.getElementById("remain-chart"), {
            type: 'bar',
            data: {
                labels: legends,
                datasets: [{
                    data: remain_datas,
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

    initNumCount = () => {
        var result = [];    
        for ( var i=0 ; i<END_LOTTO_NUM+1 ; i++ ) 
            result.push(0);
        return result;
    }

    setBackgroundColor = () => {
        var result = [];
        for( var i=0 ; i<COLOR_COUNT ; i=i+5 ) {
            result.push("rgba(255, 99, 132, 0.2)");
            result.push("rgba(54, 162, 235, 0.2)");
            result.push("rgba(255, 206, 86, 0.2)");
            result.push("rgba(75, 192, 192, 0.2)");
            result.push("rgba(153, 102, 255, 0.2)");
        }

        return result;
    }

    getTentimesLotto = () => {
        var count = initNumCount();

        $.ajax({ 
            type: "GET",
            dataType: "json",
            async: false,
            url: "/lotto/remain/tentimes",
            success: function(remains){
                remains.map(function(remain) {
                    count[remain.num_1]++;
                    count[remain.num_2]++;
                    count[remain.num_3]++;
                    count[remain.num_4]++;
                    count[remain.num_5]++;
                    count[remain.num_6]++;
                });
            }
        });

        return count;
    }

    getRemainData = (tentimes_data) => {
        var result = [];

        for( var i=START_LOTTO_NUM ; i<=END_LOTTO_NUM ; i++ ) {
            if( tentimes_data[i] == 0 ) {
                result.push(REMAIN_HEIGHT);
            } else {
                result.push(NOT_REMAIN_HEIGHT);
            }
        }

        return result;
    }

    getLegends = () => {
        var result = [];

        for( var i=START_LOTTO_NUM ; i<=END_LOTTO_NUM ; i++ ) {
            result.push(i);
        }

        return result;
    }


    var colors          = setBackgroundColor(),
        legends         = getLegends(),
        tentimes_lotto  = getTentimesLotto(),
        remain_datas    = getRemainData(tentimes_lotto);

    draw = () => {            
        drawRemainChart(legends, remain_datas, colors);
    }

    window.remain_datas = remain_datas;
    return { draw }

}(window));

remain_chart.draw();