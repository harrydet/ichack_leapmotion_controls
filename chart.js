google.charts.load('current', {'packages':['corechart', 'line']});
google.charts.setOnLoadCallback(createChart);

xName = 'Currency';
yName = 'EUR';

var maxYear = 2015;
var minYear = 1999;

var data;
var options;
var allData;

var currentDataOffset = 0;

function createChart() {
    getAllData(minYear, maxYear, "EUR", function(returned){
        allData = returned;
        currentDataOffset = 1999 - minYear;

        options = {
            title: 'Data for year ' + (currentDataOffset + minYear),
            hAxis: {title: xName, maxValue: 5},
            vAxis: {title: yName},
            bubble: {textStyle: {fontSize: 11}}
        };

        data = google.visualization.arrayToDataTable(allData[currentDataOffset]);

        var chart = new google.visualization.BubbleChart(document.getElementById('chart'));
        chart.draw(data, options);
    });
}

function updateChart(){
    options.title = 'Data for year ' + parseInt(currentDataOffset + minYear);
    data = google.visualization.arrayToDataTable(allData[currentDataOffset]);
    var chart = new google.visualization.BubbleChart(document.getElementById('chart'));
    chart.draw(data, options);
}

function incrementYear() {
    if((currentDataOffset + minYear) <= maxYear){
        ++currentDataOffset;
    }
    if(currentDataOffset > maxYear - minYear){
        currentDataOffset = maxYear - minYear;
    }
}

function decrementYear() {
    if((currentDataOffset + minYear) >= minYear){
        --currentDataOffset;
    }

    if(currentDataOffset<0){
        currentDataOffset = 0;
    }
}

function getAllData(minYear, maxYear, currency, callback){
    var totalYears = maxYear - minYear + 1;

    var yearlyData = [];
    var callsRemaining = totalYears;
    for(var i = 0 ; i < totalYears; i++){
        $.getJSON("http://api.fixer.io/" + (minYear + i) + "-09-01", function(data){
            var graphData = [];
            graphData.push(['ID', 'X', 'Y', 'Color', 'Rate']);

            window.fx.rates = data.rates;
            try{
                graphData.push(['GBP', 1, 1, 'UK', fx.convert(1, {from: fx.base, to: "GBP"})]);
            } catch(e) {
                graphData.push(['GBP', 1, 1, 'UK', null]);
            }

            try {
                graphData.push(['USD', 2, 1, 'Murica',  fx.convert(1, {from: fx.base, to: "USD"})]);
            } catch (e){
                graphData.push(['USD', 2, 1, 'Murica', null]);
            }

            try{
                graphData.push(['TRY', 3, 1, 'Turkey',  fx.convert(1, {from: fx.base, to: "TRY"})]);
            } catch (e){
                graphData.push(['TRY', 3, 1, 'Turkey',  null]);
            }

            try{
                graphData.push(['AUD', 4, 1, 'Australia',  fx.convert(1, {from: fx.base, to: "AUD"})]);
            } catch (e){
                graphData.push(['AUD', 4, 1, 'Australia',  null]);
            }

            try {
                graphData.push(['CAD', 4, 1, 'Canada',  fx.convert(1, {from: fx.base, to: "CAD"})]);
            } catch (e){
                graphData.push(['CAD', 4, 1, 'Canada',  null]);
            }

            try {
                graphData.push(['RUB', 4, 1, 'Russia',  fx.convert(1, {from: fx.base, to: "RUB"})]);
            } catch (e){
                graphData.push(['RUB', 4, 1, 'Russia',  null]);
            }

            yearlyData.push(graphData);

            --callsRemaining;
            if(callsRemaining <= 0){
                callback(yearlyData);
            }
        });
    }
}

