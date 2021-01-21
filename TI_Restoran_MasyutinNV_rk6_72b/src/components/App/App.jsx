import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addRest, getRests } from '../../models/AppModel';
import {
	addRestAction,
	downloadRestsAction
} from '../../store/action';
import Rest from '../Rest/Rest';
import './App.css'

class App extends PureComponent {
	state = {
		isInputShown: false,
		inputValue: ''
	};

	async componentDidMount() {
		const rests = await getRests();
		this.props.downloadRestsDispatch(rests);
	}

	showInput = () => this.setState({ isInputShown: true });

	onInputChange = ({ target: { value } }) => this.setState({
		inputValue: value
	});

	onKeyDown = async (event) => {
		if (event.key === 'Escape') {
			this.setState({
				isInputShown: false,
				inputValue: ''
			});
			return;
		}

		if (event.key === 'Enter') {
			if (this.state.inputValue) {
				const info = await addRest({
					restName: this.state.inputValue,
					rekvestes: []
				});
				console.log(info);

				this.props.addRestDispatch(this.state.inputValue);
			}

			this.setState({
				isInputShown: false,
				inputValue: ''
			})
		}
	};

	render() {
		const { isInputShown, inputValue } = this.state;
		const { rests } = this.props;

		return (
			<Fragment>
				<header id="main-header">
					Личный кабинет аминистратора
					<div id="author">
						Ресторан "Казбек"
						<div className="avatar"></div>
					</div>
				</header>
				<main id="ra-container">
					{rests.map((rest, index) => (
						<Rest
							restName = {rest.restName}
							restId = {index}
							rekvestes={rest.rekvestes}
							key = {`list${index}`}
						/>
					))}
					<div className="ra-rest">
						{!isInputShown && (
							<header 
								className="ra-rest-header"
								onClick = {this.showInput}
							>
								Добавить Повара
							</header>
						)}
						{isInputShown && (
							<input
								type="text"
								id="add-rest-input"
								placeholder="Имя повара"
								value = { inputValue }
								onChange = {this.onInputChange}
								onKeyDown={this.onKeyDown}
							/>
						)}
					</div>
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = ({ rests }) => ({ rests });

const mapDispatchToProps = dispatch => ({ 
	addRestDispatch: (restName) => dispatch(addRestAction(restName)),
	downloadRestsDispatch: (rests) => dispatch(downloadRestsAction(rests))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
