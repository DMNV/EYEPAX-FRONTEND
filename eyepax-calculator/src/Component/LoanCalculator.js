import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Form, FormLabel, FormSelect, Row } from 'react-bootstrap'
import '../loanCal.css'

function LoanCalculator() {
    const [calculationTypeData, setCalculationTypeData] = useState([]);
    const [monthPaymentData, setMonthPaymentData] = useState('');
    const [loanAmountData, setLoanAmountData] = useState(10.00);
    const [interestRateData, setInterestRateData] = useState(10.00);
    const [noPaymentsData, setNoPaymentsData] = useState(10);
    const [isSending, setIsSending] = useState(false);
    useEffect(() => {
        axios.get(`https://localhost:44357/Calculation`)
            .then(res => {
                const data = res.data;
                setCalculationTypeData(data);
            })
    }, [])


    const handleSubmit = () => {
        // don't send again while we are sending
        if (isSending)
            return

        setIsSending(true)
        alert("handleSubmit");
        setIsSending(false)
    };

    const handleLoanAmount = (e) => {
        setLoanAmountData(e.target.value);
    }

    const handleInterestRate = (e) => {
        setInterestRateData(e.target.value);
    }

    const handleNoPayments = (e) => {
        setNoPaymentsData(e.target.value);
    }

    const clearAll = () => {
        setMonthPaymentData('')
        setLoanAmountData('')
        setInterestRateData('')
        setNoPaymentsData('')
    }

    return (
        <div className='CalLayout'>
            <h1 style={{ padding: '0 10px 30px 0' }}>Loan Calculator</h1>
            <form>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel> Calculation Type</FormLabel>
                    </Col>
                    <Col xs={8}>
                        <FormSelect aria-label="Default select example">
                            <option>Please select calculation type</option>
                            {calculationTypeData.map((opt) => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel> Loan Amount (Principle)</FormLabel>
                    </Col>
                    <Col xs={8}>
                        <Form.Control type="text" value={loanAmountData} onChange={(e) => handleLoanAmount(e)} />
                    </Col>
                </Row>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel>Interest Rate</FormLabel>
                    </Col>
                    <Col xs={8}>
                        <Form.Control type="text" value={interestRateData} onChange={(e) => handleInterestRate(e)} />
                    </Col>
                </Row>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel>No of Payments</FormLabel>
                    </Col>
                    <Col xs={8}>
                        <Form.Control type="text" value={noPaymentsData} onChange={(e) => handleNoPayments(e)} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}></Col>
                    <Col xs={2} >
                        <button className='btn btn-primary' onClick={() => handleSubmit}>Calculate </button>
                    </Col>
                    <Col xs={2}>
                        <button className='btn btn-secondary' onClick={() => clearAll}>Clear</button>
                    </Col>
                </Row>
                <hr />
                <FormLabel>Month Payment {monthPaymentData == 0 ? '= $ 0.00' : '= $ ' + monthPaymentData.toFixed(2)}</FormLabel>
            </form>
        </div>
    )
}

export default LoanCalculator
