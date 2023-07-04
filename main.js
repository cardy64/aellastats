google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(getData);

function getData() {

    let link = "db.csv";

    function parseCSV(csv) {
        const lines = csv.split("\r\n");

        const data = [];

        for (let i = 0; i < lines.length; i++) {
            const row = lines[i].split(',');
            for (let j = 1; j < row.length; j++) {
                const parsed = parseFloat(row[j]);
                if (!isNaN(parsed)) {
                    row[j] = parsed;
                }
            }

            [row[0], row[2]] = [row[2], row[0]];
            [row[0], row[1]] = [row[1], row[0]];

            data.push(row);
        }

        return data;
    }

    fetch(link)
        .then(response => response.text())
        .then(csvData => {
            drawChart(parseCSV(csvData));
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function drawChart(info) {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y');
    data.addColumn({type: 'string', role: 'tooltip'});

    var options = {
        title: 'Epic Title Here',
        hAxis: {
            title: info[0][0],
            titleTextStyle: {
                fontName: 'Arial',
                fontSize: 14,
                italic: false,
                color: "#1c525e",
            },
            gridlines: {
                color: '#dddddd',
            },
            minorGridlines: {
                color: "transparent"
            }
        },
        vAxis: {
            title: info[0][1],
            titleTextStyle: {
                fontName: 'Arial',
                fontSize: 14,
                italic: false,
                color: "#1c525e",
            },
            gridlines: {
                color: '#9e9e9e',
            },
            minorGridlines: {
                color: "transparent"
            }
        },
        tooltip: { isHtml: true },
        series: {
            0: {
                pointSize: 8,
                color: 'magenta'
            }
        },
        legend: "none"
    };

    info.splice(0, 1);
    info.splice(0, 1);

    data.addRows([
        ...info
    ]);

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}