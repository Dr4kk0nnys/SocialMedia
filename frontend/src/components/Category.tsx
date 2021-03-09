import React, { useEffect } from 'react';

import ICategoryProps from 'interfaces/Category';

import { doFetch } from 'utils/fetch';

const Category: React.FC<ICategoryProps> = (props: ICategoryProps) => {
    const categoryName = props.categoryName.split('/').pop();

    useEffect(() => {
        doFetch({ url: '/categories/' + categoryName, method: 'get', body: {} });
    });

    return (
        <div>
            <h1>{categoryName}</h1>
        </div>
    )
}

export default Category;