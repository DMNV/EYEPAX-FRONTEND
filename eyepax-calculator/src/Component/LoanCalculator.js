import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Form, FormLabel, FormSelect, Row } from 'react-bootstrap'
import '../loanCal.css'

function LoanCalculator() {
    const [calculationTypeData, setCalculationTypeData] = useState([]);
    const [selected, setSelected] = useState(0);
    const [monthPaymentData, setMonthPaymentData] = useState(0);
    const [loanAmountData, setLoanAmountData] = useState('');
    const [interestRateData, setInterestRateData] = useState('');
    const [noPaymentsData, setNoPaymentsData] = useState('');
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        axios.get(`https://localhost:44357/Calculation`)
            .then(res => {
                const data = res.data;
                setCalculationTypeData(data);
            })
    }, [])

    const handleLoanAmount = (e) => {
        if (numberValidation(e.target.value))
            setLoanAmountData(e.target.value);
    }

    const handleInterestRate = (e) => {
        if (numberValidation(e.target.value))
            setInterestRateData(e.target.value);
    }

    const handleNoPayments = (e) => {
        if (numberValidation(e.target.value))
            setNoPaymentsData(e.target.value);
    }

    const numberValidation = (value) => {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value))
            return true;
    }

    const validation = () => {
        let state = true;
        console.log(selected, loanAmountData, interestRateData, noPaymentsData);
        if (selected === 0 || loanAmountData === '' || interestRateData === '' || noPaymentsData === '')
            state = false;

        return state;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // don't send again while we are sending
        let val = validation();
        if (!isSending && val) {
            setIsSending(true)
            await axios.post(`https://localhost:44357/Calculation`, {
                calculationType: selected,
                loanAmount: parseFloat(loanAmountData),
                rate: parseFloat(interestRateData),
                noPayments: parseInt(noPaymentsData)
            }).then((response) => {
                if (response.status === 200) {
                    setMonthPaymentData(response.data);

                }
            }).catch((error) => {
                console.log(error.response.data.error);
            })
            setIsSending(false)
        }
    };

    const clearAll = (e) => {
        e.preventDefault();
        setMonthPaymentData(0)
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
                        <FormLabel>Calculation Type<span className='error'>*</span></FormLabel>
                    </Col>
                    <Col xs={8}>
                        <FormSelect aria-label="Default select example"
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}>
                            <option>Please select calculation type</option>
                            {calculationTypeData.map((opt) => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel>Loan Amount (Principle)<span className='error'>*</span></FormLabel>
                    </Col>
                    <Col xs={8}>
                        <Form.Control type="text" value={loanAmountData} onChange={(e) => handleLoanAmount(e)} required />
                    </Col>
                </Row>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel>Interest Rate<span className='error'>*</span></FormLabel>
                    </Col>
                    <Col xs={8}>
                        <Form.Control type="text" value={interestRateData} onChange={(e) => handleInterestRate(e)} required />
                    </Col>
                </Row>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel>No of Payments<span className='error'>*</span></FormLabel>
                    </Col>
                    <Col xs={8}>
                        <Form.Control type="text" value={noPaymentsData} onChange={(e) => handleNoPayments(e)} required />
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}></Col>
                    <Col xs={2} >
                        <button className='btn btn-primary' onClick={(e) => handleSubmit(e)}>Calculate </button>
                    </Col>
                    <Col xs={2}>
                        <button className='btn btn-secondary' onClick={(e) => clearAll(e)}>Clear</button>
                    </Col>
                </Row>
                <hr />
                <FormLabel>Month Payment {monthPaymentData === 0 ? '= $ 0.00' : '= $ ' + monthPaymentData.toFixed(2)}</FormLabel>
            </form>
        </div>
    )
}

export default LoanCalculator
