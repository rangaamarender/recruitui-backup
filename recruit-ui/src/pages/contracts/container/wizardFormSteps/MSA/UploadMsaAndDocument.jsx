import React, { useState, useEffect, useRef } from 'react';
import CustomCalender from '../../../../../components/controls/CustomCalender';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchContractsAssignDocumentRequest,
    fetchDocumentRequest,
} from '../../../../../redux/actions/adminResourceRoleAction';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'jspdf-autotable';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';

import axios from 'axios';
import CustomInputText from '../../../../../components/controls/CustomInputText';
// import { uploadDocumentRequest } from '../../../../../redux/actions/contractActions';

function UploadMsaAndDocument({ control, errors, validationErrors, setValidationErrors, setFinish, setValue, data }) {
    let required = true;
    const dispatch = useDispatch();
    const toast = useRef(null);
    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail, life: 5000 });
    };
    const dataApi = useSelector((state) => state.adminRole.contractAssignDocumentsList);
    const dataById = useSelector((state) => state.adminRole.selectedDocumentData);
    const currentContractId = useSelector((state) => state.contract.contractId);

    const [selectedDoc, setSelectedDoc] = useState([]);
    const [blob, setBlob] = useState(null);
    const [tempSelectedImage, setTempSelectedImage] = useState();
    console.log(tempSelectedImage);
    const [isDropDownClicked, setIsDropDownClicked] = useState(false);
    const [isDocumentSelected, setIsDocumentSelected] = useState(false);

    const handleDropdownChange = (event) => {
        event.stopPropagation();
        const selectedDocumentId = event.target.value;
        setValue('docType', event.target.value);

        dispatch(fetchDocumentRequest(selectedDocumentId));
        setIsDropDownClicked(true);
    };

    function formatToDdMmYyyy(date) {
        const year = date?.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const handleUpload = async () => {
        const contractId = currentContractId;
        const apiUrl = `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/${contractId}/documentfile`;
        const docDefId = dataById?.documentDefID;
        const issueDate = dataById?.expiryInd ? formatToDdMmYyyy(data.issueDate) : null;
        const expiryDate = dataById?.expiryInd ? formatToDdMmYyyy(data.documentEndDate) : null;
        const formData = new FormData();
        formData.append('contractfile', blob);

        const params = {
            docDefId: docDefId,
            issueDate,
            expiryDate,
        };
        // console.log('Contract ID before dispatch:', contractId);
        // dispatch(uploadDocumentRequest(contractId, formData, { params }));
        try {
            const response = await axios.post(apiUrl, formData, { params: params });

            if (response.status === 200) {
                console.log('Document uploaded successfully.');
                showToast('success', 'Success', 'Document uploaded successfully.');
            } else {
                console.error(`Error uploading document. Status code: ${response.status}, Response: ${response.data}`);
            }
        } catch (error) {
            console.error('Error uploading document:', error);
        }
    };

    // dispatch(addSelectedDocument(newDocument));

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };
    const handleImageChange = (event) => {
        setIsDocumentSelected(true);
        const selectedImage = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataURL = e.target.result;
            setTempSelectedImage(imageDataURL);

            // Convert data URL to Blob
            const blob = dataURLtoBlob(imageDataURL);
            setBlob(blob);
        };

        reader.readAsDataURL(selectedImage);
    };
    const handleAddClick = () => {
        const newDocument = {
            ...dataById,
            docType: dataById.documentName,
            issueDate: dataById?.expiryInd ? formatDate(data.issueDate) : null,
            expiryDate: dataById?.expiryInd ? formatDate(data.documentEndDate) : null,
        };
        const isDuplicate = selectedDoc.some((doc) => doc.documentDefID === dataById.documentDefID);
        if (isDuplicate) {
            console.error('Document with the same ID already exists. Duplicates are not allowed.');
            showToast('error', 'Error', 'Document with the same ID already exists. Duplicates are not allowed.');
        } else if (
            dataById &&
            data.docType &&
            data.documentName &&
            ((dataById.expiryInd && data.issueDate && data.documentEndDate) || !dataById.expiryInd) &&
            isDocumentSelected
        ) {
            setSelectedDoc((prevSelectedDocuments) => [...prevSelectedDocuments, newDocument]);
            handleUpload();
            setValue('docType', '');
            setValue('documentName', '');
            setValue('issueDate', '');
            setValue('documentEndDate', '');
        } else {
            console.error('Incomplete data. Please fill in all required fields.');
            console.error('Incomplete data. Please fill in all required fields.');
            showToast('error', 'Error', 'Incomplete data. Please fill in all required fields.');
        }
    };

    useEffect(() => {
        dispatch(fetchContractsAssignDocumentRequest());
    }, [dispatch]);
    const statusBodyTemplate = (rowData) => {
        const handleStatusUpdate = (e) => {
            e.stopPropagation();
        };
        return <InputSwitch checked={rowData?.expiryInd} onChange={handleStatusUpdate} />;
    };
    const renderIssueDate = (rowData) => {
        return rowData.expiryInd ? rowData.issueDate : '----';
    };

    const renderExpiryDate = (rowData) => {
        return rowData.expiryInd ? rowData.expiryDate : '----';
    };
    const dataURLtoBlob = (dataURL) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    return (
        <>
            <Toast ref={toast} />
            <h4 className="fw-bold text-center">Upload MSA And Supporting Documents</h4>

            <div className="col-12 md:col-12">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="docType"
                    labelId="docType.label"
                    defaultValue=""
                    options={dataApi?.map((data, index) => ({
                        id: index,
                        label: data.documentName,
                        value: data.documentDefID,
                    }))}
                    required={required}
                    placeholder="Select Document type"
                    requiredMsg="docType.required"
                    onChange={handleDropdownChange}
                />
            </div>
            <div className="md:col-12 m-0">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="documentName"
                    labelId="documentName"
                    defaultValue=""
                    placeholder="Document Name"
                    className="md:col-12"
                    required={required}
                    requiredMsg="documentName.required"
                />
            </div>

            <div className="md:flex">
                <CustomCalender
                    control={control}
                    errors={errors}
                    name="issueDate"
                    labelId="issueDate.label"
                    requiredMsg="issueDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6"
                    disabled={!isDropDownClicked || !dataById.expiryInd}
                />

                <CustomCalender
                    control={control}
                    errors={errors}
                    name="documentEndDate"
                    labelId="documentEndDate.label"
                    requiredMsg="documentEndDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6"
                    disabled={!isDropDownClicked || !dataById.expiryInd}
                />
            </div>

            <div className="col-12 md:col-12">
                <div className="profilepic-border rounded  mt-1 p-5 d-flex justify-content-center align-items-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="imageInput"
                        disabled={!isDropDownClicked}
                    />
                </div>
            </div>

            <div className="">
                <Button label="Upload Documents" text type="button" onClick={handleAddClick} />
            </div>
            {selectedDoc?.length ? (
                <div>
                    <DataTable value={selectedDoc} size="small">
                        <Column field="docType" header="Document Type" />
                        <Column field="documentName" header="Document Name" />
                        <Column field=" expiryInd" header="Expiry Ind" body={statusBodyTemplate} />
                        <Column field="issueDate" header="Issue Date" body={renderIssueDate} />
                        <Column field="expiryDate" header="Expiry Date" body={renderExpiryDate} />
                    </DataTable>
                </div>
            ) : null}
        </>
    );
}
export default UploadMsaAndDocument;
