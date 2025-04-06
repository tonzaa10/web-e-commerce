
export interface InitialFormState { 
    success: boolean;
    message: string;
    errors?:Record<string, string[]>; // { [key: string]: string[] };
}
export const initialFormState: InitialFormState = {
    success: false,
    message: '',
}