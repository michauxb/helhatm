$(function () {
    // Create the chart
    console.log('plot.js');

    // Get values
    $.ajax({
        type: "POST",
        url: "/values",
        dataType: "json",
        success: function (response) {
            console.log(response);

            const labels = response.map((item) => item.rating);
            const data = response.map((item) => item._count.rating);

            // Create the chart
            const ctx = document.getElementById('plot');
            let plot = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# films',
                        data: data,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });


        }
    });




});