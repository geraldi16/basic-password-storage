import { createBrowserHistory } from "history"
import { applyMiddleware, compose, createStore } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router/immutable"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import penderMiddleware from "redux-pender"
import { Map } from "immutable"

import rootReducer from "./reducers"

const history = createBrowserHistory()

const composeEnhancers =
	process.env.NODE_ENV === "production"
		? compose
		: composeWithDevTools({
				actionsBlacklist: [
					"@@redux-pender/SUCCESS",
					"@@redux-pender/FAILURE",
					"@@redux-pender/PENDING",
				],
				maxAge: 1000,
		  })

function configureStore(history) {
	//Init middlewares
	const middlewares = [routerMiddleware(history), penderMiddleware()];
  
	//Init enhancer
	const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  
	//Store creation
	const store = createStore(
	  rootReducer(history),
	  enhancer
	);
  
	return store;
 }

 const store = configureStore(history)

 if (rootReducer.hot) {
	rootReducer.hot.accept("./reducers", () => {
		const nextRootReducer = require("./reducers").default
		store.replaceReducer(connectRouter(history)(nextRootReducer))
	})
}

export { history }
export default store
