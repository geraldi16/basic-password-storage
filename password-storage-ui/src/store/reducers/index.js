import { penderReducer } from "redux-pender"
import { combineReducers } from "redux-immutable"
import { connectRouter, routerMiddleware } from "connected-react-router/immutable"

// imports all file except index.js
const req = require.context(".", true, /^(?!.\/index).*.js$/)

const modules = {}

req.keys().forEach(key => {
	const regex = /.\/(.*?).js$/
	const moduleName = regex.test(key) && key.match(regex)[1]
	modules[moduleName] = req(key).default
})

modules["pender"] = penderReducer

// export default combineReducers(modules)

const rootReducer = (history) =>
  combineReducers({
    router : connectRouter(history),
    ...modules
  })

export default rootReducer;
