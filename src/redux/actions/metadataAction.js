import {GRID_STATE_CHANGE} from "./index";

export const createMetadataAction = (partialStateName, partialStateValue) => ({
    type: GRID_STATE_CHANGE,
    partialStateName,
    partialStateValue
});
