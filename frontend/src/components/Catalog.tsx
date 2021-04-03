import React from 'react';

import 'css/main.css';

import GEEK from 'images/GEEK.jpg';
import FINANCES from 'images/FINANCES.jpg';
import SCHOOL from 'images/SCHOOL.jpg';
import WELLBEING from 'images/WELLBEING.jpg';
import TV from 'images/TV.jpg';
import CULTURE from 'images/CULTURE.jpg';
import SPORTS from 'images/SPORTS.jpg';
import WORLD from 'images/WORLD.jpg';

import programming from 'images/programming.jpg';
import crypto from 'images/crypto.jpg';
import health from 'images/health.jpg';
import history from 'images/history.jpg';
import memes from 'images/memes.jpg';
import finance from 'images/finance.jpg';
import games from 'images/games.jpg';
import realityShow from 'images/realityShow.jpg';
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
import tvSeries from 'images/tvSeries.jpg';
import movies from 'images/movies.jpg';
import science from 'images/science.jpg';
import sustainability from 'images/sustainability.jpg';
import animals from 'images/animals.jpg';
import economy from 'images/economy.jpg';

const Index: React.FC = () => {
    return (
        <div className='container-parent catalog-body'>
            <div className='container-categories'>

                <div className='catalog' style={{ backgroundImage: `url(${GEEK})`, backgroundPosition: '100% 100%' }}>
                    <div className='category' style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="categories/programming">Programming</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${technology})` }}>
                        <a className='category-link' href="/categories/technology">Technology</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${esports})`, backgroundPosition: '50% 100%' }}>
                        <a className='category-link' href="/categories/e-sports">E-Sports</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${games})` }}>
                        <a className='category-link' href="/categories/games">Games</a>
                    </div>
                </div>

                <div className='catalog' style={{ backgroundImage: `url(${FINANCES})` }}>
                    <div className='category' style={{ backgroundImage: `url(${economy})`, backgroundPosition: '50% 40%' }}>
                        <a className='category-link' href="categories/economy">Economy</a>
                    </div>

                    <div className='category' style={{ backgroundImage: `url(${politics})`, backgroundPosition: '50% 40%' }}>
                        <a className='category-link' href="categories/politics">Politics</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${stocks})`, backgroundPosition: '50% 40%' }}>
                        <a className='category-link' href="/categories/stocks">Stocks</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${crypto})`, backgroundPosition: '20% 30%' }}>
                        <a className='category-link' href="/categories/crypto">Crypto</a>
                    </div>
                </div>

                <div className='catalog' style={{ backgroundImage: `url(${SCHOOL})` }}>
                    <div className='category' style={{ backgroundImage: `url(${history})` }}>
                        <a className='category-link' href="categories/history">History</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${math})` }}>
                        <a className='category-link' href="/categories/math">Math</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${geography})` }}>
                        <a className='category-link' href="/categories/geography">Geography</a>
                    </div>
                </div>

                <div className='catalog' style={{ backgroundImage: `url(${WELLBEING})` }}>
                    <div className='category' style={{ backgroundImage: `url(${health})` }}>
                        <a className='category-link' href="categories/health">Health</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${nature})` }}>
                        <a className='category-link' href="/categories/nature">Nature</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${travel})` }}>
                        <a className='category-link' href="/categories/travel">Travel</a>
                    </div>

                    {/* <div className="category" style={{ backgroundImage: `url(${humor})` }}> */}
                    <div className="category" style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="/categories/memes">Humor</a>
                    </div>
                </div>

                <div className='catalog' style={{ backgroundImage: `url(${TV})`, backgroundPosition: '50% 100%' }}>
                    {/* <div className='category' style={{ backgroundImage: `url(${realityShows})` }}> */}
                    <div className='category' style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="categories/realityShows">Reality Shows</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${tvSeries})` }}>
                        <a className='category-link' href="/categories/tvSeries">TV Series</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${movies})` }}>
                        <a className='category-link' href="/categories/movies">Movies</a>
                    </div>
                </div>

                <div className='catalog' style={{ backgroundImage: `url(${CULTURE})` }}>
                    <div className='category' style={{ backgroundImage: `url(${music})` }}>
                        <a className='category-link' href="categories/music">Music</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${books})` }}>
                        <a className='category-link' href="/categories/books">Books</a>
                    </div>

                    <div className="category" style={{ backgroundImage: `url(${science})`, backgroundPosition: '50% 72%' }}>
                        <a className='category-link' href="/categories/science">Science</a>
                    </div>

                    {/* <div className="category" style={{ backgroundImage: `url(${fashion})` }}> */}
                    <div className="category" style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="/categories/fashion">Fashion</a>
                    </div>
                </div>
                
                <div className='catalog' style={{ backgroundImage: `url(${SPORTS})` }}>
                    {/* <div className="category" style={{ backgroundImage: `url(${fights})` }}> */}
                    <div className="category" style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="/categories/fights">Fights</a>
                    </div>
                    
                    {/* <div className="category" style={{ backgroundImage: `url(${football})` }}> */}
                    <div className="category" style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="/categories/football">Football</a>
                    </div>
                    
                    {/* <div className="category" style={{ backgroundImage: `url(${soccer})` }}> */}
                    <div className="category" style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="/categories/soccer">Soccer</a>
                    </div>
                    
                    {/* <div className="category" style={{ backgroundImage: `url(${basketball})` }}> */}
                    <div className="category" style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="/categories/basketball">Basketball</a>
                    </div>
                    
                    {/* <div className="category" style={{ backgroundImage: `url(${NFL})` }}> */}
                    <div className="category" style={{ backgroundImage: `url(${programming})` }}>
                        <a className='category-link' href="/categories/NFL">NFL</a>
                    </div>
                </div>

                <div className='catalog' style={{ backgroundImage: `url(${WORLD})` }}>
                    <div className="category" style={{ backgroundImage: `url(${architecture})` }}>
                        <a className='category-link' href="/categories/architecture">Architecture</a>
                    </div>
                    
                    <div className="category" style={{ backgroundImage: `url(${sustainability})`, backgroundPosition: '50% 40%' }}>
                        <a className='category-link' href="/categories/sustainability">Sustainability</a>
                    </div>
                    
                    <div className="category" style={{ backgroundImage: `url(${animals})`, backgroundPosition: '30%' }}>
                        <a className='category-link' href="/categories/animals">Animals</a>
                    </div>
                </div>

{/* 
                <div className='category' style={{ backgroundImage: `url(${programming})` }}>
                    <a className='category-link' href="categories/programming">Programming</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${health})` }}>
                    <a className='category-link' href="/categories/health">Health</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${history})` }}>
                    <a className='category-link' href="/categories/history">History</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${memes})` }}>
                    <a className='category-link' href="/categories/memes">Memes</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${finance})` }}>
                    <a className='category-link' href="/categories/finances">Finances</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${games})` }}>
                    <a className='category-link' href="/categories/games">Games</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${realityShow})` }}>
                    <a className='category-link' href="/categories/reality%20shows">Reality Shows</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${wellBeing})` }}>
                    <a className='category-link' href="/categories/well%20being">Well Being</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${music})` }}>
                    <a className='category-link' href="/categories/music">Music</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${politics})` }}>
                    <a className='category-link' href="/categories/politics">Politics</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${stocks})` }}>
                    <a className='category-link' href="/categories/stocks">Stocks</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${technology})` }}>
                    <a className='category-link' href="/categories/technology">Technology</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${books})` }}>
                    <a className='category-link' href="/categories/books">Books</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${architecture})` }}>
                    <a className='category-link' href="/categories/architecture">Architecture</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${nature})` }}>
                    <a className='category-link' href="/categories/nature">Nature</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${travel})` }}>
                    <a className='category-link' href="/categories/travel">Travel</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${novels})` }}>
                    <a className='category-link' href="/categories/novels">Novels</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${harryPotter})` }}>
                    <a className='category-link' href="/categories/harry%20potter">Harry Potter</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${math})` }}>
                    <a className='category-link' href="/categories/math">Math</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${geography})` }}>
                    <a className='category-link' href="/categories/geography">Geography</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${fights})` }}>
                    <a className='category-link' href="/categories/fights">Fights</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${sports})` }}>
                    <a className='category-link' href="/categories/sports">Sports</a>
                </div>

                <div className="category" style={{ backgroundImage: `url(${esports})` }}>
                    <a className='category-link' href="/categories/esports">E-Sports</a>
                </div> */}

            </div>
        </div>
    )
}

export default Index;