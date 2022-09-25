import {
  // FOLLOW_USER,
  GET_USER,
  // UNFOLLOW_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {}; //state initial, vide

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
    //   case FOLLOW_USER:
    //     return {
    //       ...state,
    //       following: [action.payload.idToFollow, ...state.following],
    //     };
    //   case UNFOLLOW_USER:
    //     return {
    //       ...state,
    //       following: state.following.filter(
    //         (id) => id !== action.payload.idToUnfollow
    //       ),
    //     };
    default:
      return state;
  }
}
