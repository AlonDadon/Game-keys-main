import { Doughnut, Bar, PolarArea } from 'react-chartjs-2'

export function Chart({ type, labels, label, datas }) {
    const data = {
        // labels: Object.keys(mapObj),
        labels,
        datasets: [
            {
                label,
                data:datas,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
        options: {
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: 'white'
                }
            }
        }
    }
    switch (type) {
        case 'doughnut':
            return < Doughnut data={data} />
        case 'polarArea':
            return < PolarArea data={data} />
        case 'bar':
            return < Bar data={data} width={100} height={100}/>
        default:
            return < Doughnut data={data} />
    }
}