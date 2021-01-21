import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
	editRekvest as editRekvestServer,
	moveRekvest as moveRekvestServer,
	removeRekvest as removeRekvestServer
} from '../../models/AppModel';
import {
	editRekvestAction,
	moveRekvestBackAction,
	moveRekvestForwardAction,
	removeRekvestAction
} from '../../store/action';

const Rekvest = ({
	rekvestName,
	rekvestId,
	restId,
	editRekvestDispatch,
	moveRekvestBackDispatch,
	moveRekvestForwardDispatch,
	removeRekvestDispatch
}) => {
	const editRekvest = async () => {
		let newRekvestName = prompt('Добавить блюдо', rekvestName);

		if (!newRekvestName) return;

		newRekvestName = newRekvestName.trim();

		if (!newRekvestName || newRekvestName === rekvestName) return;

		const info = await editRekvestServer({ restId, rekvestId, newRekvestName });
		console.log(info);

		editRekvestDispatch({ restId, rekvestId, newRekvestName });
	};

	const removeRekvest = async () => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Блюдо '${rekvestName}' будет удалено. Продолжить?`)) {
			const info = await removeRekvestServer({ restId, rekvestId });
			console.log(info);

			removeRekvestDispatch({ restId, rekvestId });
		}
	};

	const moveRekvestBack = async () => {
		try {
			const info = await moveRekvestServer({
				restId,
				rekvestId,
				destRestId: restId - 1
			});
			console.log(info);

			moveRekvestBackDispatch({ restId, rekvestId });
		} catch (error) {
			console.log(error);
		}
	};

	const moveRekvestForward = async () => {
		try {
			const info = await moveRekvestServer({
				restId,
				rekvestId,
				destRestId: restId + 1
			});
			console.log(info);

			moveRekvestForwardDispatch({ restId, rekvestId });
		} catch (error) {
			console.log(error);
		}
	};

	return(
		<div className="ra-rest-rekvest">
			<div className="ra-rest-rekvest-text">
				{rekvestName}
			</div>
			<div className="ra-rest-rekvest-controls">
				<div className="ra-rest-rekvest-controls-row">
					<div 
						className="ra-rest-rekvest-controls-icon left-arrow-icon"
						onClick = {moveRekvestBack}
					></div>
					<div
						className="ra-rest-rekvest-controls-icon right-arrow-icon"
						onClick = {moveRekvestForward}
					></div>
				</div>
				<div className="ra-rest-rekvest-controls-row">
					<div
						className="ra-rest-rekvest-controls-icon edit-icon"
						onClick = {editRekvest}
					></div>
					<div
						className="ra-rest-rekvest-controls-icon delete-icon"
						onClick = {removeRekvest}
					></div>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	editRekvestDispatch: ({ restId, rekvestId, newRekvestName }) =>
		dispatch(editRekvestAction({ restId, rekvestId, newRekvestName })),
	moveRekvestBackDispatch: ({ restId, rekvestId}) =>
		dispatch(moveRekvestBackAction({ restId, rekvestId})),
	moveRekvestForwardDispatch: ({ restId, rekvestId}) =>
		dispatch(moveRekvestForwardAction({ restId, rekvestId})),
	removeRekvestDispatch: ({ restId, rekvestId}) =>
		dispatch(removeRekvestAction({ restId, rekvestId}))
});

export default connect(
	null,
	mapDispatchToProps
)(memo(Rekvest))
