import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  userid: null, // Store user ID
  isAuthenticated: false, // Authentication status
  loading: false, // For login requests
  error: null, // Store login errors
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password ,phonenumber}, { rejectWithValue }) => {
  
    try {
        
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password ,phonenumber}),
      });

      const data = await response.json();
      console.log("from authslice  ",data);

      if (!response.ok) {
        throw new Error(data.error || 'Registered failed');
      }
  
      return {  userid: data.userid }; // Payload for login success
    } catch (error) {
        console.log("error from authslic,",error.message);
      return rejectWithValue(error.message); // Return error if login fails
    }
  }
);
export const registeredUsers = createAsyncThunk(
  'auth/registeredUsers',
  async ({ email, password }, { rejectWithValue }) => {
  
    try {
        console.log("from authslice registeredusers",email,password);
      const response = await fetch('http://localhost:5000/registered', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("from authslice registerec  ",data);

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
  
      return {  userid: data.userid }; // Payload for login success
    } catch (error) {
        console.log("error from authslic,",error.message);
      return rejectWithValue(error.message); // Return error if login fails
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userid = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userid = action.payload.userid;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registeredUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registeredUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userid = action.payload.userid;
        state.isAuthenticated = true;
      })
      .addCase(registeredUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions; // Export the logout action
export default authSlice.reducer; // Export the reducer