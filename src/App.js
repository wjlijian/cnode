import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
// import Home from './components/Home.js'
class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<div>
					<Header />
					
					<Footer />
				</div>
			</BrowserRouter>
			)
	}
}
export default App