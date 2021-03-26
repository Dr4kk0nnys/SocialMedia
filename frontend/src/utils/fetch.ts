import { IFetchParameters, IFetchReturn } from "interfaces/Fetch";

const doFetch = async({ url, method, body }: IFetchParameters): Promise<IFetchReturn> => {
    const rawResponse = await fetch('http://webrcenter.com/api/' + url, {
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