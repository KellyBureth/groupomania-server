import {
  // DELETE_COMMENT,
  DELETE_POST,
  // EDIT_COMMENT,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers], //ajoute userid dans tableau des likers
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId), //si uid n'est pas ds le store, on le retire du tableau en back
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.res.data.message,
            file: action.payload.res.data.picture,
          };
        } else return post;
      });
    // case UPDATE_POST:
    //   return state.map((post) => {
    //     if (post._id === action.payload.postId) {
    //       return {
    //         ...post,
    //         message: action.payload.message,
    //       };
    //     } else return post;
    //   });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId); //retourne tous les posts sauf celui avec l'id du post supprimé
    //   case EDIT_COMMENT:
    //     return state.map((post) => {
    //       if (post._id === action.payload.postId) {
    //         return {
    //           ...post,
    //           comments: post.comments.map((comment) => {
    //             if (comment._id === action.payload.commentId) {
    //               return {
    //                 ...comment,
    //                 text: action.payload.text,
    //               };
    //             } else {
    //               return comment;
    //             }
    //           }),
    //         };
    //       } else return post;
    //     });
    //   case DELETE_COMMENT:
    //     return state.map((post) => {
    //       if (post._id === action.payload.postId) {
    //         return {
    //           ...post,
    //           comments: post.comments.filter(
    //             (comment) => comment._id !== action.payload.commentId
    //           ),
    //         };
    //       } else return post;
    //     });
    default:
      return state;
  }
}
