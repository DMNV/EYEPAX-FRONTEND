import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap'
import '../loanCal.css'

function LoanCalculator() {
    const [monthPaymentData, setMonthPaymentData] = useState('');
    const [loanAmountData, setLoanAmountData] = useState('');
    const [interestRateData, setInterestRateData] = useState('');
    const [noPaymentsData, setNoPaymentsData] = useState('');


    return (
        <div className='CalLayout'>
            <h1 style={{ padding: '0 10px 30px 0' }}>Loan Calculator</h1>
            <Form>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel> Calculation Type</FormLabel>
                    </Col>
                    <Col xs={8}>
                        <FormSelect aria-label="Default select example">
                            <option>Please select calculation type</option>
                            <option value="EQUALMONTHLYINSTALLMENT">Equal Monthly Installment (EMI)</option>
                        </FormSelect>
                    </Col>
                </Row>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel> Loan Amount (Principle)</FormLabel>
                    </Col>
                    <Col xs={8}>
                        <Form.Control type="text" value={loanAmountData} />
                    </Col>
                </Row>
                <Row>
                    <Col className='line-padding'>
                        <FormLabel>Interest Rate</FormLabel>
                    </Col>
                    <Col xs={8}>
                        <Form.Control type="text" value={interestRateData} />
                    </Col>
                </Row>
                <FormGroup>
                    <Row>
                        <Col className='line-padding'>
                            <FormLabel>No of Payments</FormLabel>
                        </Col>
                        <Col xs={8}>
                            <Form.Control type="text" value={noPaymentsData} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={8}></Col>
                        <Col xs={2} >
                            <Button variant="primary">Calculate</Button>{' '}
                        </Col>
                        <Col xs={2}>
                            <Button variant="secondary">Clear</Button>{' '}
                        </Col>
                    </Row>
                </FormGroup>
                <hr />
                <FormLabel>Month Payment {monthPaymentData == 0 ? '= $ 0.00' : '= $ ' + monthPaymentData.toFixed(2)}</FormLabel>
            </Form>
        </div>
    )
}

export default LoanCalculator
