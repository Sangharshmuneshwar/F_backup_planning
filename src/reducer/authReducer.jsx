import React from "react";

/**
 * Initial state for the authentication context.
 * user: Holds user details {id, name, email, role, permissions} or null.
 * loading: Tracks state during API calls (login, logout, session restore).
 * error: Holds any authentication error message.
 */
export const initialState = {
  user: null,
  loading: false,
  error: null,
};

/**
 * Reducer function to manage authentication state transitions.
 * @param {object} state - The current authentication state.
 * @param {object} action - The action object containing a 'type' and optional payload.
 * @returns {object} The new state based on the action type.
 */
export function authReducer(state, action) {
  switch (action.type) {
    case "RESTORE_START":
      return { ...state, loading: true, error: null };

    case "RESTORE_DONE":
      // Set loading to false and update user (null if session failed)
      return { ...state, loading: false, user: action.user ?? null };

    case "LOGIN_START":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      // Update user data upon successful login
      return { ...state, loading: false, user: action.user, error: null };

    case "LOGIN_ERROR":
      // Capture the error message if login fails
      return { ...state, loading: false, error: action.error };

    case "LOGOUT":
      // Clear client-side stored user info and reset state
      localStorage.removeItem("authUser"); 
      // Reset state to initial state, ensuring loading is false
      return { ...initialState, loading: false };

    default:
      // Return current state for unknown actions
      return state;
  }
}