import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
	return axios.get(url).then(res => res.data)
}

const createOne = person => {
	return axios.post(`${url}`, person).then(r => r.data)

}

const updateOne = person => {
	const { id } = person;
	return axios.put(`${url}/${id}`, person).then(r => r.data);
}

const deleteOne = id => {
	return axios.delete(`${url}/${id}`)
}

export default {
	getAll,
	createOne,
	updateOne,
	deleteOne
};
