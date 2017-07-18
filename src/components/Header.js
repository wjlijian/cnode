import React from 'react'
import {Button,Modal,Input,message, Menu, Dropdown,Avatar,Badge} from 'antd'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {url} from '../config.js'

class Header extends React.Component{
	constructor(){
		super()
		this.state={
				isLogin:false,
				visible:false,
				confirmLoading: false,
				input:'6c14e448-cd91-4db1-bc83-96e1b80f87f1',
				user:null,
				messageCount:null
		}
	}
	handleOk(){
			  this.setState({confirmLoading:true})
			 let accesstoken = this.state.input;
			 axios.post(`${url}/accesstoken`,{accesstoken})
			 .then(res=>{
						message.success('登录成功')
						this.setState({
							isLogin:true,
							input:'',
							visible:false,
							confirmLoading:false,
							user:res.data
						})
						sessionStorage.accesstoken=accesstoken
						this.getMessage(accesstoken)
			 })
			 .catch(err=>{
			 	message.error('登录失败，请重新登录')
			 	this.setState({confirmLoading:false,input:''})
			 })
	}
	getMessage(accesstoken){
		axios.get(`${url}/message/count?accesstoken=${accesstoken}`)
		.then(res=>this.setState({messageCount:res.data.data}))
		.catch(err=>console.log(''))
	}
	handleLogout(){
		this.setState({
		isLogin:false,
		user:null
		})
		sessionStorage.removeItem('accesstoken')
	}
	render(){
		let {isLogin,visible,input,confirmLoading,user,messageCount}=this.state
		const menu = !isLogin ? <p>aaa</p> :(
		  <Menu>
		    <Menu.Item>
		      	<h3>{user.loginname}</h3>
		    </Menu.Item>
		    <Menu.Item>
		      	<Link to={{pathname:`/user/${user.loginname}`,state:user.loginname}}>个人中心</Link>
		    </Menu.Item>
		    <Menu.Item>
		      	<Link to="/message">消息中心</Link>
		    </Menu.Item>
		    <Menu.Item>
		      	<Link to={{pathname:`/collect/${user.loginname}`,state:user.loginname}}>我的收藏</Link>
		    </Menu.Item>
		     <Menu.Item>
		    	<Link to="/newtopic">话题中心</Link>
		    </Menu.Item>
		    <Menu.Item>
		      	<Button type='danger' onClick={this.handleLogout.bind(this)}>退出</Button>
		    </Menu.Item>
		  </Menu>
);
		return(
				<header className='header'>
					<h1><Link to='/'>cnode</Link></h1>
					{
						isLogin ?
						<Dropdown overlay={menu}>
					<Badge count={messageCount} showZero>
    				<Avatar src={user.avatar_url} />
    			</Badge>
 						</Dropdown>
						:
			<div>
					<Button type="primary" onClick={()=>this.setState({visible:true})}>登陆</Button>
					<Modal
			          title="登陆"
			          visible={visible}
			          onOk={this.handleOk.bind(this)}
			          onCancel={()=>this.setState({visible:false})}
			          confirmLoading={confirmLoading}
			          cancelText='取消'
			          okText='登陆'
			        >
       					<Input placeholder='accesstoken' value={input} onChange={e=>this.setState({input:e.target.value})}/>
        </Modal>
      </div>
					}

				</header>
			)
	}
}
export default Header

//d1b106e5-99ed-40d2-94ef-72f6a78f433f