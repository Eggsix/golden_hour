import React, { useRef, useReducer, MutableRefObject } from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import Form  from 'react-bootstrap/Form'
import ipRegex from 'ip-regex'
import { locationReducer,  initialState } from '../reducers/locationReducer'
import { InfoPanel } from './InfoPanel'
import get from 'lodash/get'

/*
   In a full redux implementation I would normally process most of the formData processing in an actions folder.
*/

const LeftPane = styled.div`  
    border: 1px solid #0b7c9c;
    height: 100vh;
    background-color: #0b7c9c;
    padding: 8px;
    color: white;
`;

const LeftPanel = ({setCoordinates}: any) => {
    const [state, dispatch] = useReducer(locationReducer, initialState);
    const { error } = state;
    const {coordinates: {longitude = 0, latitude = 0}}: any = state;
    const form = useRef() as MutableRefObject<HTMLFormElement>;

    async function formData (event: React.FormEvent) {
        event.preventDefault();
        const IPAddress = form.current.IPAddress.value
        if(!ipRegex().test(IPAddress)) {
            dispatch({type: 'failure', error: 'Invalid IP Address'});
            return;
        }

        try {
            const apiKey = import.meta.env.VITE_IP_API_KEY;
            dispatch({ type: 'request' });
            const response = await (await fetch(`https://api.ipbase.com/v2/info?ip=${IPAddress}&apikey=${apiKey}&language=en`)).json();
            const latitude = get(response, 'data.location.latitude', 0);
            const longitude = get(response, 'data.location.longitude', 0);
            const error = get(response, 'errors.ip[0]', false);
            setCoordinates({latitude, longitude});
            error ? dispatch({type: 'failure', error}) : dispatch({type: 'success', coordinates: {longitude, latitude}});
            form.current.IPAddress.value = '';
        } catch (error) {
            throw(error)
        }
    }

    return (
        <>
            <LeftPane>
                <Form ref={form} onSubmit={formData}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='IPAddress'>IP Address:</Form.Label>
                        <Form.Control id="IPAddress" name="IPAddress" placeholder="Enter IP Address" type="text" required />
                        <Form.Text className="text-danger"> {error?.length ? error : null} </Form.Text> 
                    </ Form.Group>
                    <Button variant="primary"  type="submit">Submit</Button>
                </Form>
                <InfoPanel coordinates={{longitude, latitude}}/>
            </LeftPane>
        </>
    )
}

export default LeftPanel