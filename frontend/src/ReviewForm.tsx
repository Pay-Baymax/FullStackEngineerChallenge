import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./AppProvider";
import {
    FormControl,
    Label,
    RoundNavIcon,
    Select
} from "./styledComponents";
import { ValidatedInputs, } from "./ValidatedInputs";
import { ReactComponent as CloseIcon } from "./assets/times-solid.svg";
import SpinnerButton from "./SpinnerButton";
import { GET_EMPLOYEES } from './queries'

const gql = require("graphql-tag");

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
      margin: 0 2em 0 0;
  }
`;
export const ReviewFormContainer: any = styled.form``;
const ADD_REVIEW = gql`
    mutation addReview($review: ReviewData) {
        addReview(review: $review) {
            id
            score
            employee {
                id
                email
            }
            createdAt
        }
    }
`;

const ReviewForm = props => {
    const { state, dispatch } = useContext(AppContext);
    const clientRef = useRef<HTMLDivElement>(null);
    // const selectRef = useRef(null)
    const { loading, error, data, refetch, } = useQuery(GET_EMPLOYEES, {
        // onCompleted(res) {
        //     console.log('completete', res);
        // }
    })
    const [addReview] = useMutation(ADD_REVIEW, {
        onCompleted(response) {
            dispatch({
                type: "TOGGLE_MODAL",
                data: {},
            });
            dispatch({ type: "TOGGLE_TOAST", data: { open: true, type: `success`, message: `Added ${response.addReview.email} review` } });
            props.refetchReviews()
        }, onError(e) {
            dispatch({
                type: "TOGGLE_TOAST",
                data: {
                    open: true,
                    type: "danger",
                    message: JSON.stringify(e),
                },
            });
        }
    });
    const submitForm = e => {
        e.stopPropagation();
        e.preventDefault();
        state.reviewForm['score'] = Number(state.reviewForm['score'])
        addReview({ variables: { review: { ...state.reviewForm, id: props.updatereview } } });
    };
    return (
        <>
            <section>
                <ReviewFormContainer onSubmit={submitForm}>
                    <FormHeader>
                        <h2>{props.updatereview ? `Update` : `New`} Review</h2>
                        <RoundNavIcon
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch({
                                    type: "TOGGLE_MODAL",
                                    data: {},
                                })
                            }}
                        >
                            <CloseIcon />
                        </RoundNavIcon>
                    </FormHeader>
                    <FormControl>
                        <ValidatedInputs
                            form_to_set="reviewForm"
                            name="score"
                            validates="score"
                            ref={clientRef}
                            id="score"
                            type="number"
                            value={state.reviewForm.score}
                            required
                        />
                        <Label htmlFor="score">score</Label>
                    </FormControl>
                    {!!data
                        && !!data.employees
                        && data.employees.length > 0
                        && (
                            <FormControl>
                                <Label htmlFor="role">Review role</Label>
                                <Select
                                    id="employee"
                                    name="employee"
                                    required
                                    value={state.reviewForm.employee}
                                    onChange={e => {
                                        dispatch({
                                            type: 'SET_FORM',
                                            data: { form_to_set: 'reviewForm', field: "employee", value: e.target.value }
                                        })
                                    }}>
                                    <option disabled value="">Select employee</option>
                                    {data.employees.map(employee => (
                                        <option
                                            key={employee.id}
                                            value={employee.id}>
                                            {employee.email}
                                        </option>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        )}
                    <SpinnerButton>
                        Submit
                    </SpinnerButton>
                </ReviewFormContainer>
            </section>
        </>
    );
}
export default ReviewForm;
