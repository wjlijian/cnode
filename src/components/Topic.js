import React from 'react'
import axios from 'axios'
import {url} from '../config'
import {Spin,message,Card,Avatar,BackTop, Input,Button,Icon,Modal} from 'antd'

import moment from 'moment';

class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data:null,
			comment:'',
			visible:false,
			reply:'',
			replyInfo:null
		}
	}
	getData(){
			let id = this.props.match.params.id
		axios.get(`${url}/topic/${id}`)
		.then(res=>this.setState({data:res.data.data}))
		.catch(err=>message.error('数据请求失败'))
	}
	componentDidMount(){
		this.getData()
	}
	handleComment(type){
		if(sessionStorage.accesstoken) {
			var accesstoken=sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
			 if (type==='comment') {
			 	var content=this.state.comment;
			 }else{
			 	var content=this.state.reply;

			 }
		
			let data={
				accesstoken,
				comment
			}
			
			let id = this.state.data.id
			axios.post(`${url}/topic/${id}/replies`,data)
			.then(res=>{
				this.setState({comment:''})
				this.getData()
				if (type==='reply')this.setState({visible:false})
			})
			.catch(err=>message.error('评论失败'))
	}
	showReply(reply){
		console.log(reply)

			this.setState({visible:true,replyInfo:reply,reply:`@${reply.author.loginname} `})
	}
	handleLike(reply_id){
			if(sessionStorage.accesstoken) {
			var accesstoken=sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken})
		.then(res=>this.getData())
		.catch(err=>message.error('评论失败'))
	}
	render(){
		let {data,comment,visible,reply,replyInfo} =this.state
		return(
			<div style={{padding:'10px'}}>
				<Card loading={!data}>
				{
					data?(
					<div>
						<h1 style={{textAlign:'center'}}>{data.title}</h1>
						<div className='desc'>
							<Avatar src={data.author.avatar_url}/>&nbsp;&nbsp;
							<span>回复量：{data.reply_count}</span>&nbsp;&nbsp;
							<span>阅读量：{data.visit_count}</span>
						</div>
						<div dangerouslySetInnerHTML={{__html:data.content}}/>
						<h1 className='ping'>发表评论</h1>
						<Input type='textarea' rows={4} value={comment} onChange={e=>this.setState({comment:e.target.value})} placeholder='请输入内容...'/>
						<Button className='ti' type='primary' onClick={this.handleComment.bind(this,'comment')}>提交</Button>
						<h1>全部回复</h1>
						{
							data.replies.map(item=>(
								<div className='comments' key={item.id}>
								<Avatar src={item.author.avatar_url} />
									<div>
										<div>
											<span>{item.author.loginname}·{moment(item.create_at).fromNow()}</span>
											<span className='dia'>
													<Icon type="like" onClick={this.handleLike.bind(this,item.id)}/>{item.ups.length}&nbsp;&nbsp;&nbsp;
													<Icon type="message" onClick={this.showReply.bind(this,item)}/>
											</span>
											
										</div>
										<div dangerouslySetInnerHTML={{__html:item.content}} />
										
										
									</div>
								</div>
								))
						}
					</div>
						):null
				}

					</Card>
						 <Modal
          title={replyInfo?`回复：${replyInfo.author.loginname}`:'回复：'}
          visible={visible}
          onOk={this.handleComment.bind(this,'reply')}
          onCancel={()=>this.setState({visible:false})}
        >
          <Input type='textarea' rows={4} value={reply} onChange={e=>this.setState({reply:e.target.value})} placeholder='请输入内容...' ref={input=>this.input=input} />
			
        </Modal>
				<BackTop />
			</div>
			)
	}
}

export default Topic