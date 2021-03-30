import React from 'react';

import 'css/main.css';

const Index: React.FC = () => {
    return (
        <div className='container-parent catalog-body'>
            <div className='container-categories'>

                <div className='category' style={{ backgroundColor: '#0d89a3' }}>
                    <a className="category-link" href="categories/programming">
                        <div className='category-link'>
                            <i className="fab fa-python icon"></i>
                            <br/>
                            Programming
                        </div>
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#bc053e' }}>
                    <a className='category-link' href="/categories/health">
                        <i className="fas fa-clinic-medical icon"></i>
                        <br/>
                        Health
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#661e6a' }}>
                    <a className='category-link' href="/categories/history">
                        <i className="fas fa-book icon"></i>
                        <br/>
                        History
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#febc38' }}>
                    <a className='category-link' href="/categories/memes">
                        <i className="far fa-grin-squint-tears icon"></i>
                        <br/>
                        Memes
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#377e72' }}>
                    <a className='category-link' href="/categories/finances">
                        <i className="far fa-money-bill-alt icon"></i>
                        <br/>
                        Finances
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#173f5f' }}>
                    <a className='category-link' href="/categories/games">
                        <i className="fab fa-steam icon"></i>
                        <br/>
                        Games
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#ed553b' }}>
                    <a className='category-link' href="/categories/reality%20shows">
                        <i className="fas fa-users icon"></i>
                        <br/>
                        Reality Shows
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#f6d55c' }}>
                    <a className='category-link' href="/categories/well%20being">
                        <i className="fas fa-user-nurse icon"></i>
                        <br/>
                        Well Being
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#ca3542' }}>
                    <a className='category-link' href="/categories/music">
                        <i className="fas fa-guitar icon"></i>
                        <br/>
                        Music
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#1d2327' }}>
                    <a className='category-link' href="/categories/politics">
                        <i className="fas fa-male icon"></i>
                        <br/>
                        Politics
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#692d18' }}>
                    <a className='category-link' href="/categories/stocks">
                        <i className="fas fa-business-time icon"></i>
                        <br/>
                        Stocks
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#842f32' }}>
                    <a className='category-link' href="/categories/technology">
                        <i className="fas fa-desktop icon"></i>
                        <br/>
                        Technology
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#878d92' }}>
                    <a className='category-link' href="/categories/books">
                        <i className="fas fa-book-open icon"></i>
                        <br/>
                        Books
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#0c695d' }}>
                    <a className='category-link' href="/categories/architecture">
                        <i className="fas fa-archway icon"></i>
                        <br/>
                        Architecture
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#008a20' }}>
                    <a className='category-link' href="/categories/nature">
                        <i className="fab fa-pagelines icon"></i>
                        <br/>
                        Nature
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#faac77' }}>
                    <a className='category-link' href="/categories/travel">
                        <i className="fas fa-plane icon"></i>
                        <br/>
                        Travel
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#697f90' }}>
                    <a className='category-link' href="/categories/novels">
                        <i className="fas fa-tv icon"></i>
                        <br/>
                        Novels
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#a11e22' }}>
                    <a className='category-link' href="/categories/harry%20potter">
                        <i className="fas fa-quidditch icon"></i>
                        <br/>
                        Harry Potter
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#dbc684' }}>
                    <a className='category-link' href="/categories/math">
                        <i className="fas fa-calculator icon"></i>
                        <br/>
                        Math
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#362400' }}>
                    <a className='category-link' href="/categories/geography">
                        <i className="fas fa-mountain icon"></i>
                        <br/>
                        Geography
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#d63638' }}>
                    <a className='category-link' href="/categories/fights">
                        <i className="fas fa-angry icon"></i>
                        <br/>
                        Fights
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#658b6f' }}>
                    <a className='category-link' href="/categories/sports">
                        <i className="fas fa-futbol icon"></i>
                        <br/>
                        Sports
                    </a>
                </div>

                <div className="category" style={{ backgroundColor: '#1a494f' }}>
                    <a className='category-link' href="/categories/esports">
                        <i className="fas fa-trophy icon"></i>
                        <br/>
                        E-Sports
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Index;