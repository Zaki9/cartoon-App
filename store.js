import { configureStore } from '@reduxjs/toolkit'
import apiReducer from './reducers/apiReducer'
export default configureStore({
  reducer: {
    data : apiReducer
  }
})