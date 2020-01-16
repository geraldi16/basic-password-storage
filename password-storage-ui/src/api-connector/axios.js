import axios from "axios"

const singleton = Symbol()
const singletonEnforcer = Symbol()

class Axios {
	constructor(enforcer) {
		if (enforcer !== singletonEnforcer) {
			throw new Error("Cannot construct singleton")
		}
		this.session = axios.create({
			headers: {
				post: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			timeout: 30000,
			baseURL: `http://${window.location.hostname}:1616`
		})
		this._interceptor = null
		this.token = ""

		// this._proxyRequest()
	}

	static get instance() {
		if (!this[singleton]) {
			this[singleton] = new Axios(singletonEnforcer)
		}
		return this[singleton]
	}

	get = (...params) => this.session.get(...params).then(axiosMiddleware, axiosErrorHandler)
	post = (...params) => this.session.post(...params).then(axiosMiddleware, axiosErrorHandler)
	put = (...params) => this.session.put(...params).then(axiosMiddleware, axiosErrorHandler)
	delete = (...params) => this.session.delete(...params).then(axiosMiddleware, axiosErrorHandler)
	patch = (...params) => this.session.patch(...params).then(axiosMiddleware, axiosErrorHandler)
}

/**
 * Reduce response to get only the data
 * @param {object} res - response object
 */
export const axiosMiddleware = res => {
	if (!res.data) return res
	return res.data.data
}

/**
 * Handle error from connection
 * @param {object} err - error object
 */
export const axiosErrorHandler = err => {
	if (!err.response)
		return Promise.reject({
			data: "connectionRefused",
			message: "connectionRefused",
		})
	const { data } = err.response
	if (!data) return Promise.reject(err)
	if (!data.data && data.message) data.data = data.message
	if (!data.message && data.data) data.message = data.data
	return Promise.reject(data)
}

export default Axios.instance
