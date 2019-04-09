import {store} from '../redux/store';
import * as actionTypes from '../redux/actions';
import * as settingsAction from "../redux/actions/settingsAction";

/**
 * For each metadataType (* represents all) we can define a set of rules for the dependency type.
 * @type {{metadataType: string, rules: [{metadataType: string, condition: function}]}}
 */
export let dependencyRules = [
    {
        "metadataType": "*",
        "rules": [
            {
                "metadataType": "user",
                "condition": () => false
            },
            {
                "metadataType": "organisationUnit",
                "condition": () => false
            }
        ]
    },
    {
        "metadataType": "organisationUnit",
        "rules": [
            {
                "metadataType": "organisationUnit", // Children orgUnits
                "condition": () => store.getState().settings[actionTypes.SETTINGS_ORG_UNIT_CHILDREN]
                    === settingsAction.ORG_UNIT_CHILDREN_PARSE_OPTION
            }
        ]
    }
];

/**
 * For each metadataType (* represents all) we can define a set of blacklisted types.
 */
export const namespaceName = 'export-metadata-blacklist';
export let defaultBlacklist = {
    "*": [],
    "categoryCombo": [
        "category"
    ],
    "categoryOption": [
        "category", "categoryOptionCombo"
    ],
    "categoryOptionCombo": [
        "categoryCombo"
    ],
    "dataElement": [
        "dataSet"
    ]
};
