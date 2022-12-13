export type coordinates = {
    longitude: number,
    latitude: number
};

export type State = {
    isLoading?: boolean,
    error?: string,
    coordinates?: coordinates
}

export type Action =
 | { type: 'request' }
 | { type: 'success', coordinates: coordinates }
 | { type: 'failure', error: string };