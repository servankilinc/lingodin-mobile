import { createSlice, PayloadAction } from '@reduxjs/toolkit' 

// componentler ile haberleşmede(dispatch) kullanılacak
interface ConfirmationModalProps{
    message?: string | undefined;
    textButton_confirmation?: string | undefined;
    textButton_cancel?: string | undefined;
    colorButton_confirmation?: string | undefined;
    callback?:  () => void;
    callbackAsync?:  () => Promise<void>;
}

interface StateUI {
    message: string;
    textButton_confirmation: string;
    textButton_cancel: string;
    colorButton_confirmation: string;
    showStatus: boolean;
    callback?: () => void | undefined; // undefined olursa callback yok
    callbackAsync?: () => Promise<void> | undefined; // undefined olursa callback yok
};

const initialState: StateUI = {
    message: "İşlemi Onaylıyor musunuz?",
    showStatus: false,
    textButton_cancel: "İptal",
    textButton_confirmation: "Onay",
    colorButton_confirmation: "#e93e3e"
}

export const confirmationSlice = createSlice({
    name: 'confirmationSlice',
    initialState,
    reducers: {
        showConfirmationModal: (state, action: PayloadAction<ConfirmationModalProps>) => {
            state.message = action.payload.message?? "İşlemi Onalyıyor musunuz?";
            state.callback = action.payload.callback?? undefined;
            state.callbackAsync = action.payload.callbackAsync?? undefined;
            state.showStatus = true;
            state.textButton_confirmation = action.payload.textButton_confirmation?? "Onay";
            state.textButton_cancel = action.payload.textButton_cancel?? "İptal";
            state.colorButton_confirmation = action.payload.colorButton_confirmation?? "#e93e3e";
        },
        closeConfirmationModal: (state) => {
            state.callback = undefined;
            state.showStatus = false;
        }
    },
})

export const { showConfirmationModal, closeConfirmationModal} = confirmationSlice.actions

export default confirmationSlice.reducer