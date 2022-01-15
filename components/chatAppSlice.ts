import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface UserState {
    id: string;
    name: string;
    email: string;
    displayPicture: string;
    status: 'online' | 'offline' | 'typing'
}

export interface MessageState {
    id: string;
    text: string;
    sender: string;
    receiver: string;
    time: string;
    parentId: string | null;
}

export interface UsersListInterface {
    users: UserState[] | null;
    messages: MessageState[] | null;
}

const initialState: UsersListInterface = {
    users: null,
    messages: null
};

export const chatAppSlice = createSlice({
    name: 'chatApp',
    initialState,
    reducers: {
        loadData: (state, action: PayloadAction<UserState[]>) => {
            state.users = action.payload;
        },

        loadMessages: (state, action: PayloadAction<MessageState[]>) => {
            state.messages = action.payload;
        }
    }
});

export const { loadData, loadMessages } = chatAppSlice.actions;

export const selectUsers = (state: RootState) => state.chatApp.users;

export const selectMessages = (state: RootState) => state.chatApp.messages;

export default chatAppSlice.reducer;