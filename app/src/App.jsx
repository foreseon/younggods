import { Routes, Route, Link, Outlet } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import { useState, useEffect, useRef } from 'react';
import ygGold from '../images/yg-gold.jpg';
import ygFather from '../images/yg-father.jpg';
import ygMinigun from '../images/yg-minigun.jpg';
import ygPizza from '../images/yg-pizza.jpg';
import logoLong from '../images/logo-long.jpg';
import logoShort from '../images/logo-short.jpg';
import tshirt1 from '../images/tshirt-1.PNG';
import tshirt2 from '../images/tshirt-2.PNG';
import tshirt3 from '../images/tshirt-3.PNG';
import tshirt4 from '../images/tshirt-4.PNG';
import mainImage from '../images/main.jpg';
import MusicPlayer from './MusicPlayer';

function Layout() {
  const [landingDismissed, setLandingDismissed] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleEnterSite = () => {
    // Trigger slide-up animation then remove overlay
    setExiting(true);
    // Signal the music player to start
    window.dispatchEvent(new Event('play-music'));
    // Remove overlay after the animation finishes (700ms)
    setTimeout(() => setLandingDismissed(true), 700);
  };

  return (
    <>
      {/* Landing Overlay */}
      {!landingDismissed && (
        <div
          className={`fixed inset-0 z-50 overflow-hidden transition-transform duration-700 ${exiting ? '-translate-y-full' : 'translate-y-0'}`}
        >
          {/* Background image with hypnotic animation */}
          <img
            src={mainImage}
            alt="Main"
            className="absolute inset-0 w-full h-full object-cover animate-zoom-sway"
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Center button and CA text */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <button
              onClick={handleEnterSite}
              className="flex items-center px-12 py-6 text-3xl md:text-5xl font-extrabold tracking-widest text-white bg-black/70 border-4 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {/* Left coin */}
              <img src={logoShort} alt="coin" className="hidden md:block w-10 h-10 mr-4 animate-coin-flip rounded-full object-cover border-2 border-yellow-400 shadow-lg" />
              <span>FOREVER YOUNG</span>
              {/* Right coin */}
              <img src={logoShort} alt="coin" className="hidden md:block w-10 h-10 ml-4 animate-coin-flip rounded-full object-cover border-2 border-yellow-400 shadow-lg" />
            </button>
            <p className="mt-4 text-lg md:text-xl font-semibold tracking-wider animate-text-shine">
              CA: soon.
            </p>
          </div>
        </div>
      )}

      {/* Main Site Content */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col">
        <MusicPlayer />
        <header className="w-full py-6 flex flex-col items-center border-b border-gray-800">
          <h1 className="text-7xl font-black mb-2 tracking-tight text-white">YoungGods</h1>
          <nav className="flex gap-8 mb-6">
            <Link to="/" className="text-gray-300 hover:text-white font-bold text-lg transition-colors">Main</Link>
            <Link to="/token" className="text-gray-300 hover:text-white font-bold text-lg transition-colors">$YG</Link>
            <Link to="/game" className="text-gray-300 hover:text-white font-bold text-lg transition-colors">Game</Link>
            <Link to="/staking" className="text-gray-300 hover:text-white font-bold text-lg transition-colors">Staking</Link>
            <Link to="/shop" className="text-gray-300 hover:text-white font-bold text-lg transition-colors">Shop</Link>
          </nav>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <Outlet />
        </main>
        <footer className="w-full py-6 text-center text-gray-500 border-t border-gray-800">©2025 YoungGods. All Rights Reserved.</footer>
      </div>
    </>
  );
}

function Main() {
  const [pumps, setPumps] = useState([]);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const addPump = () => {
      setPumps(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          hard: Math.random() < 0.4, // 40% chance hard pump
        },
      ]);
    };

    // spawn every 4s
    const interval = setInterval(addPump, 4000);

    return () => clearInterval(interval);
  }, []);

  // regular glitch every 2 seconds
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 600); // glitch visible for 0.6s
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section className="w-full max-w-7xl text-center mb-20 px-4">
      <div className="mb-16">
        <img
          src={logoLong}
          alt="Main Banner"
          className={`w-full h-48 sm:h-64 md:h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl ${glitch ? 'glitch' : ''}`}
        />
      </div>

      {/* Explore section */}
      <div className="mb-16">
        <h2 className="text-5xl font-black mb-12 text-white">Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Link to="/token" className="block bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center border border-gray-700 hover:border-white">
            <img src={ygGold} alt="$YG Token" className="w-32 h-32 object-cover rounded-lg mb-4" />
            <span className="text-xl font-bold mb-2 text-white">$YG</span>
            <span className="text-gray-400">The power token</span>
          </Link>
          <Link to="/game" className="block bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center border border-gray-700 hover:border-white">
            <img src={ygMinigun} alt="Game" className="w-32 h-32 object-cover rounded-lg mb-4" />
            <span className="text-xl font-bold mb-2 text-white">Game</span>
            <span className="text-gray-400">Preview the YoungGods game</span>
          </Link>
          <Link to="/staking" className="block bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center border border-gray-700 hover:border-white">
            <img src={ygFather} alt="Staking" className="w-32 h-32 object-cover rounded-lg mb-4" />
            <span className="text-xl font-bold mb-2 text-white">Staking</span>
            <span className="text-gray-400">Stake your NFTs</span>
          </Link>
          <Link to="/shop" className="block bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center border border-gray-700 hover:border-white">
            <img src={ygPizza} alt="Shop" className="w-32 h-32 object-cover rounded-lg mb-4" />
            <span className="text-xl font-bold mb-2 text-white">Shop</span>
            <span className="text-gray-400">See upcoming merch and collectibles</span>
          </Link>
        </div>
      </div>

      <h2 className="text-5xl font-black mb-12 text-white">Community</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
        <a href="https://t.me/YoungDeGods" target="_blank" rel="noopener noreferrer" className="bg-gray-800 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-bold flex items-center gap-3 border border-gray-700 hover:border-white text-white">
          <span className="inline-block w-6 h-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-cyan-400"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 7.39l-1.39 6.53c-.105.464-.38.577-.77.36l-2.13-1.57-1.03 1c-.114.114-.21.21-.43.21l.16-2.24 4.09-3.69c.18-.16-.04-.25-.28-.09l-5.05 3.18-2.18-.68c-.47-.15-.48-.47.1-.7l8.53-3.3c.39-.15.73.09.6.7z"/></svg>
          </span>
          Telegram
        </a>
        <a href="https://x.com/YoungDeGods" target="_blank" rel="noopener noreferrer" className="bg-gray-800 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-bold flex items-center gap-3 border border-gray-700 hover:border-white text-white">
          <span className="inline-block w-6 h-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </span>
          Follow on X
        </a>
        <a href="https://discord.gg/HFUupt2VRR" target="_blank" rel="noopener noreferrer" className="bg-gray-800 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-bold flex items-center gap-3 border border-gray-700 hover:border-white text-white">
          <span className="inline-block w-6 h-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-400"><path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.074.074 0 0 0-.078.037c-.34.607-.719 1.396-.984 2.013a18.219 18.219 0 0 0-5.456 0 12.51 12.51 0 0 0-.995-2.013.077.077 0 0 0-.078-.037A19.736 19.736 0 0 0 3.684 4.369a.07.07 0 0 0-.032.027C.533 8.159-.32 11.81.099 15.404a.082.082 0 0 0 .031.056c2.052 1.507 4.042 2.422 5.992 3.029a.077.077 0 0 0 .084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.104c-.652-.247-1.27-.549-1.872-.892a.077.077 0 0 1-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.075.075 0 0 1 .078.009c.12.099.245.197.372.291a.077.077 0 0 1-.006.128 12.298 12.298 0 0 1-1.873.892.076.076 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028c1.961-.607 3.951-1.522 6.003-3.029a.077.077 0 0 0 .03-.055c.5-4.073-.838-7.693-3.285-10.999a.061.061 0 0 0-.03-.028zM8.02 14.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z"/></svg>
          </span>
          Discord
        </a>
      </div>

      <h3 className="text-[60px] md:text-[80px] lg:text-[120px] font-black text-white tracking-tighter mb-20" style={{ fontFamily: 'Impact, sans-serif' }}>YOUNG GODS</h3>
      
      <p className="text-4xl font-black text-white tracking-widest mb-16" style={{ fontFamily: 'Arial Black, sans-serif' }}>
        LOST CHILDREN OF GODS.
      </p>
      
      <p className="text-3xl font-bold text-yellow-400 tracking-wider mb-10" style={{ fontFamily: 'Arial, sans-serif' }}>
        THE 3333 VESSELS OF POWER HAVE BEEN CLAIMED. THE GATES ARE CLOSED.
      </p>
      
      <p className="text-2xl font-bold text-gray-300 tracking-wider mb-16" style={{ fontFamily: 'Arial, sans-serif' }}>
        TIME FOR NEXT STAGE, ASCENSION OF $YG.
      </p>
      
      <p className="text-5xl font-black text-white tracking-tight mb-16" style={{ fontFamily: 'Impact, sans-serif' }}>
        $YG TOMORROW.
      </p>
      
      <p className="text-2xl font-bold text-gray-400 tracking-wide mb-20" style={{ fontFamily: 'Arial, sans-serif' }}>
        NEW TRIALS AWAIT.
      </p>

      {/* Green pumps */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {pumps.map(p => (
          <div
            key={p.id}
            className={p.hard ? 'green-pump-hard' : 'green-pump-soft'}
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
          />
        ))}
      </div>

      {/* Pump styles */}
      <style jsx>{`
        @keyframes pumpSoft {
          0% { transform: scale(0); opacity: 0.4; }
          80% { opacity: 0.2; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes pumpHard {
          0% { transform: scale(0); opacity: 0.7; }
          60% { opacity: 0.3; }
          100% { transform: scale(4); opacity: 0; }
        }

        .green-pump-soft, .green-pump-hard {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,0,0.8) 0%, rgba(0,255,0,0) 70%);
          pointer-events: none;
        }

        .green-pump-soft { animation: pumpSoft 2s ease-out forwards; }
        .green-pump-hard { animation: pumpHard 1.5s ease-out forwards; }

        /* glitch keyframes */
        @keyframes glitch {
          0% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(10% 0 85% 0);
            transform: translate(-5px, -5px);
          }
          40% {
            clip-path: inset(80% 0 5% 0);
            transform: translate(5px, 5px);
          }
          60% {
            clip-path: inset(30% 0 50% 0);
            transform: translate(-5px, 5px);
          }
          80% {
            clip-path: inset(60% 0 25% 0);
            transform: translate(5px, -5px);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
        }

        .glitch {
          animation: glitch 0.6s steps(2, end);
        }
      `}</style>
    </section>
  );
}

function Shop() {
  return (
    <section className="w-full max-w-5xl mx-auto text-center mb-20 px-4">
      <h1 className="text-5xl font-black mb-6 text-white">Shop</h1>
      <p className="mb-4 text-lg text-gray-400 max-w-2xl mx-auto">Coming soon...</p>
      <p className="mb-12 text-xl font-semibold text-yellow-400 max-w-2xl mx-auto" style={{ textShadow: '0 0 8px rgba(255, 215, 0, 0.5)' }}>
        THE YOUNGGODS ARMORY WILL ACCEPT $YG EXCLUSIVELY.
      </p>
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-6 text-left text-gray-300 font-bold">Item</th>
              <th className="py-4 px-6 text-left text-gray-300 font-bold">Preview</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
              <td className="py-6 px-6 text-white font-bold">T-shirt 1</td>
              <td className="py-6 px-6">
                <img src={tshirt1} alt="T-shirt 1" className="w-32 h-40 object-cover rounded-lg mx-auto shadow-lg" />
              </td>
            </tr>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
              <td className="py-6 px-6 text-white font-bold">T-shirt 2</td>
              <td className="py-6 px-6">
                <img src={tshirt2} alt="T-shirt 2" className="w-32 h-40 object-cover rounded-lg mx-auto shadow-lg" />
              </td>
            </tr>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
              <td className="py-6 px-6 text-white font-bold">T-shirt 3</td>
              <td className="py-6 px-6">
                <img src={tshirt3} alt="T-shirt 3" className="w-32 h-40 object-cover rounded-lg mx-auto shadow-lg" />
              </td>
            </tr>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
              <td className="py-6 px-6 text-white font-bold">T-shirt 4</td>
              <td className="py-6 px-6">
                <img src={tshirt4} alt="T-shirt 4" className="w-32 h-40 object-cover rounded-lg mx-auto shadow-lg" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Game() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [balance, setBalance] = useState(1000);
  const [showResult, setShowResult] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [showVictoryPopup, setShowVictoryPopup] = useState(false);
  const [winAmount, setWinAmount] = useState(0);

  const handleFlip = (choice) => {
    if (betAmount <= 0 || betAmount > balance) return;
    
    setUserChoice(choice);
    setIsFlipping(true);
    setShowResult(false);
    setShowVictoryPopup(false);
    setFlipCount(prev => prev + 1);
    
    setBalance(prev => prev - betAmount);
    
    setTimeout(() => {
      const randomResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(randomResult);
      setIsFlipping(false);
      setShowResult(true);
      
      if (randomResult === choice) {
        const winAmount = betAmount * 2;
        setBalance(prev => prev + winAmount);
        setWinAmount(winAmount);
        setShowVictoryPopup(true);
      }
    }, 3000);
  };

  return (
    <section className="w-full max-w-5xl mx-auto text-center mb-10 px-4">
    <section className="w-full max-w-6xl mx-auto text-center mb-20 px-4">
      <h1 className="text-7xl font-black mb-12 text-white tracking-tighter">COIN TOSS</h1>
      
      <div className="bg-black rounded-none p-16 border-4 border-gray-800 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-70"></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)' }}></div>
        
        <div className="relative z-10">
          <div className="text-2xl font-black text-white mb-2">
             BALANCE: <span className="text-green-400">{balance}</span> TOKENS
           </div>
           <p className="text-sm font-semibold text-yellow-400 mb-6" style={{ textShadow: '0 0 8px rgba(255, 215, 0, 0.5)' }}>(Gamified with test tokens. Will operate with $YG post-launch)</p>
           
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="relative">
              <input
                type="number"
                value={betAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setBetAmount(value < 0 ? 0 : value);
                }}
                placeholder="ENTER BET AMOUNT"
                className="bg-gray-900 text-white px-8 py-4 rounded-xl w-64 text-center text-xl font-bold border-4 border-gray-800 focus:outline-none focus:border-white transition-all duration-300"
              />
            </div>
            
            <div className="flex gap-6">
              <button
                onClick={() => handleFlip('heads')}
                disabled={isFlipping || !betAmount || betAmount <= 0 || betAmount > balance}
                className="bg-white text-black px-10 py-4 rounded-xl font-black text-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                HEADS
              </button>
              <button
                onClick={() => handleFlip('tails')}
                disabled={isFlipping || !betAmount || betAmount <= 0 || betAmount > balance}
                className="bg-white text-black px-10 py-4 rounded-xl font-black text-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                TAILS
              </button>
            </div>
          </div>

          <div className="relative h-64 flex items-center justify-center">
            <div className={`w-40 h-40 relative ${isFlipping ? 'animate-flip' : ''}`}>
              <div className={`absolute w-full h-full ${isFlipping ? 'animate-rotate' : ''}`}>
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-4 border-yellow-500 shadow-2xl overflow-hidden">
                  <img 
                    src={logoShort} 
                    alt="Coin face" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {showResult && (
            <div className="mt-8">
              <p className={`text-4xl font-black ${result === userChoice ? 'text-green-400' : 'text-red-400'} mb-4`}>
                {result === userChoice ? 'YOU WON!' : 'YOU LOST!'}
              </p>
              <p className="text-2xl text-gray-300">
                {result === userChoice ? `+${betAmount * 2} TOKENS` : `-${betAmount} TOKENS`}
              </p>
            </div>
          )}

          {/* Victory Popup */}
          {showVictoryPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black bg-opacity-75"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-12 rounded-2xl border-4 border-green-500 transform scale-0 animate-popup">
                <h2 className="text-6xl font-black text-green-400 mb-8">VICTORY!</h2>
                <p className="text-4xl font-black text-white mb-8">YOU WON</p>
                <p className="text-7xl font-black text-green-400 mb-12">+{winAmount}</p>
                <button
                  onClick={() => setShowVictoryPopup(false)}
                  className="bg-green-500 text-white px-12 py-6 rounded-xl font-black text-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}

          {/* Fireworks Animation */}
          {showVictoryPopup && (
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-firework"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-red-500 rounded-full absolute top-0 left-0 animate-firework-particle"></div>
                  <div className="w-1 h-1 bg-blue-500 rounded-full absolute top-0 right-0 animate-firework-particle"></div>
                  <div className="w-1 h-1 bg-green-500 rounded-full absolute bottom-0 left-0 animate-firework-particle"></div>
                  <div className="w-1 h-1 bg-purple-500 rounded-full absolute bottom-0 right-0 animate-firework-particle"></div>
                </div>
              ))}
            </div>
          )}

          {/* Loss Animation */}
          {showResult && !showVictoryPopup && result !== userChoice && (
            <div className="fixed inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-red-500 opacity-0 animate-loss-flash"></div>
            </div>
          )}
        </div>
      </div>

      </section>

      <style jsx>{`
        @keyframes flip {
          0% { transform: rotateY(0deg); }
          25% { transform: rotateY(180deg); }
          50% { transform: rotateY(360deg); }
          75% { transform: rotateY(540deg); }
          100% { transform: rotateY(720deg); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes popup {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes firework {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes firework-particle {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(var(--x, 20px), var(--y, 20px)); opacity: 0; }
        }

        @keyframes loss-flash {
          0% { opacity: 0; }
          50% { opacity: 0.2; }
          100% { opacity: 0; }
        }
        
        .animate-flip {
          animation: flip 0.5s infinite;
        }
        
        .animate-rotate {
          animation: rotate 0.5s infinite;
        }

        .animate-popup {
          animation: popup 0.5s forwards;
        }

        .animate-firework {
          animation: firework 2s infinite;
        }

        .animate-firework-particle {
          animation: firework-particle 1s infinite;
        }

        .animate-loss-flash {
          animation: loss-flash 0.5s;
        }
      `}</style>
    </section>
  );
}

function Staking() {
  return (
    <section className="w-full max-w-7xl mx-auto mb-20 px-4">
      <h1 className="text-5xl font-black mb-6 text-white text-center">NFT Staking</h1>
      <p className="mb-12 text-lg text-gray-400 max-w-2xl mx-auto text-center">
        Opens tomorrow. Stake your NFTs to earn rewards. <span className="text-yellow-400 font-semibold">$YG</span> holders will receive exclusive bonuses.
        <br />
        <span className="text-red-400">Warning: Unstaking will result in loss of accumulated points.</span>
        <br />
        <span className="text-gray-500 text-sm italic">Images shown are dummy placeholders.</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Unstaked NFTs Section */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Unstaked NFTs</h2>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300">
              Select All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((nft) => (
              <div key={nft} className="relative group">
                <div className="bg-gray-700 rounded-lg p-4 border-2 border-gray-600 group-hover:border-white transition-all duration-300">
                  <img src={logoShort} alt={`NFT ${nft} (dummy)`} className="w-full aspect-square object-cover rounded-lg mb-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">NFT #{nft}</span>
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300">
            Stake Selected NFTs
          </button>
        </div>

        {/* Staked NFTs Section */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Staked NFTs</h2>
              <p className="text-gray-400">Total Points: 1,234</p>
            </div>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300">
              Select All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((nft) => (
              <div key={nft} className="relative group">
                <div className="bg-gray-700 rounded-lg p-4 border-2 border-gray-600 group-hover:border-white transition-all duration-300">
                  <img src={logoShort} alt={`Staked NFT ${nft} (dummy)`} className="w-full aspect-square object-cover rounded-lg mb-2" />
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white font-bold block">NFT #{nft}</span>
                      <span className="text-gray-400 text-sm">Points: {nft * 100}</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-all duration-300">
            Unstake Selected NFTs
          </button>
        </div>
      </div>

      {/* Staking Info Section */}
      <div className="mt-12 bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Staking Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-2 text-white">Points Rate</h3>
            <p className="text-gray-400">1 point per hour per NFT</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-2 text-white">Minimum Stake Time</h3>
            <p className="text-gray-400">No minimum time required</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-2 text-white">Maximum NFTs</h3>
            <p className="text-gray-400">No limit on staked NFTs</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Token() {
  const [tokens, setTokens] = useState([]);
  const [blasts, setBlasts] = useState([]);
  const [copied, setCopied] = useState(false);
  const blastDelayRef = useRef(2500);
  const blastTimeout = useRef(null);

  useEffect(() => {
    const spawnBlast = () => {
      const newBlast = { id: Date.now() + Math.random() };
      setBlasts(prev => [...prev, newBlast]);
      setTimeout(() => {
        setBlasts(prev => prev.filter(b => b.id !== newBlast.id));
      }, 800);

      // decrease delay down to 500ms min
      blastDelayRef.current = Math.max(500, blastDelayRef.current - 100);
      blastTimeout.current = setTimeout(spawnBlast, blastDelayRef.current);
    };

    blastTimeout.current = setTimeout(spawnBlast, blastDelayRef.current);

    return () => clearTimeout(blastTimeout.current);
  }, []);

  useEffect(() => {
    // helper to add a floating token
    const addToken = () => {
      setTokens(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          size: 20 + Math.random() * 30,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: 6 + Math.random() * 6,
        },
      ]);
    };

    // seed initial tokens
    for (let i = 0; i < 30; i++) addToken();

    // keep adding tokens over time (faster spawn)
    const tokenInterval = setInterval(addToken, 1000);

    return () => clearInterval(tokenInterval);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto text-center mb-20 px-4">
      {/* Floating tokens & green blasts */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {tokens.map(token => (
          <img
            key={token.id}
            src={logoShort}
            alt="token"
            className="floating-token rounded-full border-2 border-yellow-400 shadow-lg object-cover"
            style={{
              width: token.size,
              height: token.size,
              left: `${token.left}%`,
              top: `${token.top}%`,
              animationDuration: `${token.duration}s`,
            }}
          />
        ))}
        {blasts.map(blast => (
          <div key={blast.id} className="green-blast" />
        ))}
      </div>

      {/* Headline & content */}
      <div className="relative mb-16 z-10">
        <h1
          className="text-7xl font-black text-white tracking-tighter"
          style={{ textShadow: '0 0 30px rgba(255,255,255,0.4)' }}
        >
          $YG
        </h1>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      <div className="bg-black rounded-none p-16 border-4 border-gray-800 mb-16 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-70" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)' }}
        />

        <div className="relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-black p-8 border-4 border-gray-800">
              <p
                className="text-2xl font-black text-white tracking-wider leading-relaxed uppercase"
                style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7)' }}
              >
                THE ULTIMATE POWER TOKEN.
              </p>
            </div>

            <div className="bg-black p-8 border-4 border-gray-800">
              <h2
                className="text-3xl font-black text-white mb-6 tracking-tight uppercase"
                style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7)' }}
              >
                CONTRACT ADDRESS
              </h2>
              <div className="bg-gray-900 rounded-lg p-6 border-4 border-gray-800 w-full max-w-xs sm:max-w-sm mx-auto cursor-pointer group" onClick={() => {
                navigator.clipboard.writeText('TOMORROW');
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-400 tracking-wider break-words animate-vibrate group-hover:text-green-400 select-none">TOMORROW</p>
                {copied && <span className="block mt-2 text-xs text-green-400">Copied!</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes floatToken {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
          }
        }

        .floating-token {
          position: absolute;
          animation: floatToken linear infinite;
          pointer-events: none;
        }

        @keyframes greenFlash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.25;
          }
          100% {
            opacity: 0;
          }
        }

        .green-blast {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 255, 0, 0.3);
          animation: greenFlash 0.8s ease-out forwards;
          pointer-events: none;
        }

        /* vibrate */
        @keyframes vibrate {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }

        .animate-vibrate {
          animation: vibrate 0.3s infinite;
        }
      `}</style>
    </section>
  );
}

function Whitepaper() {
  return (
    <section className="w-full max-w-4xl mx-auto text-center mb-20 px-4">
      <h1 className="text-6xl font-black text-white tracking-tight mb-12">$YG Whitepaper</h1>

      <div className="bg-gray-900 border-4 border-gray-800 p-10 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-black text-yellow-400 mb-6 tracking-tight">Tokenomics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left text-white text-xl font-semibold">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
            <p className="mb-2">NFT Holder Allocation</p>
            <p className="text-3xl font-black text-yellow-400">5%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
            <p className="mb-2">Gaming Rewards</p>
            <p className="text-3xl font-black text-yellow-400">5%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
            <p className="mb-2">Team Allocation</p>
            <p className="text-3xl font-black text-yellow-400">3%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg sm:col-span-2">
            <p className="mb-2">Community & Ecosystem</p>
            <p className="text-3xl font-black text-yellow-400">87%</p>
          </div>
        </div>

        <h2 className="text-3xl font-black text-white mt-16 mb-6 tracking-tight">Utility & Ecosystem</h2>

        <div className="space-y-10 text-left text-gray-300 leading-relaxed">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">GameFi Arena</h3>
            <p>
              $YG fuels an on-chain arcade where players stake tokens to participate in competitive mini-games.
              Weekly prize pools, seasonal leaderboards, and NFT-bound achievement badges ensure a sustainable
              play-to-earn loop.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">NFT Staking Vault</h3>
            <p>
              Genesis NFT holders may lock their assets to earn a share of the daily emission pool (5 %).
              Multipliers reward longer lock periods while dynamic rarity boosts encourage diversified vaults.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Merch & Collectibles Shop</h3>
            <p>
              Exclusive drops—ranging from digital wearables to limited-edition streetwear—are priced
              exclusively in $YG. A burn-and-mint model retires 50 % of every purchase, tightening supply.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Governance</h3>
            <p>
              Token holders can submit YGIPs (YoungGods Improvement Proposals) and vote on emission tweaks,
              game parameters, and treasury deployments. Voting power is quadratic to prevent whale dominance.
            </p>
          </div>
        </div>

        {/* Roadmap removed as per request */}

        <p className="mt-10 text-xs text-gray-500 italic">
          This whitepaper is a living document. Figures and timelines are subject to community governance and
          prevailing market conditions.
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="shop" element={<Shop />} />
        <Route path="game" element={<Game />} />
        <Route path="staking" element={<Staking />} />
        <Route path="token" element={<Token />} />
        <Route path="yg-whitepaper" element={<Whitepaper />} />
      </Route>
    </Routes>
  );
}

export default App;

