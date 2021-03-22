import React from 'react';

import 'css/main.css';

const Index: React.FC = () => {
    return (
        <div className='container-parent catalog-body'>
            <div className='container-categories'>
                <div className='category' style={{ backgroundColor: '#0d89a3' }}>
                    <a className="category-link" href="/categories/programming">
                        <i className="fab fa-python icon"></i>
                        <br/>
                        Programming
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#bc053e' }}>
                    <a className='category-link' href="/categories/medicine">
                        <i className="fas fa-clinic-medical icon"></i>
                        <br/>
                        Medicine
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#661e6a' }}>
                    <a className='category-link' href="/categories/history">
                        <i className="fas fa-book icon"></i>
                        <br/>
                        History
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#377e72' }}>
                    <a className='category-link' href="/categories/finances">
                        <i className="far fa-money-bill-alt icon"></i>
                        <br/>
                        Finances
                    </a>    
                </div>

            </div>
        </div>
    )
}

export default Index;