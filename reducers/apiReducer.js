import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const slice = createSlice({
    name: "searchList",
    initialState: {
        apiList: [],
        scrollList: [],
        isLoading: false,
        error: false,
        loadMore: false
    },
    reducers: {
        loading: state => {
            state.isLoading = true;
            state.loadMore = false
        },
        error: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.apiList = []
            state.scrollList = []
            state.loadMore = false
        },
        success: (state, action) => {
            state.apiList = action.payload;
            state.isLoading = false;
            state.scrollList = action.payload.slice(0, 9)
            state.error = false
            state.loadMore = !(state.apiList.length == state.scrollList.length)
            console.log(state.apiList.length == state.scrollList.length)
        },
        fetchFromLocal: (state) => {
            if (state.apiList.length != 0 && state.apiList.length == state.scrollList.length) {
                console.log("EQUAL")
                return state
            }
            state.scrollList = [...state.scrollList,
            ...state.apiList.slice(state.scrollList.length, state.scrollList.length + 9)
            ].reverse()
            state.loadMore = !(state.apiList.length == state.scrollList.length)
        }
    }
});

export const fetchUsers = (anime) => async dispatch => {
    dispatch(loading());
    try {
        await axios
            .get("https://api.jikan.moe/v3/search/anime?q=" + anime)
            .then(response => dispatch(success(response.data.results)))
            .catch(e => dispatch(error(e.response.data.message))
            )

    } catch (e) {
        console.log(e.message);
        dispatch(error(e.message))
    }
};

export const { success, loading, error, fetchFromLocal } = slice.actions;
export default slice.reducer