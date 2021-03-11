import React from 'react';

import 'css/main.css';

const Index: React.FC = () => {
    return (
        <div className='container-parent'>
            <div className='container-categories'>
                <div className='category'>
                    <a className="category-link" href="/categories/programming">Programming</a>
                </div>

                <div className="category">
                    <a className='category-link' href="/categories/medicine">Medicine</a>
                </div>

                <div className="category">
                    <a className='category-link' href="/categories/history">History</a>
                </div>

                <div className="category">
                    <a className='category-link' href="/categories/finances">Finances</a>    
                </div>

            </div>
        </div>
    )
}

export default Index;