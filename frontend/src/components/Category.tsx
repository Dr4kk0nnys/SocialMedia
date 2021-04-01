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

                /* Sanitization for descriptions with long links ( it breaks responsive-design ) */
                const sanitizedDescription = description.split(' ').filter(word => !word.startsWith('https://')).join(' ');

                _posts.push({ title, link, description: sanitizedDescription, image });
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
        if (link.includes('podcast')) return 'spotify';

        return 'google';
    }

    const hasImage = (image: string) => {
        if (image === '' || image === 'image') return 'no-image';
        return 'has-image';
    }

    return (
        <div className='container-parent categories-body'>

            <div className='breadcrumb'>
                <span className='link'>
                    <a className='categories-link' href="/">/categories/</a>
                    <a className='categories-name' href={'/categories/' + categoryName}>{categoryName}</a>
                </span>
            </div>

            <div className="container-posts">
                {posts.map((element, index) => {
                    return (
                        <div key={element.title + index} className={hasImage(posts[index].image) + ' container-post ' + whereIsLinkFrom(posts[index].link)}>
                            <a target='_blank' rel='noreferrer' href={posts[index].link}>
                                <div className='post'>
                                    {hasImage(posts[index].image) === 'has-image' ? <img src={posts[index].image} alt="No preview." /> : ''} 
                                    <h2>{posts[index].title}</h2>
                                    <p>{posts[index].description}</p>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Category;