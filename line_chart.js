google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(updateChart);

var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var year = 2000;

var maxYear = 2015;
var minYear = 1999;

var month = 1;

var base = 'EUR';

var symbols = 'PLN,GBP,USD';

function updateChart(){

    var i;

    var data = new google.visualization.DataTable();

    var symbolArray = symbols.split(',');

    data.addColumn('number', 'Date');
    for (i = 0; i < symbolArray.length; i++) {

        data.addColumn('number', symbolArray[i]);
    }

    var count = 0;

    for (i = 1; i <= dayInMonth[month - 1]; i++) {

        (function(_i){$.getJSON('http://api.fixer.io/' + year + '-' + ((month < 10) ? '0' + month : month)
            + '-' + ((i < 10) ? '0' + i : i) + '?base=' + base + '&symbols=' + symbols, function (_data) {

            var _array = [];
            _array.push(_i);

            Object.keys(_data.rates).forEach(function (key) {

                _array.push(_data.rates[key]);
            });

            data.addRow(_array);

            count++;
        });})(i);
    }

    var options = {
        chart: {
            title: 'Currency rates of popular currencies against ' + base,
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

    while(count < dayInMonth[month - 1]) {

    }

    var chart = new google.charts.Line(document.getElementById('chart'));
    chart.draw(data, options);
}

function incrementMonth() {

    if(month < 12) {

        month++;
    }
    else {

        if(year < maxYear) {

            year++;
            month = 1;
        }
    }
    updateChart();
}

function decrementMonth() {

    if(month > 1) {

        month--;
    }
    else {

        if(year > minYear) {

            year--;
            month = 12;
        }
    }
    updateChart();
}

