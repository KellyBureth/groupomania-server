import {
  GET_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
  DELETE_USER,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state, //recupere les données user sans les remplacer
        picture: action.payload, //on ne remplace que l'image
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case DELETE_USER:
      return state.filter((user) => user._id !== action.payload.userId); //retourne tous les posts sauf celui avec l'id du post supprimé

    default:
      return state;
  }
}
