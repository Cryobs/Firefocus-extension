import React from "react"

import MenuIcon from "./icons/MenuIcon"
import Menu from "./Menu/Menu"


class Header extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			isMenu: false
		}

		this.changeMenuBtn = this.changeMenuBtn.bind(this);
	}

	changeMenuBtn(){
		let menu = document.querySelector(".Menu-container");
		let menuIcon = document.querySelector(".MenuBtn");

		if(menuIcon.classList.contains("active")){
			menu.classList.remove("active");
			menuIcon.classList.remove("active");

			console.log(menu.classList)
			console.log(menuIcon.classList)
		} else {
			menu.classList.add("active");
			menuIcon.classList.add("active");

			console.log(menu.classList)
			console.log(menuIcon.classList)
		}
		// this.setState((prevState) => ({
		// 	isMenu: !prevState.isMenu,
		// }));
	}

	render() {
		return (<div>
			<div className="Header glass">
				<p className="Ext-name">Firefocus</p>
				<MenuIcon changeMenuBtn={this.changeMenuBtn}/>
			</div>
			<Menu changeMenuBtn={this.changeMenuBtn}/>
		</div>

		)
	}


}


export default Header


