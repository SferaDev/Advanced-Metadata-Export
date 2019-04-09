import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import i18n from "@dhis2/d2-i18n";
import {ConfirmationDialog, withSnackbar} from "d2-ui-components";

import { Card, CardContent } from "@material-ui/core";
import MetadataGrid from "../metadata-export/MetadataGrid";
import Button from "@material-ui/core/Button";
import TableSelectCell from "../metadata-export/TableSelectCell";
import TableDetailCell from "../metadata-export/TableDetailCell";
import {Extractor} from "../../../logic/extractor";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import {createMetadataAction} from "../../../redux/actions/metadataAction";

class GeneralInfoStep extends React.Component {
    state = {
        optionsDialogOpen: false,
        adminDialogOpen: false,
        jsonDialogOpen: false,
    };

    static propTypes = {
        d2: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.selectCell = this.selectCell.bind(this);
        this.detailCell = this.detailCell.bind(this);
    }

    getRowId = row => row.id;

    selectCell({row, selected, ...restProps}) {
        const indeterminate = this.state.selectionAsIndeterminate.findIndex(index => this.getRowId(row) === index) !== -1;
        const onDelete = (id) => this.state.selectionAsIndeterminate.clear();

        const onViewDetail = () => {
            Extractor.getInstance().getElementById(this.getRowId(row)).then(element => {
                if (element !== undefined) this.openJSON(element);
                else this.props.snackbar.info('Item not fetched yet');
            });
        };

        return (
            <TableSelectCell
                indeterminate={!selected && indeterminate}
                selected={selected}
                onDelete={onDelete}
                onViewDetail={onViewDetail}
                {...restProps}
            />
        );
    }

    detailCell({row, selected, ...restProps}) {
        const onDelete = () => {
            this.props.removeFromSelection(this.getRowId(row));
        };

        const onViewDetail = () => {
            Extractor.getInstance().getElementById(this.getRowId(row)).then(element => {
                if (element !== undefined) this.openJSON(element);
                else this.props.snackbar.info('Item not fetched yet');
            });
        };

        return (
            <TableDetailCell
                onDelete={onDelete}
                onViewDetail={onViewDetail}
                {...restProps}
            />
        );
    }

    openOptions = () => {
        this.setState({ optionsDialogOpen: true });
    };

    openAdmin = () => {
        this.setState({ adminDialogOpen: true });
    };

    openJSON = (jsonDialogContent) => {
        this.setState({ jsonDialogOpen: true, jsonDialogContent });
    };

    render() {
        const {
            rows, selection, selectionAsIndeterminate, onSelectionClear
        } = this.props.metadata;

        return [
            <Card>
                <CardContent>
                    <MetadataGrid
                        d2={this.props.d2}
                        rows={rows}
                        cellComponent={this.selectCell}
                        showSelectAll={true}
                        selectByRowClick={true}
                    >
                        <Button onClick={this.openOptions}>
                            {i18n.t("Options")}
                        </Button>
                        <Button onClick={this.openAdmin}>
                            {i18n.t("Admin")}
                        </Button>
                    </MetadataGrid>
                    <MetadataGrid
                        d2={this.props.d2}
                        rows={_.uniq(_.concat(selection, ...selectionAsIndeterminate).map((id) => rows.find((e => e.id === id))))}
                        cellComponent={this.detailCell}
                    >
                        <Button onClick={onSelectionClear}>
                            {i18n.t("Clear")}
                        </Button>
                    </MetadataGrid>
                </CardContent>
            </Card>,
            <ConfirmationDialog>
            </ConfirmationDialog>,
            <ConfirmationDialog>
            </ConfirmationDialog>
        ];
    }
}

const mapStateToProps = state => ({
    metadata: state.metadata,
});

const mapDispatchToProps = dispatch => ({
    onSelectionChange: selection => dispatch(createMetadataAction('selection', selection)),
    onSelectionClear: () => {
        dispatch(createMetadataAction('selection', []));
        dispatch(createMetadataAction('selectionAsIndeterminate', []));
    },
    removeFromSelection: id => dispatch({type: actions.GRID_REMOVE_FROM_SELECTION, id: id}),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withSnackbar(GeneralInfoStep));