import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';

import ICategoryProps from 'interfaces/Category';

import { doFetch } from 'utils/fetch';

const Category: React.FC<ICategoryProps> = (props: ICategoryProps) => {
    const [posts, setPosts] = useState([{ title: '', link: '', description: '', image: '' }]);

    const categoryName = props.categoryName.split('/').pop();

    useEffect(() => {
        if (!categoryName) return;

        (async () => {
            const content = await doFetch({ url: 'categories/' + categoryName, method: 'get' });

            const _posts: { title: string, link: string, description: string, image: string }[] = [];
            for (let i = 0; i < content.titles.length; i++) {
                const title = content.titles[i];
                const link = content.links[i];
                const description = content.descriptions[i];
                const image = content.images[i];

                _posts.push({ title, link, description, image });
            }
            console.log(_posts);
            
            setPosts(shuffle(_posts));
        })();
    }, [categoryName]);

    const whereIsLinkFrom = (link: string) => {
        if (link.includes('youtube')) return 'youtube';
        if (link.includes('twitter')) return 'twitter';
        if (link.includes('reddit')) return 'reddit';
        if (link.includes('amazon')) return 'amazon';

        return 'google';
    }

    return (
        <div className='container-parent'>

            <div className='breadcrumb'>
                <span className='link'>
                    <a className='categories-link' href="/">/categories/</a>
                    <a className='categories-name' href={'/categories/' + categoryName}>{categoryName}</a>
                </span>
            </div>

            {posts.map((element, index) => {
                return (
                    <div key={element.title + index} className={'container-posts ' + whereIsLinkFrom(posts[index].link)}>
                        <a target='_blank' rel='noreferrer' href={posts[index].link}>
                            <div className='post'>
                                {posts[index].image ? <img src={posts[index].image} alt="No preview available."/> : ''}
                                <div className="post-content">
                                    <h2>{posts[index].title}</h2>
                                    <p>{posts[index].description}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

export default Category;