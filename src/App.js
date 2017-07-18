import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Home from './components/Home.js'
import Topic from './components/Topic.js'
import Message from './components/Message.js'
import User from './components/User.js'
import Collect from './components/Collect.js'
import NewTopic from './components/NewTopic'

class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<div>
					<Header />
					
					<Route path='/' exact component={Home} />
					<Route path='/user/:loginname'  component={User} />					
					<Route path='/topic/:id' component={Topic} />
					<Route path='/message' component={Message} />
					<Route path='/collect/:loginname' component={Collect}/>
					<Route path='/newtopic' component={NewTopic}/>
				</div>
			</BrowserRouter>
			)
	}
}
export default App

//发帖更新帖，收藏