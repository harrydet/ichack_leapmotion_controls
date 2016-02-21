google.charts.setOnLoadCallback(updateLineChart);

var data_array = [];

var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var year = 2000;

var maxYearLineGraph = 2015;
var minYearLineGraph = 1999;

var month = 1;

var base = ['EUR', 'PLN', 'GBP', 'USD', 'CHF'];
var currentBase = 0;
var maxBase = base.length;

var symbolSet = ['PLN', 'GBP', 'USD', 'CHF'];
var numberOfSymbols = 4;

function updateLineChart(){

    var i;

    var data = new google.visualization.DataTable();

    //var symbolArray = symbols.split(',');

    data.addColumn('number', 'Date');
    for (i = 0; i < numberOfSymbols; i++) {

        data.addColumn('number', symbolSet[i]);
    }

    var count = 0;

    for (i = 1; i <= dayInMonth[month - 1]; i++) {

        (function(_i){$.getJSON('http://api.fixer.io/' + year + '-' + ((month < 10) ? '0' + month : month)
            + '-' + ((i < 10) ? '0' + i : i) + '?base=' + base[currentBase] + '&symbols=' + symbolSet.slice(0, numberOfSymbols).join(','), function (_data) {

            var _array = [];
            _array.push(_i);

            Object.keys(_data.rates).forEach(function (key) {

                _array.push(_data.rates[key]);
            });

            data.addRow(_array);

            count++;
            if(count >= dayInMonth[month - 1]){
                var chart = new google.charts.Line(document.getElementById('chart1'));
                chart.draw(data, options);
            }
        });})(i);
    }

    var options = {
        chart: {
            title: 'Currency rates of popular currencies against ' + base[currentBase],
            subtitle: 'in ' + month + '/' + year
        },
        width: 900,
        height: 500,
        axes: {
            x: {
                0: {side: 'bottom'}
            }
        }
    };
}

function incrementMonthLineChart() {

    if(month < 12) {

        month++;
    }
    else {

        if(year < maxYearLineGraph) {

            year++;
            month = 1;
        }
    }
    updateLineChart();
}

function decrementMonthLineChart() {

    if(month > 1) {

        month--;
    }
    else {

        if(year > minYearLineGraph) {

            year--;
            month = 12;
        }
    }
    updateLineChart();
}

function updateSymbolSet() {

    if(currentBase == 0) {

        symbolSet = ['PLN', 'GBP', 'USD', 'CHF'];
    }
    else if(currentBase == 1) {

        symbolSet = ['EUR', 'GBP', 'USD', 'CHF'];
    }
    else if(currentBase == 2) {

        symbolSet = ['PLN', 'EUR', 'USD', 'CHF'];
    }
    else if(currentBase == 3) {

        symbolSet = ['PLN', 'GBP', 'EUR', 'CHF'];
    }
    else {

        symbolSet = ['PLN', 'GBP', 'USD', 'EUR'];
    }
}

function rightChangeBase() {

    currentBase = (currentBase + 1) % maxBase;

    updateSymbolSet();

    updateLineChart();
}

function leftChangeBase() {

    if(currentBase <= 0) {

        currentBase = maxBase - 1;
    }
    else {

        currentBase--;
    }

    updateSymbolSet();

    updateLineChart();
}

function addSymbol() {

    console.log(numberOfSymbols + 'A');

    if(numberOfSymbols < 4) {

        numberOfSymbols++;

        updateLineChart();
    }
}

function removeSymbol() {

    console.log(numberOfSymbols + 'R');

    if(numberOfSymbols > 1) {

        numberOfSymbols--;

        updateLineChart();
    }
}

function loopSymbol() {

    if(numberOfSymbols >= 4) {

        numberOfSymbols = 1;
    }
    else {

        numberOfSymbols++;
    }

    updateLineChart();
}