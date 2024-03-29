import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import CustomInputText from '../../../components/controls/CustomInputText';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCompaniesData,
    fetchDocumentRequest,
    updateDocumentRequest,
} from '../../../redux/actions/adminResourceRoleAction';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';

import CustomCheckboxDoument from '../../../components/common/CustomCheckboxDoument';

import { Toast } from 'primereact/toast';
import axios from 'axios';
import AdminCompaniesTable from '../container/AdminCompanies/AdminCompaniesTable';
import AdminCompaniesDetails from '../container/AdminCompanies/AdminCompaniesDetails';

function AdminCompanyDocuments() {
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
        setValue,
    } = useForm();

    const expiryValue = watch('checkbox3');
    const data = watch();
    const dataById = useSelector((state) => state.adminRole.selectedDocumentData);

    const required = true;
    const dispatch = useDispatch();
    const [visibleRight, setVisibleRight] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarVisibleWizard, setSidebarVisibleWizard] = useState(false);
    const [activeRowMenu, setActiveRowMenu] = useState(null);
    const [isEditClick, setIsEditClick] = useState(false);
    const [selectedTableRow, setSelectedTableRow] = useState(null);

    const [checkbox1, setCheckbox1] = useState(dataById?.downloadable);
    const [checkbox2, setCheckbox2] = useState(dataById?.secure);
    const [checkbox3, setCheckbox3] = useState(dataById?.expiryInd);
    const [checkbox4, setCheckbox4] = useState(dataById?.monitorable);
    const [showEditForm, setShowEditForm] = useState(false);

    console.log(setCheckbox1);
    console.log(setCheckbox2);
    console.log(setCheckbox3);
    console.log(setCheckbox4);
    console.log(setCheckbox4);

    const toast = useRef(null);

    // const show = () => {
    //     toast.current.show({ severity: 'warn', summary: '', detail: 'Please fill in all required fields.' });
    // };

    const attributeTypeOptions = [
        { label: 'STRING', value: 'STRING' },
        { label: 'NUMBER', value: 'NUMBER' },
        { label: 'DATE', value: 'DATE' },
    ];
    const onViewClick = (event) => {
        setSidebarVisible(true);
        setIsEditClick(false);
        setShowEditForm(false);
    };
    const onEditClick = (event) => {
        setSidebarVisible(true);
        setIsEditClick(true);
        setShowEditForm(false);
    };

    const onDeleteClick = async () => {
        const apiUrl = `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef/${activeRowMenu}`;

        try {
            await axios.get(apiUrl);
        } catch (error) {
            console.log(error);
        }
    };
    const action = {
        onViewClick,
        onEditClick,
        onDeleteClick,
    };
    const onSubmit = (data) => {
        const apiPayLoad = {
            documentName: data.documentName,
            docDisplayName: data.docDisplayName,
            downloadable: data.checkbox1,
            secure: data.checkbox2,
            expiryInd: data.checkbox3 || false,
            monitorable: data.checkbox3 ? data.checkbox4 || false : false,
            docAttrDef: null,
        };

        dispatch(createCompaniesData(apiPayLoad));
        reset();
        setVisibleRight(false);
    };
    const toggleSidebar = () => {
        setSidebarVisible(false);
        reset();
    };

    const handleUpdate = () => {
        const id = dataById.documentDefID;
        const editPayload = {
            documentName: data.documentName,
            docDisplayName: data.docDisplayName,

            downloadable: !data.checkbox1 ? false : data.checkbox1,
            secure: !data.checkbox2 ? false : data.checkbox2,
            expiryInd: !data.checkbox3 ? false : data.checkbox3,
            monitorable: !data.checkbox4 ? false : data.checkbox4,
            docAttrDef: null,
        };

        dispatch(updateDocumentRequest(id, editPayload));
        reset();
        toggleSidebar();
    };

    const handleCancel = () => {
        setVisibleRight(false);
        reset();
    };
    const handleRowSelect = (event) => {
        const clickedRowData = event.data;
        setSelectedTableRow(clickedRowData);
        dispatch(fetchDocumentRequest(clickedRowData.documentDefID));
        setSidebarVisible(!sidebarVisible);
        setIsEditClick(true);
        setShowEditForm(false);
    };

    const handleRowUnselect = (e) => {
        setSidebarVisible(!sidebarVisible);
        reset();
    };

    const onRowClick = (event) => {
        const rowData = event.data;
        console.log(rowData);
    };

    return (
        <>
            <Toast ref={toast} />
            <Sidebar
                visible={sidebarVisible}
                onHide={toggleSidebar}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly title="Add Companies Definitions" onClick={toggleSidebar} />
                </div>
                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <AdminCompaniesDetails
                        isEditClick={isEditClick}
                        dataById={dataById}
                        handleUpdate={handleUpdate}
                        selectedRow={selectedTableRow}
                        checkbox1={checkbox1}
                        checkbox2={checkbox2}
                        checkbox3={checkbox3}
                        checkbox4={checkbox4}
                        attributeTypeOptions={attributeTypeOptions}
                        setShowEditForm={setShowEditForm}
                        showEditForm={showEditForm}
                        control={control}
                        errors={errors}
                        setValue={setValue}
                        data={data}
                    />
                </div>
                {showEditForm ? (
                    <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                        <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                            <Button
                                label="Cancel"
                                type="button"
                                severity="secondary"
                                onClick={toggleSidebar}
                                size="small"
                            />
                            <Button
                                label="Update"
                                size="small"
                                onClick={() => handleSubmit(handleUpdate(dataById.documentDefID))}
                            />
                        </div>
                    </div>
                ) : null}
            </Sidebar>

            <Sidebar
                visible={visibleRight}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleCancel}
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly title="Add Companies Document Definition" onClick={handleCancel} />
                </div>

                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <form>
                        <div className="formgrid grid p-2 ">
                            <div className="col-12 md:col-12 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="documentName"
                                    labelId="documentNamelabel.label"
                                    defaultValue=""
                                    required={required}
                                    requiredMsg="documentNamelabel"
                                    placeholder="Document Name"
                                    autoFocus
                                />
                            </div>
                            <div className="col-12 md:col-12 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="docDisplayName"
                                    labelId="documentDisplayName.label"
                                    defaultValue=""
                                    required={required}
                                    requiredMsg="documentDisplayName"
                                    placeholder="Document Display Name"
                                />
                            </div>

                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox1"
                                labelId="Download"
                                defaultValue={false}
                                className="col-12 md:col-3"
                                rules={{ required: isDirty.checkbox1 && 'Checkbox is required' }}
                            />
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox2"
                                labelId="Secure"
                                defaultValue={false}
                                className="col-12 md:col-3"
                                rules={{ required: isDirty.checkbox2 && 'Checkbox is required' }}
                            />
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox3"
                                labelId="Expiry"
                                defaultValue={false}
                                className="col-12 md:col-3"
                                rules={{ required: isDirty.checkbox3 && 'Checkbox is required' }}
                                dependentField={{ value: expiryValue }}
                            />
                            {watch('checkbox3') && (
                                <CustomCheckboxDoument
                                    control={control}
                                    name="checkbox4"
                                    labelId="Monitorable"
                                    defaultValue={false}
                                    className="col-12 md:col-3"
                                    rules={{ required: isDirty.checkbox4 && 'Checkbox is required' }}
                                />
                            )}
                        </div>
                    </form>
                </div>
                {/* table */}

                <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                    <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                        <Button label="Cancel" type="button" severity="secondary" onClick={handleCancel} size="small" />
                        <Button label="Submit" size="small" onClick={handleSubmit(onSubmit)} />
                    </div>
                </div>
            </Sidebar>
            {/* 121212 */}
            <div className="flex justify-content-between align-items-center border-bottom p-1">
                <div className="fs-4 fw-bold">Companies Documents</div>
                <Button icon="pi pi-plus fs-5" className="" size="small" onClick={() => setVisibleRight(true)} />
            </div>
            <AdminCompaniesTable
                sidebarVisible={sidebarVisibleWizard}
                setSidebarVisible={setSidebarVisibleWizard}
                handleRowSelect={handleRowSelect}
                handleRowUnselect={handleRowUnselect}
                setActiveRowMenu={setActiveRowMenu}
                isEditClick={isEditClick}
                setIsEditClick={setIsEditClick}
                action={action}
                onRowClick={onRowClick}
                selectedTableRow={selectedTableRow}
                activeRowMenu={activeRowMenu}
            />
        </>
    );
}

export default AdminCompanyDocuments;
