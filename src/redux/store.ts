import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/AlertSlice';
import confirmationReducer from './reducers/ConfirmationSlice';
export const store = configureStore({
    reducer: {
        alertReducer: alertReducer,
        confirmationReducer: confirmationReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch