const DOWNLOAD_TESTERS = 'DOWNLOAD_TESTERS';
const ADD_TESTER = 'ADD_TESTER';
const ADD_REKVEST = 'ADD_REKVEST';
const EDIT_REKVEST = 'EDIT_REKVEST';
const MOVE_REKVEST_BACK = 'MOVE_REKVEST_BACK';
const MOVE_REKVEST_FORWARD = 'MOVE_REKVEST_FORWARD';
const REMOVE_REKVEST = 'REMOVE_REKVEST';

const downloadRestsAction = (rests) => ({
	type: DOWNLOAD_TESTERS,
	payload: rests
});

const addRestAction = (restName) => ({
	type: ADD_TESTER,
	payload: restName
});

const addRekvestAction = ({ rekvestName, restId }) => ({
	type: ADD_REKVEST,
	payload: {
		restId,
		rekvestName
	}
});

const editRekvestAction = ({ restId, rekvestId, newRekvestName }) => ({
	type: EDIT_REKVEST,
	payload: {
		restId,
		rekvestId,
		newRekvestName
	}
});

const moveRekvestBackAction = ({ restId, rekvestId}) => ({
	type: MOVE_REKVEST_BACK,
	payload: {
		restId,
		rekvestId,
	}
});

const moveRekvestForwardAction = ({ restId, rekvestId}) => ({
	type: MOVE_REKVEST_FORWARD,
	payload: {
		restId,
		rekvestId,
	}
});

const removeRekvestAction = ({ restId, rekvestId}) => ({
	type: REMOVE_REKVEST,
	payload: {
		restId,
		rekvestId,
	}
});

export {
	DOWNLOAD_TESTERS,
	ADD_TESTER,
	ADD_REKVEST,
	EDIT_REKVEST,
	MOVE_REKVEST_BACK,
	MOVE_REKVEST_FORWARD,
	REMOVE_REKVEST,
	downloadRestsAction,
	addRestAction,
	addRekvestAction,
	editRekvestAction,
	moveRekvestBackAction,
	moveRekvestForwardAction,
	removeRekvestAction
};