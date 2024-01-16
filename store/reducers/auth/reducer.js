const initialState = {
  user: null,
  validateNumber: false,
  validateNumberFound: false,
  validateEmail: false,
  authLoading: false,
  successResetPassword: false,
  closeModalMobile: false,
  verificationId: null,
  PhoneOTP: null,
  authToken: null,
  // authLoading: false,
  idToken: null,
  syncInfo: false,
  loadingInfo: false,
  imageURL: '',
};
export function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "AUTH_STOP_LOADING":
      return {
        ...state,
        authLoading: false,
      };
    case "AUTH_START_LOADING":
      return {
        ...state,
        authLoading: true,
      };
    case "SYNC_INFO":
      return {
        ...state,
        syncInfo: !state?.syncInfo,
      };
    case "SET_PHONE_NUMBER":
      return {
        ...state,
        PhoneOTP: action?.payload,
      };
    case "SET_VERIFICATION_ID":
      return {
        ...state,
        verificationId: action?.payload,
      };
    case "CLOSE_MODAL_MOBILE":
      return {
        ...state,
        closeModalMobile: !state.closeModalMobile,
      };
    case "RESET_AUTH_REDUCER":
      return {
        ...state,
        user: null,
        validateNumber: false,
        validateNumberFound: false,
        validateEmail: false,
        authLoading: false,
        successResetPassword: false,
        verificationId: null,
        authToken: null,
        idToken: null,
      };
    case "SET_AUTH_ID_TOKEN":
      return {
        ...state,
        idToken: action?.payload,
      };
    case "SET_AUTH_TOKEN":
      return {
        ...state,
        authToken: action?.payload,
      };
    case "START_LOADING_AUTH":
      return {
        ...state,
        authLoading: true,
      };
    case "SUCCESS_RESET_PASSWORD":
      return {
        ...state,
        successResetPassword: true,
      };
    case "STOP_LOADING_AUTH":
      return {
        ...state,
        authLoading: false,
      };
    case "REGISTER_GUEST_REDUCERS":
      return {
        ...state,
        user: action?.payload?.Guest?.data,
      };
    case "Add_Image_Src":
      return {
        ...state,
        imageURL: action?.payload,
      };
    case "VALIDATE_NUMBER":
      return {
        ...state,
        validateNumber: true,
      };
    case "REMOVE_VALIDATE_NUMBER":
      return {
        ...state,
        validateNumber: false,
      };
    case "VALIDATE_NUMBER_FOUND":
      return {
        ...state,
        validateNumberFound: true,
      };
    case "REMOVE_VALIDATE_NUMBER_FOUND":
      return {
        ...state,
        validateNumberFound: false,
      };
    case "VALIDATE_EMAIL":
      return {
        ...state,
        validateEmail: true,
      };
    case "REMOVE_VALIDATE_EMAIL":
      return {
        ...state,
        validateEmail: false,
      };
    default:
      return {
        ...state,
      };
  }
}
