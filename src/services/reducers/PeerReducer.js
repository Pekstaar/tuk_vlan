import { ADD_PEER, REMOVE_PEER } from "../actions/PeerActions";

export const PeerReducer = (state, action) => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
        },
      };

    case REMOVE_PEER:
      const { [action.payload?.peerId]: deleted, ...rest } = state;
      // console.log(action.payload.peerId);
      return rest;

    default:
      return state;
  }
};
