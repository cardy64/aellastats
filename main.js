let chart = null;

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

            // [row[0], row[2]] = [row[2], row[0]];
            // [row[0], row[1]] = [row[1], row[0]];

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

    let TESTER = document.getElementById('chart_div');

    info.splice(0, 1);
    info.splice(0, 1);

    let trace1 = {
        x: info.map(row => parseFloat(row[1])),
        y: info.map(row => parseFloat(row[2])),
        mode: 'markers',
        type: 'scatter',
        name: 'DATA',
        text: info.map(row => row[0]),
        marker: { size: 12 }
    };

    let data = [trace1];

    let layout = {
        // xaxis: {
        //     range: [ 0.75, 5.25 ]
        // },
        // yaxis: {
        //     range: [0, 8]
        // },

        xaxis: {
            title: 'Social Visibility',
            gridwidth: "2",
        },
        yaxis: {
            title: 'Reported Prevalence',
            color: "#000000",
            gridwidth: "2",
        },
        title:'Social Visibility vs. Reported Prevalence'
    };

    Plotly.newPlot(
        TESTER,
        data,
        layout);

    window.onresize = resize;

    resize();

    function resize () {
        Plotly.Plots.resize(TESTER);
    }
}

getData();

