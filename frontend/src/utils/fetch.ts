import { IFetchParameters, IFetchReturn } from "interfaces/Fetch";

const doFetch = async({ url, method, body }: IFetchParameters): Promise<IFetchReturn> => {
    const rawResponse = await fetch('45.15.25.114:8000/' + url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    console.log('Raw response: ', rawResponse);
    return await rawResponse.json();
}

export { doFetch };