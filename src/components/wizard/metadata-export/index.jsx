import React from "react";
import PropTypes from "prop-types";
import i18n from "@dhis2/d2-i18n";
import { withRouter } from "react-router";
import { ConfirmationDialog } from "d2-ui-components";

import Wizard from "../";
import FormHeading from "../FormHeading";
import MetadataExportStep from "../steps/MetadataExportStep";

const stepsBaseInfo = [
    {
        key: "metadata",
        label: i18n.t("Metadata"),
        component: MetadataExportStep,
        help: i18n.t('Select the metadata to export'),
    },
    {
        key: "json-edit",
        label: i18n.t("JSON Editor"),
        //component: MetadataGrid,
        help: i18n.t('Edit the metadata package'),
    },
    {
        key: "review",
        label: i18n.t("Review"),
        //component: SaveStep,
        help: i18n.t('Review, download, store or import the metadata package'),
    }
];

class MetadataExport extends React.Component {
    static propTypes = {
        d2: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        };
    }

    openDialog = () => {
        this.setState({ dialogOpen: true });
    };

    handleConfirm = () => {
        this.setState({ dialogOpen: false });
        this.props.history.push("/instance-configurator");
    };

    handleDialogCancel = () => {
        this.setState({ dialogOpen: false });
    };

    onChange = instance => {
        this.setState({ instance });
    };

    /**parseMetadataTypes(d2) {
        let metadataTypes = _.uniq(Object.keys(d2.models).filter(model => {
            return d2.models[model].isMetaData;
        }).map(model => {
            return d2.models[model].name
        }));
        let parsedElements = metadataTypes.length;
        let insertMetadata = (model, result) => {
            let metadata = result.toArray().filter(e => e.code !== 'default').map(e => {
                return {
                    id: e.id,
                    name: e.displayName,
                    type: model
                };
            });
            store.dispatch({type: GRID_ADD_METADATA, metadata});
            if (result.pager.hasNextPage()) result.pager.getNextPage().then(result => insertMetadata(model, result));
        };
        metadataTypes.forEach((model) => {
            d2.models[model].list({paging: false, fields: ['id', 'displayName', 'code']}).then(result => {
                insertMetadata(model, result);
                if (--parsedElements === 1) store.dispatch({type: LOADING, loading: false});
            }).catch(() => {
                if (--parsedElements === 1) store.dispatch({type: actionTypes.LOADING, loading: false});
            });
        });
    }**/

    render() {
        const { d2, location } = this.props;
        const { instance, dialogOpen } = this.state;
        // TODO: Why are we making the campaign global in vaccination?
        window.instance = instance;

        const steps = stepsBaseInfo.map(step => ({
            ...step,
            props: {
                d2,
                instance,
                onChange: this.onChange,
            },
        }));

        const urlHash = location.hash.slice(1);
        const stepExists = steps.find(step => step.key === urlHash);
        const firstStepKey = steps.map(step => step.key)[0];
        const initialStepKey = stepExists ? urlHash : firstStepKey;

        return (
            <React.Fragment>
                <ConfirmationDialog
                    isOpen={dialogOpen}
                    onSave={this.handleConfirm}
                    onCancel={this.handleDialogCancel}
                    saveText={i18n.t("Ok")}
                    title={i18n.t("Exit metadata export")}
                    description={i18n.t(
                        "You are about to exit the metadata export wizard. All your changes will be lost. Are you sure?"
                    )}
                />

                <FormHeading
                    title={i18n.t("Metadata Export")}
                    onBackClick={this.openDialog}
                />

                <Wizard
                    steps={steps}
                    initialStepKey={initialStepKey}
                    useSnackFeedback={true}
                    onStepChangeRequest={this.onStepChangeRequest}
                />
            </React.Fragment>
        );
    }
}

export default withRouter(MetadataExport);