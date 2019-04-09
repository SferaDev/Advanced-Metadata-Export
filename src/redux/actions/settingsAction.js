import * as actionTypes from "./index";

export const USER_CLEAN_UP_REMOVE_OPTION = 'USER_CLEAN_UP_REMOVE_OPTION';
export const USER_CLEAN_UP_KEEP_OPTION = 'USER_CLEAN_UP_KEEP_OPTION';

export const ORG_UNIT_CHILDREN_PARSE_OPTION = 'ORG_UNIT_CHILDREN_PARSE_OPTION';
export const ORG_UNIT_CHILDREN_ASSUME_OPTION = 'ORG_UNIT_CHILDREN_ASSUME_OPTION';
export const ORG_UNIT_CHILDREN_REMOVE_OPTION = 'ORG_UNIT_CHILDREN_REMOVE_OPTION';

export const defaultSettingsState = {
    SETTINGS_ORG_UNIT_CHILDREN: ORG_UNIT_CHILDREN_ASSUME_OPTION,
    SETTINGS_USER_CLEAN_UP: USER_CLEAN_UP_REMOVE_OPTION
};

export const optionDialogValues = [
    {
        key: actionTypes.SETTINGS_USER_CLEAN_UP,
        value: 'User identifiers (userGroupAccesses, userAccesses, user)',
        options: [
            {
                key: USER_CLEAN_UP_REMOVE_OPTION,
                value: 'Remove user identifiers [WARNING: Access rights should be correctly assigned after import!]'
            },
            {
                key: USER_CLEAN_UP_KEEP_OPTION,
                value: 'Keep user identifiers [WARNING: Included userGroups and users must be added beforehand!]'
            }
        ]
    },
    {
        key: actionTypes.SETTINGS_ORG_UNIT_CHILDREN,
        value: 'Org unit children',
        options: [
            {
                key: ORG_UNIT_CHILDREN_PARSE_OPTION,
                value: 'Fetch complete org unit subtree'
            },
            {
                key: ORG_UNIT_CHILDREN_ASSUME_OPTION,
                value: 'Assume org unit children [WARNING: Children org units must be added first]'
            },
            {
                key: ORG_UNIT_CHILDREN_REMOVE_OPTION,
                value: 'Remove org unit children [WARNING: On import, imported org unit may be detached from the org unit tree!]'
            }
        ]
    }
];