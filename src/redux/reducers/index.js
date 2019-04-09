import blacklist from './blacklistReducer';
import metadata from './metadataReducer';
import settings from './settingsReducer';

const index = (state = {}, action) => {
    return {
        blacklist: blacklist(state.blacklist, action),
        metadata: metadata(state.metadata, action),
        settings: settings(state.settings, action)
    };
};

export default index;