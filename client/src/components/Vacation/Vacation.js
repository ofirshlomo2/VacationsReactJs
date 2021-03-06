
import './card.css';
import { format } from 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';




// [<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]

const { Meta } = Card;

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));


function Vacation(props) {
	const { vacation, actions } = props;

	const classes = useStyles();

	return (
		<div className="card">
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							New
          </Avatar>
					}
					title={vacation.destination}
					subheader={format(new Date(vacation.startDate), 'MM/dd/yyyy')}
				/>
				<CardMedia
					className={classes.media}
					image={`http://localhost:5000/${vacation.image}`}

				/>
				<CardContent>
					<Typography>
						<p>Price: {vacation.price}$</p>
						<p>Description: {vacation.description}</p>
						<p>End: {format(new Date(vacation.endDate), 'MM/dd/yyyy')}</p>
					</Typography>
				</CardContent>
				<CardActions >
					{actions}
				</CardActions>

			</Card>
		</div >
	);
}

export default Vacation;





