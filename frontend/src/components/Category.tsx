import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';

import ICategoryProps from 'interfaces/Category';

import { doFetch } from 'utils/fetch';

const Category: React.FC<ICategoryProps> = (props: ICategoryProps) => {
    const [posts, setPosts] = useState([{ title: '', link: '', description: '' }]);

    const categoryName = props.categoryName.split('/').pop();

    useEffect(() => {
        console.log('here');
        
        if (!categoryName) return;

        (async () => {
            const content = await doFetch({ url: 'categories/' + categoryName, method: 'get' });

            const post: { title: string, link: string, description: string }[] = [];
            for (let i = 0; i < content.titles.length; i++) {
                const title = content.titles[i];
                const link = content.links[i];
                const description = content.descriptions[i];

                post.push({ title, link, description });
            }
            setPosts(shuffle(post));
        })();
    }, [categoryName]);

    return (
        <div>
            {posts.map((element, index) => {
                return (
                    <div key={element.title + index}>
                        <h2>{posts[index].title}</h2>
                        <p>{posts[index].description}</p>
                        <a href={posts[index].link}>{posts[index].link}</a>
                    </div>
                )
            })}
        </div>
    )
}

export default Category;