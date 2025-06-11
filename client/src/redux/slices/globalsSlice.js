/* Use this to define variables that can be used anywhere on the client */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clientURL: 'http://localhost:5173',
    serverURL: 'http://localhost:8000'
};

export const globalsSlice = createSlice({
    name: 'glob',
    initialState,
    reducers: { }
});

export default globalsSlice.reducer;