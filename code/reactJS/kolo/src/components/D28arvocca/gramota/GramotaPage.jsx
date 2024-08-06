import React, { Component } from 'react';
import Numbers from './Numbers';
import Cases from './Cases';
import Parts from './Parts';

class Tab extends Component {
	render() {
		const { label, onClick, activeTab } = this.props;
		const isActive = activeTab === label;
		return (
			<button
				onClick={onClick}
				style={{
					padding: '10px',
					cursor: 'pointer',
					backgroundColor: isActive ? '#007BFF' : '#FFFFFF',
					color: isActive ? '#FFFFFF' : '#000000',
					border: isActive ? '1px solid #007BFF' : '1px solid #000000',
					marginRight: '5px'
				}}
			>
				{label}
			</button>
		);
	}
}

export default class Gramota extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'Numbers'
		};
	}

	handleTabClick = (tab) => {
		this.setState({ activeTab: tab });
	};

	render() {
		const { activeTab } = this.state;

		return (
			<div>
				<div style={{ marginBottom: '20px' }}>
					<Tab
						label="Numbers"
						activeTab={activeTab}
						onClick={() => this.handleTabClick('Numbers')}
					/>
					<Tab
						label="Cases"
						activeTab={activeTab}
						onClick={() => this.handleTabClick('Cases')}
					/>
					<Tab
						label="Parts"
						activeTab={activeTab}
						onClick={() => this.handleTabClick('Parts')}
					/>
				</div>

				{activeTab === 'Numbers' && <Numbers />}
				{activeTab === 'Cases' && <Cases />}
				{activeTab === 'Parts' && <Parts />}
			</div>
		);
	}
}
