import React, { useEffect, useState } from 'react';

import ICategoryProps from 'interfaces/Category';

import { doFetch } from 'utils/fetch';

const Category: React.FC<ICategoryProps> = (props: ICategoryProps) => {
    const [titles, setTitles] = useState(['']);
    const [links, setLinks] = useState(['']);
    const [descriptions, setDescriptions] = useState(['']);

    const categoryName = props.categoryName.split('/').pop();

    useEffect(() => {
        (async () => {
            const content = await doFetch({ url: 'categories/' + categoryName, method: 'get' });

            setTitles(content.titles);
            setLinks(content.links);
            setDescriptions(content.descriptions);
        })();
    }, [categoryName]);

    return (
        <div>
            {titles.map((title, index) => {
                return (
                    <div>
                        <h2>{title}</h2>
                        <p>{descriptions[index]}</p>
                        <a href={links[index]}>{links[index]}</a>
                    </div>
                )
            })}
        </div>
    )
}

export default Category;