import useSunData from '../customHooks/useSunData'
import styled from "styled-components"
import get from 'lodash/get'
import { InfoPanelProps } from '../interfaces/components/InfoPanel.interface';

const Info = styled.div`  
    margin-top: 50px;
`;

export const InfoPanel = ({coordinates: {latitude, longitude}}: InfoPanelProps) => {
    const sunData = useSunData({longitude, latitude});
    const sunrise = get(sunData, 'results.sunrise', '');
    const sunset = get(sunData, 'results.sunset', '');

    return (
        <Info>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Sun Set: {sunset}</p>
            <p>Sun raise: {sunrise}</p>
        </Info>
    )
}