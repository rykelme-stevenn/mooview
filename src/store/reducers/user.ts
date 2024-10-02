import { IUser } from "../../components/types/user";
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface InititalState {
    user: IUser | null
}

interface setUserPayload {
    user: IUser
}

const initialState: InititalState = {
    user: null
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUser: (state, action: PayloadAction<setUserPayload>) => {
            const user = action.payload.user
            state.user = user
        }
    }
})


export const {setUser} = userSlice.actions
export default userSlice.reducer