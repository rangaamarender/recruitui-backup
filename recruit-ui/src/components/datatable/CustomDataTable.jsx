import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef, } from 'react';
import { Menu } from 'primereact/menu';

const CustomDataTable = ({
    data,
    selectedColumns,
    columnsConfig,
    actionMenu,
    onRowSelect,
    onRowUnselect,
    handleAction,
    handleFilterClick,
    dataTableRef,
    currentPageReportTemplate,
    rows,
    first,
    last,
    onPageChange,
    sortable,
    action,
    onRowClick,
    setActiveRowMenu,
    activeRowMenu,
}) => {
    const showMenu = (event, rowData) => {
        setActiveRowMenu(rowData);
        menuRef.current.show(event);
    };

    const onHideMenu = () => {
        setActiveRowMenu(null);
    };

    const menuRef = useRef(null);

    const actionBodyTemplate = (rowData) => {
        const handleOptionClick = (event) => {
            event.stopPropagation();
            setActiveRowMenu(rowData.organizationID);
            showMenu(event, rowData);
        };
        return (
            <div className="action-buttons" onClick={handleOptionClick}>
                <i className="pi pi-ellipsis-v" />
                <Menu
                    model={actionMenu.map((menuItem) => ({
                        label: menuItem.label,
                        icon: menuItem.icon,
                        command: (event) => {
                            handleAction(event, menuItem, action, activeRowMenu);
                            onHideMenu();
                        },
                    }))}
                    popup
                    ref={menuRef}
                    onHide={onHideMenu}
                />
            </div>
        );
    };

    const getNestedValue = (object, path) => {
        const pathArray = path.split('.'); // Split the path into an array of keys
        let value = object;

        for (const key of pathArray) {
            if (value && value.hasOwnProperty(key)) {
                value = value[key]; // Access the nested property
            } else {
                return undefined; // Property not found
            }
        }

        return value;
    };

    return (
        <div>
            <DataTable
                ref={dataTableRef}
                stripedRows
                size="normal"
                value={data}
                paginator
                rowsPerPageOptions={[10, 25, 50]}
                selectionMode="single"
                onRowSelect={onRowSelect}
                onRowUnselect={onRowUnselect}
                emptyMessage="No records found"
                rows={rows}
                first={first}
                last={last}
                onPageChange={onPageChange}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate={currentPageReportTemplate}
                onRowClick={onRowClick}
            >
                {columnsConfig.map(
                    (col) =>
                        selectedColumns.includes(col.field) && (
                            <Column
                                className={!col.isSelected && 'd-none'}
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={col.body || ((rowData) => getNestedValue(rowData, col.field))} // Use the function to access nested property
                                filter={handleFilterClick}
                                filterPlaceholder={`Search By ${col.header}`}
                                filterField={col.field}
                                sortable={col.sortable !== undefined ? col.sortable : sortable}
                            />
                        )
                )}
                <Column header="Options" body={actionBodyTemplate} bodyStyle={{ textAlign: 'right' }} />
            </DataTable>
        </div>
    );
};
export default CustomDataTable;
