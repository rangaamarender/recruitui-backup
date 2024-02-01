import React from 'react';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import CustomCalander from '../../../../../components/controls/CustomCalender';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import CustomCheckbox from '../../../../../components/controls/CustomCheckbox';

const StartContract = ({ control, errors }) => {
    const required = true;

    const timesheetOptions = [{ value: 'Validate', label: 'Validate' }];

    const workOrderTypeOptions = [{ value: 'TMIR', label: 'T&M Individual Rate' }];

    return (
        <div>
            <div className="md:flex">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="workOrderName"
                    labelId="workOrderName.label"
                    requiredMsg="workOrderName.required"
                    className="col-12 md:col-6"
                    required={required}
                    placeholder="Work Order Name"
                />
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="wbsCode"
                    labelId="wbsCode.label"
                    requiredMsg="wbsCode.required"
                    className="col-12 md:col-6"
                    required={required}
                    placeholder="WBS Code"
                />
            </div>
            <div className="md:flex">
                <CustomCalander
                    control={control}
                    errors={errors}
                    name="contractStartDate"
                    labelId="startDate.label"
                    requiredMsg="startDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6  sm:col-12"
                />
                <CustomCalander
                    control={control}
                    errors={errors}
                    name="contractEndDate"
                    labelId="endDate.label"
                    required={required}
                    requiredMsg="endDate.required"
                    defaultValue=""
                    showIcon={true}
                    className="md:col-6 col-12"
                />
            </div>
            <div className="md:flex">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="tsApprovalFlow"
                    labelId="tsApprovalFlow.label"
                    defaultValue=""
                    options={timesheetOptions}
                    required={required}
                    requiredMsg="tsApprovalFlow.required"
                    placeholder="Select Timesheet Approval"
                    className="md:col-6"
                />
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="workOrderType"
                    labelId="workOrderType.label"
                    defaultValue=""
                    options={workOrderTypeOptions}
                    required={required}
                    requiredMsg="workOrderType.required"
                    placeholder="Select Work Order Type"
                    className="md:col-6"
                />
            </div>
            <CustomCheckbox
                control={control}
                errors={errors}
                required={required}
                name="multiResource"
                requiredMsg="multiResource.required"
                className="md:col-6 col-12"
                labelId="multiResource.label"
            />
        </div>
    );
};

export default StartContract;
