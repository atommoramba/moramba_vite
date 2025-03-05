import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
  name: "Loading",
  initialState: false,
  reducers: {
    setAPILoader(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setAPILoader } = LoadingSlice.actions;

export default LoadingSlice.reducer;

export function APILoader(status) {
  return async function APILoaderThunk(dispatch, getState) {
    try {
      dispatch(setAPILoader(status));
    } catch (err) {
      console.log(err);
    }
  };
}
