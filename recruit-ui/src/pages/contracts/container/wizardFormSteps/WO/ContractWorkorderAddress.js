import React, { useEffect, useState } from 'react';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchCountryUi, storeWorkLocation } from '../../../../../redux/actions/workOrderActions';
import { useForm } from 'react-hook-form';

const ContractWorkorderAddress = ({ control, errors, data, setValue }) => {
    // const filteredAddressData = addressData.map(({ id, ...rest }) => rest);
    const dispatch = useDispatch();
    const workLocations = useSelector((state) => state.workOrder.workLocations);
    const countries = useSelector((state) => state.workOrder.countries);
    const countryUi = useSelector((state) => state.workOrder.countryUi);
    console.log(countryUi, '5675');

    const [addressData, setAddressData] = useState(workLocations);
    const [addressError, setAddressError] = useState('');
    const [addressEdit, setAddressEdit] = useState(false);
    const [addressId, setAddressId] = useState(null);
    console.log(addressData, 'addressData');
    const required = true;

    const {
        control: control1,
        handleSubmit: handleSubmit1,
        formState: { errors: errors1 },
        watch: watch1,
    } = useForm();

    const data1 = watch1();

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    const handleCountryChange = (e) => {
        setValue('countryCode', e.target.value);
        const code = e.target.value;
        dispatch(fetchCountryUi({ code }));
    };

    const handleAddressReset = () => {
        setValue('workLocationName', '');
        setValue('address1', '');
        setValue('address2', '');
        setValue('country', '');
        setValue('state', '');
        setValue('city', '');
        setValue('zipCode', '');
    };

    const handleAddressAdd = () => {
        //     const isDuplicate = addressData.some((item) => item.workLocationName === data.workLocationName);
        //     if (!isDuplicate) {
        const myData = {
            workLocationName: data1.workLocationName,
            addressName: data1?.addressName,
            address1: data1?.address1 || null,
            address2: data1?.address2 || null,
            address3: data1?.address3 || null,
            address4: data1?.address4 || null,
            address5: data1?.address5 || null,
            city: data1?.city,
            state: data1?.state,
            postalCode: data1?.postalCode,
            postOfficeBox: null,
        };
        const updatedAddressData = [...addressData, myData];
        setAddressData(updatedAddressData);
        dispatch(storeWorkLocation(updatedAddressData));
        // handleAddressReset();
        setAddressError('');
        //     } else {
        //         setAddressError('Duplicate Work Location is not allowed');
        //     }
        // }
    };

    const handleAddressUpdate = () => {
        if (data.workLocationName && data.address1 && data.country && data.state && data.city && data.zipCode) {
            const isDuplicate = addressData.some(
                (item) => item.workLocationName === data.workLocationName && item.id !== addressId
            );

            if (!isDuplicate) {
                const updatedAddressData = addressData.map((item) => {
                    if (item.id === addressId) {
                        return {
                            ...item,
                            workLocationName: data.workLocationName,
                            address1: data.address1,
                            address2: data.address2,
                            country: data.country,
                            state: data.state,
                            city: data.city,
                            zip: data.zipCode,
                        };
                    }
                    return item;
                });

                setAddressData(updatedAddressData);
                dispatch(storeWorkLocation(updatedAddressData));
                handleAddressReset();
                setAddressEdit(false);
                setAddressId(null);
                setAddressError('');
            } else {
                setAddressError('Duplicate Work Location is not allowed');
            }
        } else {
            setAddressError('Fields are required');
        }
    };

    const addChargeCodeColumn = (rowData) => {
        return <Button icon="pi pi-plus" size="small" />;
    };
    const optionsColumn = (rowData) => {
        const handleAddressDelete = () => {
            const updatedAddressData = addressData.filter((item) => item.id !== rowData.id);
            setAddressData(updatedAddressData);
            dispatch(storeWorkLocation(updatedAddressData));
        };

        const handleAddressEdit = () => {
            setAddressEdit(true);
            setAddressId(rowData.id);
            setValue('workLocationName', rowData.workLocationName);
            setValue('address1', rowData.address1);
            setValue('address2', rowData.address2);
            setValue('country', rowData.country);
            setValue('state', rowData.state);
            setValue('city', rowData.city);
            setValue('zipCode', rowData.zip);
            setAddressError('');
        };

        return (
            <div className="flex justify-content-between align-items-center">
                <div className="flex align-items-center">
                    <i
                        className={
                            addressEdit
                                ? 'disabled-button pi pi-pencil font-bold mr-4'
                                : 'pi pi-pencil font-bold mr-4 cursor-pointer'
                        }
                        onClick={handleAddressEdit}
                    />
                    <i
                        className={
                            addressEdit
                                ? 'disabled-button pi pi-trash font-bold mr-4'
                                : 'pi pi-trash font-bold mr-4 cursor-pointer'
                        }
                        onClick={() => handleAddressDelete()}
                    />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div>
                <div className="fw-bold fs-3 mb-2">Work Locations</div>
                <div>
                    <CustomInputText
                        control={control1}
                        errors={errors1}
                        name="workLocationName"
                        labelId="workLocationName.label"
                        required={required}
                        requiredMsg="workLocationName.required"
                        className="col-12"
                        placeholder="Work Location"
                    />
                </div>
                <CustomDropdown
                    control={control1}
                    errors={errors1}
                    name="countryCode"
                    labelId="countryCode"
                    defaultValue=""
                    options={countries.map((country) => ({
                        value: country.countryCode,
                        label: country.countryName,
                    }))}
                    required={required}
                    requiredMsg="countryCode.required"
                    placeholder="Select country"
                    className="col-12"
                    onChange={handleCountryChange}
                />
                <CustomInputText
                    control={control1}
                    errors={errors1}
                    name="addressName"
                    required={required}
                    labelId="addressName.label"
                    requiredMsg="addressNameWO.required"
                    className="col-12"
                    placeholder="Address Name"
                />
                {countryUi?.addressLines?.map((ui) => {
                    return (
                        <div>
                            <CustomInputText
                                control={control1}
                                errors={errors1}
                                name={ui.addressLine}
                                labelId={ui.displayLabel}
                                defaultValue=""
                                placeholder={ui.displayLabel}
                                required={ui.mandatory}
                                requiredMsg="address1.required"
                                className="md:col-12"
                            />
                        </div>
                    );
                })}

                <div className="text-danger">{addressError}</div>
                {addressEdit ? (
                    <div className="flex justify-content-end gap-4 mb-3">
                        <Button
                            label="cancel"
                            severity="secondary"
                            className="w-2"
                            size="small"
                            onClick={() => {
                                handleAddressReset();
                                setAddressEdit(false);
                                setAddressId(null);
                            }}
                        />
                        <Button label="Update" className="w-2" size="small" onClick={handleAddressUpdate} />
                    </div>
                ) : (
                    <div className="flex justify-content-end mb-3">
                        <Button label="Add" className="w-2" size="small" onClick={handleSubmit1(handleAddressAdd)} />
                    </div>
                )}
                <div>
                    <DataTable value={addressData}>
                        <Column field="workLocationName" header="Work location"></Column>
                        <Column field="country" header="Country"></Column>
                        <Column field="state" header="State"></Column>
                        <Column field="zip" header="Zip"></Column>
                        <Column body={(rowData) => optionsColumn(rowData)} header="Options"></Column>
                        <Column body={(rowData) => addChargeCodeColumn(rowData)} header="Charge Codes"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default ContractWorkorderAddress;
// <div className="fw-bold">
//     Address <span className="text-danger">*</span>
// </div>
// <div className="flex-wrap p-fluid">
//     <div>
//         <CustomInputText
//             control={control}
//             errors={errors}
//             name="address1"
//             labelId="address1"
//             defaultValue=""
//             placeholder="Address line 1"
//             requiredMsg="address1.required"
//             className="md:col-12"
//         />
//         <CustomInputText
//             control={control}
//             errors={errors}
//             name="address2"
//             labelId="address2"
//             placeholder="Address line 2"
//             defaultValue=""
//             className="md:col-12"
//         />
//         <CustomInputText
//             control={control}
//             errors={errors}
//             name="address2"
//             labelId="address3"
//             placeholder="Address line 3"
//             defaultValue=""
//             className="md:col-12"
//         />
//         <CustomInputText
//             control={control}
//             errors={errors}
//             name="address2"
//             labelId="address4"
//             placeholder="Address line 4"
//             defaultValue=""
//             className="md:col-12"
//         />
//         <CustomInputText
//             control={control}
//             errors={errors}
//             name="address2"
//             labelId="address5"
//             placeholder="Address line 5"
//             defaultValue=""
//             className="md:col-12"
//         />
//     </div>

//     {data.country === 'US' && (
//         <div>
//             <CustomInputText
//                 control={control}
//                 errors={errors}
//                 name="address1"
//                 labelId="address1"
//                 defaultValue=""
//                 placeholder="Address line 1"
//                 requiredMsg="address1.required"
//                 className="md:col-12"
//             />
//             <CustomInputText
//                 control={control}
//                 errors={errors}
//                 name="address2"
//                 labelId="address2"
//                 placeholder="Address line 2"
//                 defaultValue=""
//                 className="md:col-12"
//             />
//         </div>
//     )}
//     <div className="md:flex">
//         <CustomDropdown
//             control={control}
//             errors={errors}
//             name="country"
//             labelId="countryCode"
//             defaultValue=""
//             options={options}
//             requiredMsg="countryCode.required"
//             placeholder="Select country"
//             className="md:col-6"
//         />
//         <CustomDropdown
//             control={control}
//             errors={errors}
//             name="state"
//             labelId="state"
//             defaultValue=""
//             options={options}
//             requiredMsg="state.required"
//             placeholder="Select state"
//             className="md:col-6"
//         />
//     </div>
//     <div className="md:flex">
//         <CustomDropdown
//             control={control}
//             errors={errors}
//             name="city"
//             labelId="city"
//             defaultValue=""
//             options={options}
//             requiredMsg="city.required"
//             placeholder="Select city"
//             className="md:col-6"
//         />
//         <CustomInputText
//             control={control}
//             errors={errors}
//             name="zipCode"
//             labelId="postalCode"
//             defaultValue=""
//             placeholder="Zip"
//             requiredMsg="postalCode.required"
//             className=" md:col-6"
//         />
//     </div>
// </div>
