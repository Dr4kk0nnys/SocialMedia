import { IFetchParameters } from "interfaces/Fetch";

const doFetch = async({ url, method, body }: IFetchParameters): Promise<any[]> => {
    const rawResponse = await fetch('http://localhost:8000/' + url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return await rawResponse.json();
}

export { doFetch };