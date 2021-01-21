import {
	DOWNLOAD_TESTERS,
	ADD_TESTER,
	ADD_REKVEST,
	EDIT_REKVEST,
	MOVE_REKVEST_BACK,
	MOVE_REKVEST_FORWARD,
	REMOVE_REKVEST
} from './action';

const initialState = {
	rests: []
};

export default function reducer(state = initialState, { type, payload }) {
	switch(type) {
		case DOWNLOAD_TESTERS:
			return {
				...state,
				rests: payload
			};

		case ADD_TESTER:
			return {
				...state,
				rests: [
					...state.rests,
					{
						restName: payload,
						rekvestes: []
					}
				]
			};

		case ADD_REKVEST:
			return {
				...state,
				rests: state.rests.map(
					(rest, index) => index !== payload.restId
						? { ...rest }
						: { ...rest, rekvestes: [...rest.rekvestes, payload.rekvestName] }
				)
			};

		case EDIT_REKVEST:
			return {
				...state,
				rests: state.rests.map(
					(rest, index) => index !== payload.restId
						? { ...rest }
						: {
							...rest,
							rekvestes: rest.rekvestes.map(
								(rekvest, rekvestIndex) => rekvestIndex === payload.rekvestId
									? payload.newRekvestName
									: rekvest
							)
						}
				)
			};

		case MOVE_REKVEST_BACK:
			if (payload.restId === 0) return state;
			const movedBackRekvest = state.rests[payload.restId].rekvestes[payload.rekvestId];
			const backRekvestes = state.rests[payload.restId].rekvestes.filter(
				rekvest => rekvest !== movedBackRekvest
			);
			return {
				...state,
				rests: state.rests.map((rest, index) => {
					if (index === payload.restId - 1) {  
						return {
							...rest,
							rekvestes: [...rest.rekvestes, movedBackRekvest]
						};
					}

					if (index === payload.restId) {
						return {
							...rest,
							rekvestes: backRekvestes  
						};
					}

					return { ...rest };
				})
			};

		case MOVE_REKVEST_FORWARD:
			if (payload.restId === state.rests.lenght - 1) return state;
			const movedForwardRekvest = state.rests[payload.restId].rekvestes[payload.rekvestId];
			const forwardRekvestes = state.rests[payload.restId].rekvestes.filter(
				rekvest => rekvest !== movedForwardRekvest
			);
			return {
				...state,
				rests: state.rests.map((rest, index) => {
					if (index === payload.restId + 1) {  
						return {
							...rest,
							rekvestes: [...rest.rekvestes, movedForwardRekvest]
						};
					}

					if (index === payload.restId) {
						return {
							...rest,
							rekvestes: forwardRekvestes
						};
					}

					return { ...rest };
				})
			};

		case REMOVE_REKVEST:
			const removedRekvest = state.rests[payload.restId].rekvestes[payload.rekvestId];
			const rekvestes = state.rests[payload.restId].rekvestes.filter(
				rekvest => rekvest !== removedRekvest
			);
			return {
				...state,
				rests: state.rests.map(
					(rest, index) => index === payload.restId
						? {
								...rest,
								rekvestes
						}
						: { ...rest }
				)
			};

		default:
			return state;
	}

}