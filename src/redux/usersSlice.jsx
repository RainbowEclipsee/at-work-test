import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data.slice(0, 6); 
});

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await response.json();
  return data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (updatedUser) => {
  return updatedUser; 
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null
  },
  reducers: {
    archiveUser: (state, action) => {
      const user = state.users.find((user) => user.id === action.payload);
      user.archived = true;
    },
    unarchiveUser: (state, action) => {   
      const user = state.users.find((user) => user.id === action.payload); // Поправить разАрхивирование с главной страницы
      user.archived = false;
    },
    hideUser: (state, action) => {
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
