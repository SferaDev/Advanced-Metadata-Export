import React from "react";
import PropTypes from "prop-types";
import {
    Grid,
    SearchPanel,
    TableGroupRow,
    TableHeaderRow,
    TableSelection,
    Toolbar,
    VirtualTable
} from "@devexpress/dx-react-grid-material-ui";
import {
    GroupingState,
    IntegratedFiltering,
    IntegratedGrouping,
    IntegratedSelection,
    IntegratedSorting,
    SearchState,
    SelectionState,
    SortingState
} from "@devexpress/dx-react-grid";
import {Template, TemplatePlaceholder} from "@devexpress/dx-react-core";
import Spacer from "../../common/Spacer";

class MetadataGrid extends React.Component {
    static propTypes = {
        d2: PropTypes.object.isRequired,
        rows: PropTypes.array.isRequired,
        cellComponent: PropTypes.func.isRequired,
        columns: PropTypes.array,
        sorting: PropTypes.array,
        grouping: PropTypes.array,
        expandedGroups: PropTypes.array,
        selection: PropTypes.array,
        selectionAsIndeterminate: PropTypes.array,
        expandedRowIds: PropTypes.array,
        filters: PropTypes.array,
        columnOrder: PropTypes.array,
        columnWidths: PropTypes.array,
        totalCount: PropTypes.number,
        pageSize: PropTypes.number,
        pageSizes: PropTypes.array,
        currentPage: PropTypes.number,
        searchValue: PropTypes.string,
        showSelectAll: PropTypes.bool,
        selectByRowClick: PropTypes.bool,
        onSortingChange: PropTypes.func,
        onGroupingChange: PropTypes.func,
        onSearchValueChange: PropTypes.func,
        onSelectionChange: PropTypes.func,

    };

    static defaultProps = {
        columns: [{
            name: 'id',
            title: 'ID'
        }, {
            name: 'name',
            title: 'Name'
        }, {
            name: 'type',
            title: 'Type'
        }],
        sorting: [{columnName: 'type', direction: 'asc'}],
        grouping: [{columnName: 'type'}],
        expandedGroups: [],
        selection: [],
        selectionAsIndeterminate: [],
        expandedRowIds: [],
        filters: [],
        columnOrder: [],
        columnWidths: [],
        totalCount: 0,
        pageSize: 8,
        pageSizes: [5, 8, 16],
        currentPage: 0,
        searchValue: '',
        showSelectAll: false,
        selectByRowClick: false,
        onSortingChange: () => null,
        onGroupingChange: () => null,
        onSearchValueChange: () => null,
        onSelectionChange: () => null,
    };

    getRowId = row => row.id;

    render() {
        const {
            rows, columns, selection, searchValue, sorting, grouping, cellComponent, children, showSelectAll, selectByRowClick,
            onSortingChange, onGroupingChange, onSearchValueChange, onSelectionChange
        } = this.props;

        return (
            <Grid
                rows={rows}
                columns={columns}
                getRowId={this.getRowId}
            >
                <SortingState
                    sorting={sorting}
                    onSortingChange={onSortingChange}
                />
                <GroupingState
                    grouping={grouping}
                    onGroupingChange={onGroupingChange}
                />
                <SearchState
                    value={searchValue}
                    onValueChange={onSearchValueChange}
                />
                <SelectionState
                    selection={selection}
                    onSelectionChange={onSelectionChange}
                />

                <IntegratedSorting/>
                <IntegratedGrouping/>
                <IntegratedFiltering/>
                <IntegratedSelection/>

                <VirtualTable/>

                <TableHeaderRow/>
                <TableGroupRow/>
                <TableSelection
                    showSelectAll={showSelectAll}
                    selectByRowClick={selectByRowClick}
                    cellComponent={cellComponent}
                />

                <Toolbar/>
                <Template
                    name="toolbarContent"
                >
                    <TemplatePlaceholder/>
                    {children}
                    <Spacer grow='1'/>
                </Template>
                <SearchPanel/>
            </Grid>
        );
    }
}

export default MetadataGrid;