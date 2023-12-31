
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import style from './Payment.module.css';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

export default function Payment() {
    // const BasicURL='https://demo.c-78984ef.kyma.ondemand.com'

    const BasicURL = 'https://demooo.c-78984ef.kyma.ondemand.com'
    const [Payment, setPayment] = useState([]);
    const [addMsg, setAddMsg] = useState('');
    const [updateMsg, setUpdateMsg] = useState('');
    const [deleteMsg, setDeleteMsg] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    // const [searchField, setSearchField] = useState('PaymentDescription');

    //   const [isLoading, setIsLoading] = useState(false);
    //   const [error, setError] = useState(null);

    const token = localStorage.getItem('token')

    let [newPayment, setNewPayment] = useState({
        paymentPlanCode: '',
        paymenPlanDescription: '',
        conditionGroup: '',
        assignedPricePlan: '',
        noOfYears: Number, // shouldn't be negative values
        validFrom: Date,
        validTo: Date,
        maintenanceNumberOfMonth: Number,
        installmentCalculationMethod: '',
        Phase: '',
        planStatus: '',
        approvalStatus: '',
        assignedProjectsTab: '',
        paymentPlanDetails: '',
        conditionType: '',
        conditionPercentage: '',
        conditionBasePrice: Number,
        calculationMethod: '',
        frequency: '',
        dueOnInMonth: '',
        noOfInstallments: Number

    });


    function getFormValue(e) {
        let myPayment = { ...newPayment }
        myPayment[e.target.name] = e.target.value
        setNewPayment(myPayment);// update Payment data
        console.log(myPayment)
    }
    // call add API 
    async function submitFormData(e) {
        e.preventDefault();

        const options = {
            method: 'POST',
            url: `${BasicURL}/paymentplans`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                paymentPlanCode: newPayment.paymentPlanCode,
                paymentPlanDescription: newPayment.paymentPlanDescription,
                conditionGroup: newPayment.conditionGroup,
                assignedPricePlan: newPayment.assignedPricePlan,
                noOfYears: Number(newPayment.noOfYears),
                validFrom: newPayment.validFrom,
                validTo: newPayment.validTo,
                maintenanceNumberOfMonth: Number(newPayment.maintenanceNumberOfMonth),
                installmentCalculationMethod: newPayment.installmentCalculationMethod,
                Phase: newPayment.Phase,
                planStatus: newPayment.planStatus,
                approvalStatus: newPayment.approvalStatus,
                assignedProjectsTab: newPayment.assignedProjectsTab,
                paymentPlanDetails: newPayment.paymentPlanDetails,
                conditionType: newPayment.conditionType,
                conditionPercentage: newPayment.conditionPercentage,
                conditionBasePrice: Number(newPayment.conditionBasePrice),
                calculationMethod: newPayment.calculationMethod,
                frequency: newPayment.frequency,
                dueOnInMonth: newPayment.dueOnInMonth,
                noOfInstallments: Number(newPayment.noOfInstallments)
            }
        };

        const response = await axios(options);
        console.log(response);
        if (response.status == 200) {
            console.log("200")
            setAddMsg("Your Payment have been added successfully")
            getPayment()
        }
    }
    // to handle modal for add
    const [addShow, setaddShow] = useState(false);
    const handleAddClose = () => setaddShow(false);
    const handleAddShow = () => setaddShow(true);

    // handle modal for edit
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setSelectedPayment(null);
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const handleEdit = (Payment) => {
        setSelectedPayment(Payment);
        handleShow();
    };
    // call get API
    async function getPayment() {
        // worked mock api
        // let { data } = await axios.get("https://bcbf775e-2518-44b8-a2eb-3ff6c0f1b2b1.mock.pstmn.io/Payment");

        // demo authentication with new fields
        let { data } = await axios.get(`${BasicURL}/paymentplans`, { headers: { "Authorization": `Bearer ${token}` } });
        console.log(data);
        console.log("Payment");
        setPayment(data);
        console.log(Payment);
    }

    // call update API
    const handleUpdate = async (updatedPayment) => {
        try {
            const options = {
                method: 'PUT',
                url: `${BasicURL}/paymentplans/${updatedPayment.payment_code}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: {
                    payment_code:updatedPayment.payment_code,
                    paymentPlanCode: updatedPayment.paymentPlanCode,
                    paymentPlanDescription: updatedPayment.paymentPlanDescription,
                    conditionGroup: updatedPayment.conditionGroup,
                    assignedPricePlan: updatedPayment.assignedPricePlan,
                    noOfYears: Number(updatedPayment.noOfYears),
                    validFrom: updatedPayment.validFrom,
                    validTo: updatedPayment.validTo,
                    maintenanceNumberOfMonth: Number(updatedPayment.maintenanceNumberOfMonth),
                    installmentCalculationMethod: updatedPayment.installmentCalculationMethod,
                    Phase: updatedPayment.Phase,
                    planStatus: updatedPayment.planStatus,
                    approvalStatus: updatedPayment.approvalStatus,
                    assignedProjectsTab: updatedPayment.assignedProjectsTab,
                    paymentPlanDetails: updatedPayment.paymentPlanDetails,
                    conditionType: updatedPayment.conditionType,
                    conditionPercentage: updatedPayment.conditionPercentage,
                    conditionBasePrice: Number(updatedPayment.conditionBasePrice),
                    calculationMethod: updatedPayment.calculationMethod,
                    frequency: updatedPayment.frequency,
                    dueOnInMonth: updatedPayment.dueOnInMonth,
                    noOfInstallments: Number(updatedPayment.noOfInstallments)
                }
            };
           console.log("inside call apiii");
            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setUpdateMsg('Your Payment has been updated successfully');
                getPayment();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // call delete API
    const handleDelete = async (paymentPlanCode) => {
        try {
            const options = {
                method: 'DELETE',
                url: `${BasicURL}/paymentplans/${paymentPlanCode}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios(options);
            console.log(response);

            if (response.status === 200) {
                console.log('200');
                setDeleteMsg('Your Payment has been Deleted successfully');
                getPayment();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     getPayment();
    // }, []);

    // call search API
    async function searchPayments(keyword) {
        try {
            const response = await axios.get(`${BasicURL}/paymentplans/search?keyword=${keyword}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(response)
            setPayment(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (searchTerm) {
            searchPayments(searchTerm);
        } else {
            getPayment();
        }
    }, [searchTerm]);

    // Render the Payment list
    const renderPayments = Payment.length > 0 ? (
        Payment.map((Payment) => (
            <tr key={Payment.payment_code}>
                <td>{Payment.paymentPlanCode}</td>
                <td>{Payment.paymentPlanDescription}</td>
                <td>{Payment.conditionGroup}</td>
                <td>{Payment.assignedPricePlan}</td>
                <td>{Payment.noOfYears}</td>
                <td>{Payment.validFrom}</td>
                <td>{Payment.validTo}</td>
                <td>{Payment.maintenanceNumberOfMonth}</td>
                <td>{Payment.installmentCalculationMethod}</td>
                <td>{Payment.Phase}</td>
                <td>{Payment.planStatus}</td>
                <td>{Payment.approvalStatus}</td>
                <td>{Payment.assignedProjectsTab}</td>
                <td>{Payment.paymentPlanDetails}</td>
                <td>{Payment.conditionType}</td>
                <td>{Payment.conditionPercentage}</td>
                <td>{Payment.conditionBasePrice}</td>
                <td>{Payment.calculationMethod}</td>
                <td>{Payment.frequency}</td>
                <td>{Payment.dueOnInMonth}</td>
                <td>{Payment.noOfInstallments}</td>
                <td>

                    <button className={style.iconButton} onClick={() => handleDelete(Payment.payment_code)} title="Delete">
                        <RiDeleteBinLine style={{ color: 'red' }} />
                    </button>

                    <button className={style.iconButton} onClick={() => handleEdit(Payment)} title="Edit">
                        <RiEditLine style={{ color: '#10ab80' }} />
                    </button>

                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="22">No results match the search term.</td>
        </tr>
    );

    // to prevent from Negative Values:
    const preventpastenegative = (e) => {
        const clipboarddata = e.clipboarddata || window.clipboarddata;
        const pasteddata = parseFloat(clipboarddata.getdata('text'));

        if (pasteddata < 0) {
            e.preventdefault();
        }
    };

    const preventminus = (e) => {
        if (e.code === 'minus') {
            e.preventdefault();
        }
    };

    return (
        <>
            <div className={`container`}>
                <div className={`row align-items-center`}>

                    {/* Search Bar */}
                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <input
                            className={`${style.searchInput}`}
                            type="search"
                            placeholder="Search for a payment "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className={`col-sm-12 col-md-4 mt-5 mb-4 text-gred ${style.maincolor}`}><h2><b>Payment Details</b></h2></div>

                    <div className="col-sm-12 col-md-4 mt-5 mb-4 text-gred">
                        <button className={`w-100 ${style.imageButton}`} variant="primary" onClick={handleAddShow}>
                            Add New Payment
                        </button>
                    </div>
                </div>

                {deleteMsg ? <div className="alert alert-danger m-3 p-2">{deleteMsg}</div> : ''}

                <div className={`row`}>
                    <div className='table-responsive m-auto'>
                        <table className={`table table-striped table-hover table-head text-center`}>

                            <thead>
                                <tr>
                                    <th>PaymentPlanCode</th>
                                    <th>PaymentPlanDescription</th>
                                    <th>ConditionGroup</th>
                                    <th>AssignedPricePlan</th>
                                    <th>NoOfYears</th>
                                    <th>Valid From</th>
                                    <th>Valid To</th>
                                    <th>MaintenanceNumberOfMonth</th>
                                    <th>InstallmentCalculationMethod</th>
                                    <th>Phase</th>
                                    <th>PlanStatus</th>
                                    <th>ApprovalStatus</th>
                                    <th>AssignedProjectsTab</th>
                                    <th>PaymentPlanDetails</th>
                                    <th>ConditionType</th>
                                    <th>ConditionPercentage</th>
                                    <th>ConditionBasePrice</th>
                                    <th>CalculationMethod</th>
                                    <th>Frequency</th>
                                    <th>DueOnInMonth</th>
                                    <th>NoOfInstallments</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderPayments}



                            </tbody>
                        </table>



                        {/* Render the edit modal */}
                        {selectedPayment && (
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Payment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                        <input
                                            type="text"
                                            required
                                            maxLength={8}
                                            name="paymentPlanCode"
                                            className="form-control m-3"
                                            value={selectedPayment.paymentPlanCode}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    paymentPlanCode: e.target.value,
                                                })
                                            }
                                            placeholder="Enter paymentPlanCode"
                                        />
                                        <input
                                            type="text"
                                            required
                                            name="paymentPlanDescription"
                                            className="form-control m-3"
                                            value={selectedPayment.paymentPlanDescription}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    paymentPlanDescription: e.target.value,
                                                })
                                            }
                                            placeholder="Enter paymentPlanDescription"
                                        />
                                        <input
                                            type="text"
                                            name="conditionGroup"
                                            className="form-control m-3"
                                            value={selectedPayment.conditionGroup}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    conditionGroup: e.target.value,
                                                })
                                            }
                                            placeholder="Enter conditionGroup"
                                        />
                                        <input
                                            type="text"
                                            name="assignedPricePlan"
                                            className="form-control m-3"
                                            value={selectedPayment.assignedPricePlan}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    assignedPricePlan: e.target.value,
                                                })
                                            }
                                            placeholder="Enter assignedPricePlan"
                                        />
                                        <input
                                            type="number"
                                            name="noOfYears"
                                            min="0"
                                            // onpaste={preventpastenegative}
                                            // onkeypress={preventminus}
                                            // oninput="validity.valid||(value='');"
                                            className="form-control m-3"
                                            value={selectedPayment.noOfYears}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    noOfYears: e.target.value,
                                                })
                                            }
                                            placeholder="Enter noOfYears"
                                        />

                                        <label htmlFor="exampleInputDate1" className={`${style.datelable}`} >ValidFrom  Date : </label>
                                        <input
                                            type="date"
                                            name="validFrom"
                                            className="form-control m-3"
                                            value={selectedPayment.validFrom}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    validFrom: e.target.value,
                                                })
                                            }
                                            placeholder="Enter validFrom"
                                        />

                                        <label htmlFor="exampleInputDate1" className={`${style.datelable}`} >ValidTo  Date : </label>
                                        <input
                                            type="date"
                                            name="valiTo"
                                            className="form-control m-3"
                                            value={selectedPayment.validTo}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    validTo: e.target.value,
                                                })
                                            }
                                            placeholder="Enter validTo"
                                        />
                                        <input
                                            type="number"
                                            name="maintenanceNumberOfMonth"
                                            className="form-control m-3"
                                            value={selectedPayment.maintenanceNumberOfMonth}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    maintenanceNumberOfMonth: e.target.value,
                                                })
                                            }
                                            placeholder="Enter maintenanceNumberOfMonth"
                                        />
                                        <input
                                            type="text"
                                            name="installmentCalculationMethod"
                                            className="form-control m-3"
                                            value={selectedPayment.installmentCalculationMethod}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    installmentCalculationMethod: e.target.value,
                                                })
                                            }
                                            placeholder="Enter installmentCalculationMethod"
                                        />

                                        <input
                                            type="text"
                                            name="Phase"
                                            className="form-control m-3"
                                            value={selectedPayment.Phase}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    Phase: e.target.value,
                                                })
                                            }
                                            placeholder="Enter Phase"
                                        />
                                        <input
                                            type="text"
                                            required
                                            name="planStatus"
                                            className="form-control m-3"
                                            value={selectedPayment.planStatus}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    planStatus: e.target.value,
                                                })
                                            }
                                            placeholder="Enter planStatus"
                                        />
                                        <input
                                            type="text"
                                            name="approvalStatus"
                                            className="form-control m-3"
                                            value={selectedPayment.approvalStatus}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    approvalStatus: e.target.value,
                                                })
                                            }
                                            placeholder="Enter approvalStatus"
                                        />
                                        <input
                                            type="text"
                                            name="assignedProjectsTab"
                                            className="form-control m-3"
                                            value={selectedPayment.assignedProjectsTab}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    assignedProjectsTab: e.target.value,
                                                })
                                            }
                                            placeholder="Enter assignedProjectsTab"
                                        />
                                        <input
                                            type="text"
                                            name="paymentPlanDetails"
                                            className="form-control m-3"
                                            value={selectedPayment.paymentPlanDetails}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    paymentPlanDetails: e.target.value,
                                                })
                                            }
                                            placeholder="Enter paymentPlanDetails"
                                        />
                                        <input
                                            type="text"
                                            name="conditionType"
                                            className="form-control m-3"
                                            value={selectedPayment.conditionType}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    conditionType: e.target.value,
                                                })
                                            }
                                            placeholder="Enter conditionType"
                                        />
                                        <input
                                            type="text"
                                            name="conditionPercentage"
                                            className="form-control m-3"
                                            value={selectedPayment.conditionPercentage}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    conditionPercentage: e.target.value,
                                                })
                                            }
                                            placeholder="Enter conditionPercentage"
                                        />
                                        <input
                                            type="number"
                                            name="conditionBasePrice"
                                            className="form-control m-3"
                                            value={selectedPayment.conditionBasePrice}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    conditionBasePrice: e.target.value,
                                                })
                                            }
                                            placeholder="Enter conditionBasePrice"
                                        />
                                        <input
                                            type="text"
                                            name="calculationMethod"
                                            className="form-control m-3"
                                            value={selectedPayment.calculationMethod}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    calculationMethod: e.target.value,
                                                })
                                            }
                                            placeholder="Enter calculationMethod"
                                        />

                                        <input
                                            type="text"
                                            name="frequency"
                                            className="form-control m-3"
                                            value={selectedPayment.frequency}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    frequency: e.target.value,
                                                })
                                            }
                                            placeholder="Enter frequency"
                                        />
                                        <input
                                            type="text"
                                            name="dueOnInMonth"
                                            className="form-control m-3"
                                            value={selectedPayment.dueOnInMonth}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    dueOnInMonth: e.target.value,
                                                })
                                            }
                                            placeholder="Enter dueOnInMonth"
                                        />
                                        <input
                                            type="number"
                                            name="noOfInstallments"
                                            className="form-control m-3"
                                            value={selectedPayment.noOfInstallments}
                                            onChange={(e) =>
                                                setSelectedPayment({
                                                    ...selectedPayment,
                                                    noOfInstallments: e.target.value,
                                                })
                                            }
                                            placeholder="Enter noOfInstallments"
                                        />
                                    </form>

                                    {updateMsg ? <div className="alert alert-danger m-3 p-2">{updateMsg}</div> : ''}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className={`${style.imageButton}`} onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button className={`${style.imageButton}`} onClick={() => handleUpdate(selectedPayment)}>
                                        Update
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        )}



                        {/* <!--- Render the add Model---> */}
                        <div className="model_box" style={{ width: 100 }}>
                            <Modal
                                show={addShow}
                                onHide={handleAddClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Payment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={submitFormData}>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Payment PLan Code: </label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={8}
                                                name="paymentPlanCode"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="TextHelp"
                                                placeholder="Enter PaymentPlanCode"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Payment PLan Description: </label>
                                            <input
                                                type="text"
                                                required
                                                name="paymentPlanDescription"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter PaymentPlanDescription"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Condition Group: </label>
                                            <input
                                                type="text"
                                                name="conditionGroup"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter ConditionGroup"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} > Price Plan: </label>
                                            <input
                                                type="text"
                                                name="assignedPricePlan"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter assignedPricePlan"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Number of Years: </label>
                                            <input
                                                type="number"
                                                name="noOfYears"
                                                min="0"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter noOfYears"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputDate1" className={`${style.lable}`} >ValidFrom  Date : </label>
                                            <input
                                                type="date"
                                                name="validFrom"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputDate1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter validFrom"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputDate1" className={`${style.lable}`} >ValidTo  Date : </label>
                                            <input
                                                type="date"
                                                name="validTo"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter validTo"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Maintenance Number Of Month: </label>
                                            <input
                                                type="number"
                                                name="maintenanceNumberOfMonth"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputNumber1"
                                                aria-describedby="numberHelp"
                                                placeholder="Enter maintenanceNumberOfMonth"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>


                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Installment Calculation Method: </label>
                                            <input
                                                type="text"
                                                name="installmentCalculationMethod"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter installmentCalculationMethod"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Phase: </label>
                                            <input
                                                type="text"
                                                name="Phase"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter Phase"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Plan Status: </label>
                                            <input
                                                type="text"
                                                required
                                                name="planStatus"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter planStatus"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Approval Status: </label>
                                            <input
                                                type="text"
                                                name="approvalStatus"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter approvalStatus"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Projects Tab: </label>
                                            <input
                                                type="text"
                                                name="assignedProjectsTab"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter assignedProjectsTab"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Paayment Plan Details: </label>
                                            <input
                                                type="text"
                                                name="paymentPlanDetails"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter paymentPlanDetails"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Condition Type: </label>
                                            <input
                                                type="text"
                                                name="conditionType"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter conditionType"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>
                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Condition Percentage: </label>
                                            <input
                                                type="text"
                                                name="conditionPercentage"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter conditionPercentage"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>
                                            <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Condition Base Price: </label>
                                            <input
                                                type="number"
                                                name="conditionBasePrice"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputNumber1"
                                                aria-describedby="numberHelp"
                                                placeholder="Enter conditionBasePrice"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Calculation Method: </label>
                                            <input
                                                type="text"
                                                name="calculationMethod"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter calculationMethod"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >Frequency: </label>
                                            <input
                                                type="text"
                                                name="frequency"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter frequency"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputText1" className={`${style.lable}`} >DueOn In Month: </label>
                                            <input
                                                type="text"
                                                name="dueOnInMonth"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter dueOnInMonth"
                                            />
                                        </div>
                                        <div className={`form-group  ${style.formGroup}`}>

                                            <label htmlFor="exampleInputNumber1" className={`${style.lable}`} >Number Of Installments: </label>
                                            <input
                                                type="number"
                                                name="noOfInstallments"
                                                className="form-control"
                                                onChange={getFormValue}
                                                id="exampleInputText1"
                                                aria-describedby="textHelp"
                                                placeholder="Enter noOfInstallments"
                                            />
                                        </div>

                                        <button type="submit" className={` w-100 ${style.imageButton}`}>Add Payment</button>
                                    </form>

                                    {addMsg ? <div className="alert alert-danger m-3 p-2">{addMsg}</div> : ''}
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleAddClose}>
                                        Close
                                    </Button>

                                </Modal.Footer>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
