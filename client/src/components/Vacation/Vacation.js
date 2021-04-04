import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './card.css';
import { format } from 'date-fns';

// [<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]

const { Meta } = Card;

function Vacation(props) {
	const { vacation, actions } = props;

	return (
		<div className="card">
			<Card
				style={{ width: 300}}
				cover={<img alt="example" src={`http://localhost:5000/${vacation.image}`} />}
				actions={actions}>
				<Meta title={vacation.destination} description={vacation.description} />
				<p>price: {vacation.price}</p>
				<p>start: {format(new Date(vacation.startDate), 'MM/dd/yyyy')}</p>
				<p>end: {format(new Date(vacation.endDate), 'MM/dd/yyyy')}</p>

			</Card>
		</div>
	);
}

export default Vacation;
