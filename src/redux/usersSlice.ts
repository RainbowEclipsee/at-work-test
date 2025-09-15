import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from "../types/user";


export const fetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = (await response.json()) as User[]
  return data.slice(0, 6); 
});

export const fetchUserById = createAsyncThunk<User, number>("users/fetchUserById", async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = (await response.json()) as User
  return data;
});

export const updateUser = createAsyncThunk<User, User>("users/updateUser", async (updatedUser) => {
  return updatedUser; 
});

export interface UsersState {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    archiveUser: (state, action: PayloadAction<number>) => {
      const user = state.users.find((user) => user.id === action.payload);
      if(user)
        user.archived = true;
    },
    unarchiveUser: (state, action: PayloadAction<number>) => {   
      const user = state.users.find((user) => user.id === action.payload); 
      if(user)
        user.archived = false;
    },
    hideUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load users";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      });
  }
});

export const { archiveUser, hideUser, unarchiveUser } = usersSlice.actions;
export default usersSlice.reducer;
