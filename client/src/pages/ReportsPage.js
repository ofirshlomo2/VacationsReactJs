import { useRef, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';

import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
} from 'chart.js';

Chart.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip
);

export default () => {
	const canvasRef = useRef(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		async function getVacations() {
			const res = await fetch('/api/vacations/reports');
			const body = await res.json();
			setData(body);
		}
		getVacations();
	}, []);

	useEffect(() => {
		console.log(data);
		var ctx = canvasRef.current.getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: data.map(v => v.destination),
				datasets: [
					{
						label: 'Followeres Dhashboard',
						data: data.map(v => v.count),
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(255, 205, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(201, 203, 207, 0.2)',
						],
						borderColor: [
							'rgb(255, 99, 132)',
							'rgb(255, 159, 64)',
							'rgb(255, 205, 86)',
							'rgb(75, 192, 192)',
							'rgb(54, 162, 235)',
							'rgb(153, 102, 255)',
							'rgb(201, 203, 207)',
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
		return () => myChart.destroy();
	}, [data]);

	return (
		<div className="reportPage">
			<ButtonGroup color="primary" aria-label="outlined primary button group">
				<Link to="/">
					<Button variant="contained" color="primary">
						HomePage
						</Button>
				</Link>
			</ButtonGroup>
			<div style={{ marginBottom:50}}>
				<canvas ref={canvasRef} width="100" height="100" style={{ marginBottom:50}}></canvas>
			</div>
		</div>
	);
};
