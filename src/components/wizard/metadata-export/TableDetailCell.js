import * as React from 'react';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    cell: {
        overflow: "visible",
        paddingRight: 0,
        paddingLeft: theme.spacing.unit,
        textAlign: "center"
    },
    checkbox: {
        marginTop: "-1px",
        marginBottom: "-1px",
        width: theme.spacing.unit * 5,
        height: theme.spacing.unit * 5
    }
});

export const TableDetailCellBase = ({
                                        style,
                                        selected,
                                        onToggle,
                                        onDelete,
                                        onViewDetail,
                                        classes,
                                        className,
                                        row,
                                        tableRow,
                                        tableColumn,
                                        indeterminate,
                                        ...restProps
                                    }) => (
    <TableCell
        padding="checkbox"
        style={style}
        className={classNames(classes.cell, className)}
        {...restProps}
    >
        <div id="checkbox" style={{display: "flex", flexFlow: "row nowrap"}}>
            <IconButton aria-label="Delete" onClick={e => {
                e.stopPropagation();
                onDelete();
            }}>
                <DeleteIcon/>
            </IconButton>
        </div>
    </TableCell>
);

export default withStyles(styles, {name: "TableDetailCell"})(
    TableDetailCellBase
);
