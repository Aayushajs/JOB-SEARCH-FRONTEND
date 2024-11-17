import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // If using axios for API calls, otherwise use fetch or another method
import { JOB_API_END_POINT } from "@/utils/constant"; // Assuming this contains your API base URL

// Async action to delete a job
export const deleteJob = createAsyncThunk(
    "job/deleteJob",
    async (jobId, { rejectWithValue, getState }) => {
        try {
            // Get the token from Redux state (assuming it's stored in `auth.token`)
            const token = getState().auth.token; // Modify this based on where you store the token

            // Configuration object for the axios request
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token to the backend
                },
            };

            // Make the delete request to the backend with the authorization header
            const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, config);

            // Return jobId to remove it from the Redux state
            return jobId;
        } catch (error) {
            console.error("Error deleting job:", error);
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        loading: false,
        error: null,
    },
    reducers: {
        // Actions for setting job data
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Delete job pending state
            .addCase(deleteJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Delete job fulfilled state
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.loading = false;
                // Filter out the deleted job from the allAdminJobs array
                state.allAdminJobs = state.allAdminJobs.filter(job => job._id !== action.payload);
            })
            // Delete job rejected state
            .addCase(deleteJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete job';
            });
    },
});

// Export actions
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;

// Export the reducer
export default jobSlice.reducer;
