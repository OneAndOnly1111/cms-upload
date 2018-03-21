import React from "react";
import { Steps, List, Spin, Button, Avatar, Icon, Popover, Modal, message, Tooltip } from 'antd';
import styles from './PublishList.less';
import Clipboard from "clipboard";
import $ from 'jquery';
import { queryVideoList, publishVideo, cancelPublishVideo } from '../../services/api';

export default class PublishList extends React.Component {

	state = {
		dataSource: [],
		visible: false,
		totalCount: 0,
		current: 1,
		pageSize: 8,
	}

	componentDidMount() {
		this.getData(this.state.current, this.state.pageSize);
		var clipboard = new Clipboard('.btn');
	}

	getData = (page_num, page_size) => {
		const params = {
			page_num: page_num, //当前页数
			page_size: page_size, //每页条数
		}
		queryVideoList(params).then(res => {
			if (res && res.videos.length) {
				this.setState({
					dataSource: res.videos,
					totalCount: res.videos_total,
				});
			}
		})
	}

	judgePublishVideo = (id, publish_time) => {
		if (publish_time == '未发布') {
			this.publishVideo(id);
		} {
			this.cancelPublish(id);
		}
	}

	publishVideo = (id) => {
		Modal.confirm({
			title: `确认发布视频 ${id} 吗？`,
			content: '该操作不可逆！请谨慎操作！',
			onOk: () => {
				this.setState({ publishing: true });
				publishVideo({ "id": id }).then(res => {
					if (res) {
						if (res.success) {
							message.success("发布成功！", 1, () => { this.getData(this.state.current, this.state.pageSize) });
							this.setState({ publishing: false });
						} else {
							message.error("发布失败！");
							this.setState({ publishing: false });
						}
					}
				})

			}
		});
	}

	cancelPublish = (id) => {
		Modal.confirm({
			title: `确认取消发布 ${id} 吗？`,
			content: '该操作不可逆！请谨慎操作！',
			onOk: () => {
				this.setState({ publishing: true });
				cancelPublishVideo({ "id": id }).then(res => {
					if (res) {
						if (res.success) {
							message.success("取消发布成功！", 1, () => { this.getData(this.state.current, this.state.pageSize) });
							this.setState({ publishing: false });
						} else {
							message.error("取消发布失败！");
							this.setState({ publishing: false });
						}
					}
				})

			}
		});
	}

	delVideo = (id) => {
		Modal.confirm({
			title: `确认删除视频 ${id} 吗？`,
			content: '该操作不可逆！请谨慎操作！',
			onOk: () => {

			}
		});
	}

	onPageChange = (page, pageSize) => {
		this.setState({
			current: page,
			pageSize: pageSize
		});
		this.getData(page, pageSize);
	}

	showModal = (videoOriginal) => {
		console.log("videoOriginal", videoOriginal)
		this.setState({
			visible: true,
			videoOriginal: videoOriginal
		});
	}

	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}

	render() {
		const { dataSource, totalCount, pageSize, current, publishing, visible, videoOriginal } = this.state;
		console.log("published", publishing)
		const pagination = {
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions: ['8', '10', '15', '20'],
			current: current,
			pageSize: pageSize,
			total: this.state.totalCount,
			showTotal: (total, range) => { return `总共 ${total} 条数据，当前显示第${range[0]}-${range[1]} 条` },
			onChange: this.onPageChange,
			onShowSizeChange: this.onPageChange,
		};
		const renderContent = (item) => (
			<div>
		    <p className={styles.p_text}>上传时间：<span className={styles.span_text}>{item.addTime}</span></p>
		    <p className={styles.p_text}>发布时间：<span className={styles.span_text}>{item.publish_time}</span></p>
		    <p className={styles.p_text} >视频口令：<span className={styles.span_text} id={`command_${item.id}`}>{item.code}</span><a className="btn" data-clipboard-target={`#command_${item.id}`}>复制</a></p>
		    <p className={styles.p_text_last}>分享地址：<span className={styles.span_text} id={`shareUrl_${item.id}`}>{item.shareUrl}</span><a className="btn" data-clipboard-target={`#shareUrl_${item.id}`}>复制</a></p>
		  </div>
		);
		return (
			<div style={{padding:'0 26px'}}>
				<List
			    pagination={pagination}
			    dataSource={dataSource}
			    renderItem={item => (
			      <List.Item
			        key={item.id}
			        actions={[
			        	<Button size={"small"} onClick={this.showModal.bind(this,item.videoOriginal)}>播放</Button>,
			        	<Button type={item.publish_time=='未发布'?'primary':(item.publish_time==='审核中'?'default':'danger')} size={"small"} disabled={item.publish_time=='审核中'} onClick={()=>this.judgePublishVideo(item.id,item.publish_time)}>{item.publish_time=='未发布'?'发布':(item.publish_time=='审核中'?'审核中':'取消发布')}</Button>,
								// <Icon type="delete" style={{fontSize:'18px'}} onClick={()=>this.delVideo(item.id)} />,
			        	<Popover content={renderContent(item)} trigger="click" placement="bottomLeft">
						      <Icon type="bars" style={{fontSize:'18px'}} />
						    </Popover>,
			        ]}
			      >
			        <List.Item.Meta
								avatar = { <video width={150} alt="logo" src={item.videoOriginal} /> }
			          title={<a>{item.videoName}</a>}
			          description={<div><p style={{padding:'1% 0'}}>{item.desc=='None' || item.desc}</p><p>{item.playCount} 次播放</p></div>}
			        />
			      </List.Item>
			    )}
			  />
			  <Modal
			  	destroyOnClose
          title="视频播放"
          visible={visible}
          width={800}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
					<video src={videoOriginal} width={750} height={400} autoPlay controls></video>
        </Modal>
			</div>
		);
	}
}