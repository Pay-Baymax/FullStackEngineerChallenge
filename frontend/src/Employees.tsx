import React, { useContext, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    Table,
    Modal,
    Button,
} from './styledComponents';
import { IWelcomWrap } from './types';
import withAuth from './withAuth';
import moment from 'moment';
import { AppContext } from './AppProvider';
import EmployeeForm from './EmployeeForm';
import SpinnerButton from './SpinnerButton';
import { GET_EMPLOYEES, DESTROY_EMPLOYEE } from './queries'

const EmployeeList: React.FC<IWelcomWrap> = (props: IWelcomWrap) => {
    const { state, dispatch } = useContext(AppContext);
    const inputRef = useRef<HTMLDivElement>(null);
    const [updateemployee, setupdateemployee] = useState("")
    const { loading, error, data, refetch, } = useQuery(GET_EMPLOYEES, {
        // onCompleted(res) {
        //     console.log('completete', res);
        // }
    })
    const [destroyEmployee, { loading: mutationLoading }] = useMutation(DESTROY_EMPLOYEE, {
        onCompleted(result) {
            dispatch({ type: "TOGGLE_TOAST", data: { open: true, type: `success`, message: `Employee ${result.destroyEmployee} destroyed` } });
            // console.log('complete', result);
            refetch();
        },
        onError(e) {
            console.log('error', e);
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <>
            <Modal isopen={state.modal.open}>
                <EmployeeForm
                    updateemployee={updateemployee}
                    setupdateemployee={setupdateemployee}
                    refetchEmployees={refetch}
                    {...{ inputRef }}
                />
            </Modal>
            <div className="d-flex justify-content-between">
                <h2>{`Employees`}</h2>
                <Button
                    onClick={(e) => {
                        inputRef.current && inputRef.current.focus();
                        setupdateemployee("")
                        dispatch({
                            type: 'TOGGLE_MODAL',
                            data: { open: true }
                        })
                        dispatch({
                            type: 'UPDATE_FORM',
                            data: { form_to_set: 'employeeForm', form_value: { email: "", name: "", role: "" } }
                        })
                    }}>New employee</Button>
            </div>


            {!!data
                && !!data.employees
                && data.employees.length > 0
                && (
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>CreatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.employees.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.id}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.role}</td>
                                    <td><pre>{moment(Number(employee.createdAt)).format("YYYY-MM-DD - hh:mm:ss")}</pre></td>
                                    <td
                                        className="d-flex"
                                    >
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setupdateemployee(employee.id)
                                                dispatch({
                                                    type: 'TOGGLE_MODAL',
                                                    data: { open: true }
                                                })
                                                dispatch({
                                                    type: 'UPDATE_FORM',
                                                    data: { form_to_set: 'employeeForm', form_value: { email: employee.email, name: employee.name, role: employee.role } }
                                                })
                                            }}>
                                            Edit
                                        </Button>
                                        <SpinnerButton
                                            spinning={mutationLoading}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                destroyEmployee({
                                                    variables: {
                                                        id: employee.id
                                                    }
                                                });
                                            }}
                                        >
                                            Delete
                                        </SpinnerButton>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    );
};
export default withAuth(EmployeeList, true);