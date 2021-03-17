interface IFetchParameters {
    url: string;
    method: 'get' | 'post';
    body?: {};
}

interface IFetchReturn {
    titles: string[];
    links: string[];
    descriptions: string[];
    images: string[];
}

export type { IFetchParameters, IFetchReturn };