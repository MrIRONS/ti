const getRests = async () => {
	const response = await fetch('http://localhost:3001/rests');
	const rests = await response.json();

	return rests;
}

const addRest = async (rest) => {
	const response = await fetch('http://localhost:3001/rests', {
		method: 'POST',
		body: JSON.stringify(rest),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const addRekvest = async ({ restId, rekvestName }) => {
	const response = await fetch(`http://localhost:3001/rests/${restId}/rekvestes`, {
		method: 'POST',
		body: JSON.stringify({ rekvestName }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const editRekvest = async ({ restId, rekvestId, newRekvestName }) => {
	const response = await fetch(`http://localhost:3001/rests/${restId}/rekvestes/${rekvestId}`, {
		method: 'PATCH',
		body: JSON.stringify({ newRekvestName }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const removeRekvest = async ({ restId, rekvestId }) => {
	const response = await fetch(`http://localhost:3001/rests/${restId}/rekvestes/${rekvestId}`, {
		method: 'DELETE',
	});

	const { info } = await response.json();

	return info;
};

const moveRekvest = async ({ restId, rekvestId, destRestId }) => {
	const response = await fetch(`http://localhost:3001/rests/${restId}`, {
		method: 'PATCH',
		body: JSON.stringify({ rekvestId, destRestId }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status !== 200) {
		const { error } = await response.json();
		return Promise.reject(error);
	}

	const { info } = await response.json();

	return info;
};

export {
	getRests,
	addRest,
	addRekvest,
	editRekvest,
	removeRekvest,
	moveRekvest
};