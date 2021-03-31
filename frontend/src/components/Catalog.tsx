import React from 'react';

import 'css/main.css';

import programming from 'images/programming.jpg';
import health from 'images/health.jpg';
import history from 'images/history.jpg';
import memes from 'images/memes.jpg';
import finance from 'images/finance.jpg';
import games from 'images/games.jpg';
import realityShow from 'images/realityShow.jpg';
import wellBeing from 'images/wellBeing.jpg';
import music from 'images/music.jpg';
import politics from 'images/politics.jpg';
import stocks from 'images/stocks.jpg';
import technology from 'images/technology.jpg';
import books from 'images/books.jpg';
import architecture from 'images/architecture.jpg';
import nature from 'images/nature.jpg';
import travel from 'images/travel.jpg';
import novels from 'images/novels.jpg';
import harryPotter from 'images/harryPotter.jpg';
import math from 'images/math.jpg';
import geography from 'images/geography.jpg';
import fights from 'images/fights.jpg';
import sports from 'images/sports.jpg';
import esports from 'images/esports.jpg';

const Index: React.FC = () => {
    return (
        <div className='container-parent catalog-body'>
            <div className='container-categories'>

                {/* <div className='category' style={{ backgroundColor: '#0d89a3' }}> */}
                <div className='category' style={{ backgroundImage: `url(${programming})` }}>
                    <a className="category-link" href="categories/programming">
                        <div className='category-link'>
                            {/* <i className="fab fa-python icon"></i> */}
                            {/* <br/> */}
                            Programming
                        </div>
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#bc053e' }}> */}
                <div className="category" style={{ backgroundImage: `url(${health})` }}>
                    <a className='category-link' href="/categories/health">
                        {/* <i className="fas fa-clinic-medical icon"></i>
                        <br/> */}
                        Health
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#661e6a' }}> */}
                <div className="category" style={{ backgroundImage: `url(${history})` }}>
                    <a className='category-link' href="/categories/history">
                        {/* <i className="fas fa-book icon"></i>
                        <br/> */}
                        History
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#febc38' }}> */}
                <div className="category" style={{ backgroundImage: `url(${memes})` }}>
                    <a className='category-link' href="/categories/memes">
                        {/* <i className="far fa-grin-squint-tears icon"></i>
                        <br/> */}
                        Memes
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#377e72' }}> */}
                <div className="category" style={{ backgroundImage: `url(${finance})` }}>
                    <a className='category-link' href="/categories/finances">
                        {/* <i className="far fa-money-bill-alt icon"></i>
                        <br/> */}
                        Finances
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#173f5f' }}> */}
                <div className="category" style={{ backgroundImage: `url(${games})` }}>
                    <a className='category-link' href="/categories/games">
                        {/* <i className="fab fa-steam icon"></i>
                        <br/> */}
                        Games
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#ed553b' }}> */}
                <div className="category" style={{ backgroundImage: `url(${realityShow})` }}>
                    <a className='category-link' href="/categories/reality%20shows">
                        {/* <i className="fas fa-users icon"></i>
                        <br/> */}
                        Reality Shows
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#f6d55c' }}> */}
                <div className="category" style={{ backgroundImage: `url(${wellBeing})` }}>
                    <a className='category-link' href="/categories/well%20being">
                        {/* <i className="fas fa-user-nurse icon"></i>
                        <br/> */}
                        Well Being
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#ca3542' }}> */}
                <div className="category" style={{ backgroundImage: `url(${music})` }}>
                    <a className='category-link' href="/categories/music">
                        {/* <i className="fas fa-guitar icon"></i>
                        <br/> */}
                        Music
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#1d2327' }}> */}
                <div className="category" style={{ backgroundImage: `url(${politics})` }}>
                    <a className='category-link' href="/categories/politics">
                        {/* <i className="fas fa-male icon"></i>
                        <br/> */}
                        Politics
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#692d18' }}> */}
                <div className="category" style={{ backgroundImage: `url(${stocks})` }}>
                    <a className='category-link' href="/categories/stocks">
                        {/* <i className="fas fa-business-time icon"></i>
                        <br/> */}
                        Stocks
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#842f32' }}> */}
                <div className="category" style={{ backgroundImage: `url(${technology})` }}>
                    <a className='category-link' href="/categories/technology">
                        {/* <i className="fas fa-desktop icon"></i>
                        <br/> */}
                        Technology
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#878d92' }}> */}
                <div className="category" style={{ backgroundImage: `url(${books})` }}>
                    <a className='category-link' href="/categories/books">
                        {/* <i className="fas fa-book-open icon"></i>
                        <br/> */}
                        Books
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#0c695d' }}> */}
                <div className="category" style={{ backgroundImage: `url(${architecture})` }}>
                    <a className='category-link' href="/categories/architecture">
                        {/* <i className="fas fa-archway icon"></i>
                        <br/> */}
                        Architecture
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#008a20' }}> */}
                <div className="category" style={{ backgroundImage: `url(${nature})` }}>
                    <a className='category-link' href="/categories/nature">
                        {/* <i className="fab fa-pagelines icon"></i>
                        <br/> */}
                        Nature
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#faac77' }}> */}
                <div className="category" style={{ backgroundImage: `url(${travel})` }}>
                    <a className='category-link' href="/categories/travel">
                        {/* <i className="fas fa-plane icon"></i>
                        <br/> */}
                        Travel
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#697f90' }}> */}
                <div className="category" style={{ backgroundImage: `url(${novels})` }}>
                    <a className='category-link' href="/categories/novels">
                        {/* <i className="fas fa-tv icon"></i>
                        <br/> */}
                        Novels
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#a11e22' }}> */}
                <div className="category" style={{ backgroundImage: `url(${harryPotter})` }}>
                    <a className='category-link' href="/categories/harry%20potter">
                        {/* <i className="fas fa-quidditch icon"></i>
                        <br/> */}
                        Harry Potter
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#dbc684' }}> */}
                <div className="category" style={{ backgroundImage: `url(${math})` }}>
                    <a className='category-link' href="/categories/math">
                        {/* <i className="fas fa-calculator icon"></i>
                        <br/> */}
                        Math
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#362400' }}> */}
                <div className="category" style={{ backgroundImage: `url(${geography})` }}>
                    <a className='category-link' href="/categories/geography">
                        {/* <i className="fas fa-mountain icon"></i>
                        <br/> */}
                        Geography
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#d63638' }}> */}
                <div className="category" style={{ backgroundImage: `url(${fights})` }}>
                    <a className='category-link' href="/categories/fights">
                        {/* <i className="fas fa-angry icon"></i>
                        <br/> */}
                        Fights
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#658b6f' }}> */}
                <div className="category" style={{ backgroundImage: `url(${sports})` }}>
                    <a className='category-link' href="/categories/sports">
                        {/* <i className="fas fa-futbol icon"></i>
                        <br/> */}
                        Sports
                    </a>
                </div>

                {/* <div className="category" style={{ backgroundColor: '#1a494f' }}> */}
                <div className="category" style={{ backgroundImage: `url(${esports})` }}>
                    <a className='category-link' href="/categories/esports">
                        {/* <i className="fas fa-trophy icon"></i>
                        <br/> */}
                        E-Sports
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Index;