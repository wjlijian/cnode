// import React from 'react'
// import axios from 'axios'
// import{url} from'../config'
// import{Tabs} from 'antd'
// const TabPane = Tabs.TabPane;

// class Home extends React.Component{
// 	constructor(){
// 		super()
// 		this.state={
// 			data:{
// 				all:{topics:[],page:1}
// 				good:{topics:[],page:1}
// 				ask:{topics:[],page:1}
// 				share:{topics:[],page:1}
// 				job:{topics:[],page:1}
// 			}
// 		}
// 	}
// 	getData(tab,page){
// 		axios.get(`${url}/topics?limit=20&tab=${tab==='all'?'':tab}&page=${page}`)	//限制每页传参20条
// 				.then(res=>{
					
// 				})
// 				.catch(err=>message.erroer('数据请求失败'))										
// 	}

// 	render(){
// 		return(
// 				<div>
// 						<Tabs defaultActiveKey="1" onChange={callback}>
// 					    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
// 					    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
// 					    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
//  						</Tabs>
// 				</div>
// 			)
// 	}
// }
// export default Home