import React, { memo } from 'react';
import { connect } from 'react-redux';
import { addRekvest as addRekvestServer } from '../../models/AppModel';
import {
	addRekvestAction
} from '../../store/action';
import Rekvest from '../Rekvest/Rekvest';

const Rest = ({
	restName,
	restId,
	rekvestes,
	addRekvestDispatch
}) => {
	const addRekvest = async () => {
		let rekvestName = prompt('Введите название блюда');

		if (!rekvestName) return;

		rekvestName = rekvestName.trim();

		if (!rekvestName) return;

    const info = addRekvestServer({ restId, rekvestName });
    console.log(info);
		addRekvestDispatch({ rekvestName, restId });
	};

	return(<div className="ra-rest">
      <header className="ra-rest-header">
        {restName}
      </header>
      <div className="ra-rest-rekvestes">
      	{rekvestes.map((rekvest, index) => (
      		<Rekvest
      			rekvestName = {rekvest}
      			rekvestId = {index}
      			restId = {restId}
      			key = {`list${restId}-rekvest${index}`}
      		/>
      	))}
      </div>
      <footer
      	className="ra-rest-add-rekvest"
      	onClick = {addRekvest}
      >
        Добавить блюдо
      </footer>
    </div>);
};

const mapDispatchToProps = dispatch => ({
	addRekvestDispatch: ({ restId, rekvestName }) => 
		dispatch(addRekvestAction({ rekvestName, restId }))
})

export default connect(
	null,
	mapDispatchToProps
)(memo(Rest));
