import React from 'react';

import 'css/main.css';

const Index: React.FC = () => {
    return (
        <div>
            <a className='category' href="/categories/programming">Programming</a>
            <a className='category' href="/categories/medicine">Medicine</a>
            <a className='category' href="/categories/history">History</a>
            <a className='category' href="/categories/finances">Finances</a>
        </div>
    )
}

export default Index;