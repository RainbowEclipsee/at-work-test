import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
    archiveUser: (state, action) => {
      return state.map(user =>
        user.id === action.payload ? { ...user, archived: true } : user
      );
    },
    restoreUser: (state, action) => {
      return state.map(user =>
        user.id === action.payload ? { ...user, archived: false } : user
      );
    },
    removeUser: (state, action) => state.filter(user => user.id !== action.payload),
  },
});

export const { setUsers, archiveUser, restoreUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
