import React from "react";
import { Steps, List, Spin, Button, Avatar, Icon } from 'antd';
import styles from './PublishList.less';
import $ from 'jquery';

const listData = [];
for (let i = 0; i < 5; i++) {
	listData.push({
		href: 'http://ant.design',
		title: `ant design part ${i}`,
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
		content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
	});
}


export default class PublishList extends React.Component {

	state = {
		loading: true,
		loadingMore: false,
		showLoadingMore: true,
		data: [],
	}
	// componentDidMount() {
	// 	let data = this.getData();
	// 	console.log("data", data);
	// 	this.setState({
	// 		data: data
	// 	});
	// }

	// getData = (callback) => {
	// 	const listData = [];
	// 	for (let i = 0; i < 5; i++) {
	// 		listData.push({
	// 			href: 'http://ant.design',
	// 			title: `ant design part ${i}`,
	// 			avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
	// 			description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
	// 			content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
	// 		});
	// 	}
	// 	return listData;
	// }

	render() {
		const pagination = {
			pageSize: 10,
			current: 1,
			total: listData.length,
			onChange: (() => {}),
		};

		const IconText = ({ type, text }) => (
			<span>
		    <Icon type={type} style={{ marginRight: 8 }} />
		    {text}
		  </span>
		);
		return (
			<div>
				<List
			    itemLayout="vertical"
			    size="large"
			    pagination={pagination}
			    dataSource={listData}
			    renderItem={item => (
			      <List.Item
			        key={item.title}
			        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
			        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
			      >
			        <List.Item.Meta
			          avatar={<Avatar src={item.avatar} />}
			          title={<a href={item.href}>{item.title}</a>}
			          description={item.description}
			        />
			        {item.content}
			      </List.Item>
			    )}
			  />
			</div>
		);
	}
}