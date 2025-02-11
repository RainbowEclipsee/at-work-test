import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  return response.json()
})

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], archived: [], status: 'idle' },
  reducers: {
    archiveUser: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload)
      if (user) {
        state.archived.push(user)
        state.users = state.users.filter((u) => u.id !== action.payload)
      }
    },
    restoreUser: (state, action) => {
      const user = state.archived.find((u) => u.id === action.payload)
      if (user) {
        state.users.push(user)
        state.archived = state.archived.filter((u) => u.id !== action.payload)
      }
    },
    hideUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload.slice(0, 6)
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { archiveUser, restoreUser, hideUser } = usersSlice.actions
export default usersSlice.reducer
