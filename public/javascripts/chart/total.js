var sum_chart = (function (){

    const   SUM_IDX_COUNT = 30,
            START_LEGEND = 0,
            END_LEGEND = 300,
            START_LOTTO_NUM = 1,
            END_LOTTO_NUM = 45,
            START_CARD_INDEX = 0,
            END_CARD_INDEX = 5,
            END_TABLE_INDEX = 10,
            NEWLINE_NUMBER = 7;

    drawTotalSumChart = (legends, total_sum_datas, colors) => {
        new Chart(document.getElementById("sum-chart"), {
            type: 'bar',
            data: {
                labels: legends,
                datasets: [{
                    data: total_sum_datas,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: false,
                    text: 'Total Sum(Lotto Num) Count'
                }
            }
        });
    }

    drawWinnerCards = (legends, winner_nums) => {
        var i, j, k, isWinner = [];

        for( i=START_CARD_INDEX ; i<END_CARD_INDEX ; i++ ) {

            isWinner = [];
            for( j=START_LOTTO_NUM ; j<=END_LOTTO_NUM + 1 ; j++ ) {
                isWinner.push(0);
            }
            
            for( j=0 ; j<winner_nums[i].length ; j++ ) {
                isWinner[winner_nums[i][j]] = 1;
            }

            var result = 
                '<div class="card winners-card">\
                    <div class="card-header">' + legends[i] + ' 회차</div>\
                        <div class="card-block">\
                            <table>';

            for( j=START_LOTTO_NUM ; j<=END_LOTTO_NUM ; j += NEWLINE_NUMBER ) {
                
                result += "<tr class='card-top'>";
                for( k=j ; k<j+NEWLINE_NUMBER ; k++ ) {
                    if( k > END_LOTTO_NUM ) break;
                    result += "<td>┏━┓</td>";
                }

                result += " </tr>\
                            <tr class='card-num'>";
                for( k=j ; k<j+NEWLINE_NUMBER ; k++ ) {
                    if( k > END_LOTTO_NUM ) break;
                    if(isWinner[k] == 1) result += "<td><span class='active'></span></td>";
                    else result += "<td>" + k + "</td>";
                }

                result += " </tr>\
                            <tr class='card-bottom'>";
                for( k=j ; k<j+NEWLINE_NUMBER ; k++ ) {
                    if( k > END_LOTTO_NUM ) break;
                    result += "<td>┗━┛</td>";                    
                }
            }
            result += " </tr>\
                        </table>\
                        </div>\
                        </div>";

            $("#winner").append(result);
        }
    }

    drawWinnerTable = (legends, winner_nums) => {
        var result = "";

        for( var i=END_CARD_INDEX ; i<END_TABLE_INDEX ; i++ ) {
            result +=   "<tr>   \
                        <td> " + legends[i] + "</td>";
            for( j=0 ; j<winner_nums[i].length ; j++ ) {
                result += "<td>" + winner_nums[i][j] + "</td>";
            }
            result += "</tr>";
        }

        $("#winner_table").append(result);
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

    getTotalDatas = () => {
        var result = {
            sum: initSumResult(),
            nums: [],
            legend: []
        }

        var tmp_nums = [];

        $.ajax({ 
            type: "GET",
            dataType: "json",
            async: false,
            url: "/lotto/total/datas",
            success: function(lottos){
                if( lottos.length == 0 ) return;
                lottos.map(function(item) { 
                    result.sum[ Math.floor(item.sum / 10) ]++;
                    
                    tmp_nums = [];
                    tmp_nums.push(item.num1);
                    tmp_nums.push(item.num2);
                    tmp_nums.push(item.num3);
                    tmp_nums.push(item.num4);
                    tmp_nums.push(item.num5);
                    tmp_nums.push(item.num6);

                    result.nums.push(tmp_nums);

                    result.legend.push(item.legend);
                });
            }
        });

        return result;
    }

    getSumLegends = () => {
        var result = [];

        for( var i=START_LEGEND ; i<END_LEGEND ; i = i+10 ) {
            result.push(i + " - " + (i+9));
        }

        return result;
    }

    draw = () => {
        var legends     = getSumLegends(),
            total_datas = getTotalDatas(),
            colors      = setBackgroundColor();

        drawTotalSumChart(legends, total_datas.sum, colors);
        drawWinnerCards(total_datas.legend, total_datas.nums);
        drawWinnerTable(total_datas.legend, total_datas.nums);
    }

    return { draw }
}());

sum_chart.draw();