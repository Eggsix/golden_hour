import React from 'react'
export default interface SplitScreenProps {
    leftWeight: number,
    rightWeight: number,
    children?: React.ReactElement | React.ReactElement[]
}