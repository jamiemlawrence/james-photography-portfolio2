/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from 'react';
import { css, keyframes } from '@emotion/react';
import { Instagram, Mail, Menu, X } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Lightbox from "yet-another-react-lightbox";
/*import Download from "yet-another-react-lightbox/plugins/download";*/
import "yet-another-react-lightbox/styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


// Fade-in animation keyframe
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Reusable Fade-in wrapper component
const FadeIn = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      css={css`
        opacity: 0;
        ${inView && css`
          animation: ${fadeIn} 0.8s ease-out ${delay}s forwards;
        `}
      `}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navStyles = css`
    position: fixed;
    width: 100%;
    z-index: 50;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  `;

  const navContainerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      padding: 0 1.5rem;
    }
  `;

  const navContentStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;

    @media (min-width: 768px) {
      height: 5rem;
    }
  `;

  const menuStyles = css`
    display: none;
    align-items: center;
    gap: 2rem;

    @media (min-width: 768px) {
      display: flex;
    }
  `;

  const linkStyles = css`
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    color: #000;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #B91C1C;
    }
  `;

  const logoStyles = css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    font-weight: bold;
    letter-spacing: -0.025em;
    text-decoration: none;
    color: black;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  `;

  const mobileMenuButtonStyles = css`
    display: block;
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: black;

    @media (min-width: 768px) {
      display: none;
    }
  `;

  const mobileMenuStyles = css`
    background: transparent;
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;

    @media (min-width: 768px) {
      display: none;
    }
  `;

  const mobileMenuLinksStyles = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

  const mobileLinkStyles = css`
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    color: black;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #B91C1C;
    }
  `;

  return (
    <nav css={navStyles}>
      <div css={navContainerStyles}>
        <div css={navContentStyles}>
          {/* Left Menu */}
          <div css={menuStyles}>
            <Link to="/" css={linkStyles}>Home</Link>
            <Link to="/photos" css={linkStyles}>Photo</Link>
            <Link to="/video" css={linkStyles}>Video</Link>
            <Link to="/couchview" css={linkStyles}>CouchView</Link>
          </div>

          {/* Center Logo */}
          <Link to="/" css={logoStyles}>
            <h1>JAMES LAWRENCE</h1>
          </Link>

          {/* Right Menu */}
          <div css={menuStyles}>
            <Link to="/contact" css={linkStyles}>Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            css={mobileMenuButtonStyles}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div css={mobileMenuStyles}>
          <div css={mobileMenuLinksStyles}>
            <Link to="/" css={mobileLinkStyles} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/photos" css={mobileLinkStyles} onClick={() => setMobileMenuOpen(false)}>Photo</Link>
            <Link to="/video" css={mobileLinkStyles} onClick={() => setMobileMenuOpen(false)}>Video</Link>
            <Link to="/couchview" css={mobileLinkStyles} onClick={() => setMobileMenuOpen(false)}>CouchView</Link>
            {/*<Link to="/events" css={mobileLinkStyles} onClick={() => setMobileMenuOpen(false)}>Events</Link>*/}
            <Link to="/contact" css={mobileLinkStyles} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [draggingId, setDraggingId] = useState(null);
  const [positions, setPositions] = useState({});
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const images = useMemo(() => [
    { src: '/photos/cycle27.jpg', landscape: false },
    { src: '/photos/photoski.jpg', landscape: false },
    { src: '/photos/horizontal12.jpg', landscape: true },
    { src: '/photos/auto4.jpeg', landscape: false },
    { src: '/photos/life1.jpg', landscape: false },
    { src: '/photos/food1.jpg', landscape: false },
    { src: '/photos/horizontal15.jpg', landscape: true },
    { src: '/photos/cycle19.jpg', landscape: false },
    { src: '/photos/ski6.jpg', landscape: false },
    { src: '/photos/cycle36.jpg', landscape: false },
    { src: '/photos/auto2.jpeg', landscape: false },
    { src: '/photos/food5.jpg', landscape: false },
    { src: '/photos/cycle0.jpg', landscape: false },
    { src: '/photos/horizontal7.jpg', landscape: true },
    { src: '/photos/ski3.jpg', landscape: false },
    { src: '/photos/auto5.png', landscape: false },
    { src: '/photos/horizontal1.jpg', landscape: true },
    { src: '/photos/life21.jpg', landscape: false },
    { src: '/photos/auto1.jpeg', landscape: false },
    { src: '/photos/cycle37.jpg', landscape: false },
    { src: '/photos/photofood.jpg', landscape: false },
    { src: '/photos/cycle15.jpg', landscape: false },
    { src: '/photos/cover11.png', landscape: true },
    { src: '/photos/auto6.png', landscape: false },
    { src: '/photos/DSC06225.jpg', landscape: false },
  ], []);

  // Initialize random positions - smaller on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const newPositions = {};
    images.forEach((_, idx) => {
      if (isMobile) {
        newPositions[idx] = {
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 200) + 50
        };
      } else {
        newPositions[idx] = {
          x: Math.random() * (window.innerWidth - 300),
          y: Math.random() * (window.innerHeight - 300) + 100
        };
      }
    });
    setPositions(newPositions);
  }, [images]);

  useEffect(() => {
    const handleWindowResize = () => {
      setPositions(prev => {
        const updated = { ...prev };
        
        Object.keys(updated).forEach(idx => {
          const pos = updated[idx];
          
          // Constrain to window bounds
          pos.x = Math.max(0, Math.min(window.innerWidth - 100, pos.x));
          pos.y = Math.max(0, Math.min(window.innerHeight - 100, pos.y));
        });
        
        return updated;
      });
    };
    
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);


  // Mouse events (desktop)
  const handleMouseDown = (idx, e) => {
    setDraggingId(idx);
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Touch events (mobile)
  const handleTouchStart = (idx, e) => {
    e.preventDefault();
    setDraggingId(idx);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (draggingId === null) return;
    
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    
    // Calculate velocity (change in position)
    setVelocity({
      x: newX - (positions[draggingId]?.x || 0),
      y: newY - (positions[draggingId]?.y || 0)
    });
    
    requestAnimationFrame(() => {
      setPositions(prev => ({
        ...prev,
        [draggingId]: {
          x: newX,
          y: newY
        }
      }));
    });
  };

  const handleTouchMove = (e) => {
    if (draggingId === null) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const newX = touch.clientX - offset.x;
    const newY = touch.clientY - offset.y;
    
    // Calculate velocity (change in position)
    setVelocity({
      x: newX - (positions[draggingId]?.x || 0),
      y: newY - (positions[draggingId]?.y || 0)
    });
    
    requestAnimationFrame(() => {
      setPositions(prev => ({
        ...prev,
        [draggingId]: {
          x: newX,
          y: newY
        }
      }));
    });
  };

  // Apply momentum when released
  const handleMouseUp = () => {
    if (draggingId === null) return;
    
    const friction = 0.95; // How much it slows down (0-1), adjust for different feel
    let currentVelocity = { ...velocity };
    let currentPos = { ...positions[draggingId] };
    let id = draggingId;
    
    const applyMomentum = () => {
      currentVelocity.x *= friction;
      currentVelocity.y *= friction;
      
      currentPos.x += currentVelocity.x;
      currentPos.y += currentVelocity.y;
      
      // Bounce off walls
      const bounceElasticity = 0.6; // 0-1, higher = bouncier
      const padding = 10;
      
      if (currentPos.x < padding) {
        currentPos.x = padding;
        currentVelocity.x *= -bounceElasticity;
      } else if (currentPos.x > window.innerWidth - 100 - padding) {
        currentPos.x = window.innerWidth - 100 - padding;
        currentVelocity.x *= -bounceElasticity;
      }
      
      if (currentPos.y < padding) {
        currentPos.y = padding;
        currentVelocity.y *= -bounceElasticity;
      } else if (currentPos.y > window.innerHeight - 100 - padding) {
        currentPos.y = window.innerHeight - 100 - padding;
        currentVelocity.y *= -bounceElasticity;
      }
      
      setPositions(prev => ({
        ...prev,
        [id]: currentPos
      }));
      
      // Stop when velocity is tiny
      if (Math.abs(currentVelocity.x) > 0.5 || Math.abs(currentVelocity.y) > 0.5) {
        requestAnimationFrame(applyMomentum);
      }
    };
    
    applyMomentum();
    setDraggingId(null);
    setVelocity({ x: 0, y: 0 });
  };

  const sectionStyles = css`
    min-height: 100vh;
    height: 100vh;
    background: white;
    position: relative;
    overflow: hidden;
    touch-action: none;
  `;

  const containerStyles = css`
    position: relative;
    width: 100%;
    height: 100%;
  `;

  const draggableImageStyles = (idx) => css`
    position: absolute;
    transform: translate(${positions[idx]?.x ?? 0}px, ${positions[idx]?.y ?? 0}px);
    will-change: transform;
    cursor: ${draggingId === idx ? 'grabbing' : 'grab'};
    user-select: none;
    touch-action: none;
    transition: ${draggingId === idx ? 'none' : 'box-shadow 0.2s'};

    &:hover {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      width: 90px !important;
      height: ${positions[idx]?.landscape ? '62px' : '146px'} !important;
    }
  `;

  const imageStyles = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 4px;
    pointer-events: none;
  `;

  return (
    <section 
      css={sectionStyles}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div css={containerStyles}>
        {images.map((image, idx) => (
          <div
            key={idx}
            css={draggableImageStyles(idx)}
            style={{
              width: image.landscape ? '300px' : '200px',
              height: image.landscape ? '169px' : '266px',
            }}
            onMouseDown={(e) => handleMouseDown(idx, e)}
            onTouchStart={(e) => handleTouchStart(idx, e)}
          >
            <img
              src={image.src}
              alt={`Portfolio ${idx}`}
              css={imageStyles}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Section (links under title)
const Contact = () => {
  const sectionStyles = css`
    padding: 8rem 1rem 3rem;
    background: white;

    @media (min-width: 768px) {
      padding: 10rem 1.5rem 5rem;
    }

    @media (min-width: 1024px) {
      padding: 10rem 1.5rem 8rem;
    }
  `;

  const containerStyles = css`
    max-width: 1152px;
    margin: 0 auto;
  `;

  const headingStyles = css`
    font-size: 1.75rem;
    font-weight: bold;
    color: black;
    margin-bottom: 1.5rem;
    text-align: center;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 1024px) {
      font-size: 2.5rem;
    }
  `;

  const linksContainerStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;

    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: center;
      gap: 2rem;
    }

    @media (min-width: 768px) {
      margin-bottom: 4rem;
    }
  `;

  const linkStyles = css`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: black;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #666;
    }

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.125rem;
    }
  `;

  const gridStyles = css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }

    @media (min-width: 1024px) {
      gap: 4rem;
    }
  `;

  const imageStyles = css`
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
  `;

  const paragraphStyles = css`
    color: black;
    font-size: 0.9rem;
    line-height: 1.625;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.125rem;
    }
  `;

  return (
    <section css={sectionStyles}>
      <div css={containerStyles}>
        <FadeIn>
          <h2 css={headingStyles}>GET IN TOUCH</h2>
          
          {/* Contact Links - directly under title */}
          <div css={linksContainerStyles}>
            <a 
              href="mailto:jamesphotographyco@gmail.com"
              css={linkStyles}
            >
              <Mail size={20} />
              <span>jamesphotographyco@gmail.com</span>
            </a>
            <a 
              href="https://instagram.com/jamesphotographyco"
              target="_blank"
              rel="noopener noreferrer"
              css={linkStyles}
            >
              <Instagram size={20} />
              <span>@jamesphotographyco</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div css={gridStyles}>
            {/* Left: Image */}
            <div>
              <img 
                src='/photos/photoJames.jpg'
                alt="James Lawrence"
                css={imageStyles}
              />
            </div>

            {/* Right: About Text */}
            <div>
              <p css={paragraphStyles}>
                Hi! I'm a passionate producer, photographer, and videographer.
              </p>
              <p css={paragraphStyles}>
                I'd love the opportunity to create. Whether it's lifestyle, adventure, products, events, or something new. Feel free to reach out, I'd be happy to chat!
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const footerStyles = css`
    border-top: 1px solid #e5e7eb;
    padding: 1.5rem 1rem;
    background: white;

    @media (min-width: 768px) {
      padding: 2rem 1.5rem;
    }

    @media (min-width: 1024px) {
      padding: 3rem 1.5rem;
    }
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
  `;

  const contentStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      gap: 1rem;
    }
  `;

  const logoStyles = css`
    font-size: 1.125rem;
    font-weight: bold;
    color: black;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  `;

  const copyrightStyles = css`
    color: #666;
    font-size: 0.75rem;

    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  `;

  return (
    <footer css={footerStyles}>
      <div css={containerStyles}>
        <div css={contentStyles}>
          <div>
            <span css={logoStyles}>JAMES LAWRENCE</span>
          </div>
          <p css={copyrightStyles}>
            2026 James Photography Co.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Portfolio Grid Component (reusable)
const PortfolioGrid = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState([]);

  const categories = [
    {
      title: 'CYCLE',
      id: 'cycle',
      images: [
        '/photos/cycle15.jpg',
        '/photos/cycle19.jpg',
        '/photos/cycle27.jpg',
        '/photos/cycle0.jpg',
        '/photos/cycle31.jpg',
        '/photos/cycle18.jpg',
        '/photos/cycle33.jpg',
        '/photos/cycle25.jpg',
        '/photos/cycle7.jpg',
        '/photos/cycle17.jpg',
        '/photos/cycle32.jpg',
        '/photos/cycle21.jpg',
        '/photos/cycle24.jpg',
        '/photos/cycle9.jpg',
        '/photos/cycle1.jpg',
        '/photos/cycle2.jpg',
        '/photos/cycle3.jpg',
        '/photos/cycle5.jpg',
        '/photos/cycle8.jpg',
        '/photos/cycle35.jpg',
        '/photos/cycle29.jpg',
        '/photos/cycle10.jpg',
        '/photos/cycle26.jpg',
        '/photos/cycle12.jpg',
        '/photos/cycle13.jpg',
        '/photos/cycle4.jpg'
      ]
    },
    {
      title: 'SKI',
      id: 'ski',
      images: [
        '/photos/ski6.jpg',
        '/photos/ski3.jpg',
        '/photos/ski7.jpg',
        '/photos/ski15.jpg',
        '/photos/photoski.jpg',
        '/photos/ski1.jpg',
        '/photos/ski11.jpg',
        '/photos/ski2.jpg',
        '/photos/ski20.jpg',
        '/photos/ski4.jpg',
        '/photos/ski12.jpg',
        '/photos/ski5.jpg',
        '/photos/ski8.jpg',
        '/photos/ski9.jpg'
      ]
    },
    {
      title: 'AUTO',
      id: 'auto',
      images: [
        '/photos/auto2.jpeg',
        '/photos/auto1.jpeg',
        '/photos/auto4.jpeg',
        '/photos/auto5.jpg',
        '/photos/auto6.jpg',
        '/photos/auto7.jpg',
        '/photos/auto8.jpg',
        '/photos/auto9.jpg'
      ]
    },
    {
      title: 'LIFESTYLE',
      id: 'lifestyle',
      images: [
        '/photos/life16.jpg',
        '/photos/life3.jpg',
        '/photos/life4.jpg',
        '/photos/life19.jpg',
        '/photos/life20.jpg',
        '/photos/life21.jpg',
        '/photos/life18.jpg',
        '/photos/life6.jpg',
        '/photos/life15.jpg',
        '/photos/life12.jpg',
        '/photos/life1.jpg',
        '/photos/life11.jpg',
        '/photos/life10.jpg',
      ]
    },
    {
      title: 'CULINARY',
      id: 'culinary',
      images: [
        '/photos/food1.jpg',
        '/photos/food5.jpg',
        '/photos/food3.jpg',
        '/photos/food2.jpg',
        '/photos/food4.jpg',
        '/photos/food6.jpg',
      ]
    }
  ];

  const openLightbox = (images, index) => {
    setCurrentCategory(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const sectionStyles = css`
    padding: 3rem 1rem;
    padding-top: 5rem;
    background: white;
    min-height: 100vh;

    @media (min-width: 768px) {
      padding: 5rem 1.5rem;
      padding-top: 6rem;
    }

    @media (min-width: 1024px) {
      padding: 8rem 1.5rem;
      padding-top: 6rem;
    }
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
  `;

  const headingStyles = css`
  font-size: 1.75rem;
  font-weight: bold;
  color: Black;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: -0.025em;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
  }
`;

  const categoryStyles = css`
    margin-bottom: 3rem;
    padding-top: 5rem;
    margin-top: -5rem;

    @media (min-width: 768px) {
      margin-bottom: 4rem;
      padding-top: 6rem;
      margin-top: -6rem;
    }

    @media (min-width: 1024px) {
      margin-bottom: 6rem;
    }
  `;

  const categoryTitleStyles = css`
    font-size: 1.25rem;
    font-weight: bold;
    color: grey;
    margin-bottom: 1rem;
    letter-spacing: 0.025em;

    @media (min-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.875rem;
      margin-bottom: 2rem;
    }
  `;

  const gridStyles = css`
    display: flex;
    gap: 0.25rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #B91C1C #f1f1f1;
    padding-bottom: 1rem;

    &::-webkit-scrollbar {
      height: 10px;
      -webkit-appearance: none;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #B91C1C;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #991b1b;
    }

    @media (min-width: 640px) {
      gap: 0.75rem;
    }

    @media (min-width: 768px) {
      gap: 1.5rem;
    }
  `;

  const imageContainerStyles = css`
    flex: 0 0 calc(50% - 0.125rem);
    aspect-ratio: 4/5;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    scroll-snap-align: start;

    @media (min-width: 640px) {
      flex: 0 0 calc(33.333% - 0.5rem);
    }

    @media (min-width: 768px) {
      flex: 0 0 calc(33.333% - 1rem);
    }

    &:hover::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      transition: opacity 0.3s;
    }
  `;

  const imageStyles = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s;

    &:hover {
      transform: scale(1.05);
    }
  `;

  return (
    <section css={sectionStyles}>
      <div css={containerStyles}>
        <FadeIn>
          <h2 css={headingStyles}>PHOTO</h2>
        </FadeIn>
        {categories.map((category, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div css={categoryStyles} id={category.id}>
              <h3 css={categoryTitleStyles}>{category.title}</h3>
              <div css={gridStyles}>
                {category.images.map((image, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    css={imageContainerStyles}
                    onClick={() => openLightbox(category.images, imgIdx)}
                  >
                    <img 
                      src={image}
                      alt={`${category.title} ${imgIdx + 1}`}
                      css={imageStyles}
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={currentCategory.map(src => ({ src }))}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" }
        }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
};

const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'white', color: 'black' }}>
      <Navigation />
      <Hero />
      <div css={css`
        @media (max-width: 768px) {
          display: none;
        }
      `}>
      </div>
    </div>
  );
};

// PHOTOS PAGE
const PhotosPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: 'white' }}>
      <Navigation />
      <PortfolioGrid />
      <Footer />
    </div>
  );
};

// VIDEO PAGE
const VideoPage = () => {
  const sectionStyles = css`
    padding: 3rem 1rem;
    padding-top: 5rem;
    background: white;
    min-height: 100vh;

    @media (min-width: 768px) {
      padding: 5rem 1.5rem;
      padding-top: 6rem;
    }

    @media (min-width: 1024px) {
      padding: 8rem 1.5rem;
      padding-top: 6rem;
    }
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
  `;

  const headingStyles = css`
    font-size: 2rem;
    font-weight: bold;
    color: black;
    margin-bottom: 1rem;
    text-align: center;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 1280px) {
      font-size: 3.75rem;
    }
  `;

  const videoContainerStyles = css`
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    margin: 0 auto;
    background: black;

    @media (min-width: 768px) {
      padding-bottom: 42.1875%;
      max-width: 75%;
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <Navigation />
      <section css={sectionStyles}>
        <div css={containerStyles}>
          <FadeIn>
            <h2 css={headingStyles}>VIDEO</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div css={videoContainerStyles}>
              <iframe 
                src="https://player.vimeo.com/video/1051705822?badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Showreel"
              />
            </div>
          </FadeIn>
        </div>
      </section>
      <Footer />
    </div>
  );
};

// COUCHVIEW PAGE
const CouchViewPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  // Organize photos by category
  const sections = [
    {
      title: 'Apparel',
      description: 'Couchview collection outerwear.',
      thumbnail: '/photos/Couchview/DSC03065.jpg',
      images: [
        '/photos/Couchview/DSC03065.jpg',
        '/photos/Couchview/DSC06254.jpg',
        '/photos/Couchview/DSC06410-2.jpg'
      ]
    },
    {
      title: 'Lifestyle',
      description: 'Moments around the brand.',
      thumbnail: '/photos/Couchview/DSC03399.jpg',
      images: [
        '/photos/Couchview/DSC03399.jpg',
        '/photos/Couchview/DSC07097.jpg',
        '/photos/Couchview/DSC06263.jpg'
      ]
    },
    {
      title: 'Events',
      description: 'Everything from trivia night to couch on cobbles.',
      thumbnail: '/photos/Couchview/DSC04321.jpg',
      images: [
        '/photos/Couchview/DSC04321.jpg',
        '/photos/Couchview/DSC04373.jpg',
        '/photos/Couchview/DSC00041.jpg'
      ]
    },
    {
      title: 'Campaign',
      description: 'Showcasing more off the couch.',
      thumbnail: '/photos/Couchview/DSC09339.jpg',
      images: [
        '/photos/Couchview/DSC09339.jpg',
        '/photos/Couchview/DSC09555.jpg',
        '/photos/Couchview/DSC03952.jpg'
      ]
    }
  ];

  const openGallery = (images, index = 0) => {
    setCurrentImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const pageStyles = css`
    min-height: 100vh;
    background: white;
  `;

  const heroStyles = css`
    padding: 6rem 1rem 2rem;
    text-align: center;
    background: white;

    @media (min-width: 768px) {
      padding: 6rem 1.5rem 3rem;
    }
  `;

  const heroTitleStyles = css`
    font-size: 3rem;
    color: black;
    font-weight: bold;
    margin-bottom: 1rem;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 4rem;
    }

    @media (min-width: 1024px) {
      font-size: 5rem;
    }
  `;

  const heroSubtitleStyles = css`
    font-size: 1.125rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 1rem;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  `;

  const heroLinksStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 1rem;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  `;

  const linkStyles = css`
    color: #666;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &:hover {
      color: #B91C1C;
    }
  `;

  const separatorStyles = css`
    color: #d1d5db;
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1rem;

    @media (min-width: 768px) {
      padding: 3rem 1.5rem;
    }

    @media (min-width: 1024px) {
      padding: 3rem 1.5rem;
    }
  `;

  const gridStyles = css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }

    @media (min-width: 1024px) {
      gap: 3rem;
    }
  `;

  const cardStyles = css`
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
  `;

  const imageContainerStyles = css`
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;

    @media (min-width: 768px) {
      height: 350px;
    }

    @media (min-width: 1024px) {
      height: 400px;
    }
  `;

  const cardImageStyles = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    ${cardStyles}:hover & {
      transform: scale(1.05);
    }
  `;

  const cardContentStyles = css`
    padding: 1.5rem;

    @media (min-width: 768px) {
      padding: 2rem;
    }
  `;

  const cardTitleStyles = css`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  `;

  const cardDescriptionStyles = css`
    font-size: 0.95rem;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  `;

  const viewGalleryStyles = css`
    font-size: 0.875rem;
    color: #B91C1C;
    font-weight: 600;
    letter-spacing: 0.05em;
    transition: color 0.3s;

    ${cardStyles}:hover & {
      color: #991b1b;
    }
  `;

  return (
    <div css={pageStyles}>
      <Navigation />
      
      {/* Hero Section */}
      <div css={heroStyles}>
        <FadeIn>
          <h1 css={heroTitleStyles}>CouchView</h1>
          <p css={heroSubtitleStyles}>
            Visual storytelling of a fan-first cycling brand.
          </p>
          <div css={heroLinksStyles}>
            <a 
              href="https://couchview.cc/" 
              target="_blank" 
              rel="noopener noreferrer"
              css={linkStyles}
            >
              couchview.cc
            </a>
            <span css={separatorStyles}>•</span>
            <a 
              href="https://www.instagram.com/couchview.cc/" 
              target="_blank" 
              rel="noopener noreferrer"
              css={linkStyles}
            >
              <Instagram size={20} />
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Card Grid */}
      <div css={containerStyles}>
        <div css={gridStyles}>
          {sections.map((section, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div 
                css={cardStyles}
                onClick={() => openGallery(section.images)}
              >
                <div css={imageContainerStyles}>
                  <img
                    src={section.thumbnail}
                    alt={section.title}
                    css={cardImageStyles}
                  />
                </div>
                <div css={cardContentStyles}>
                  <h2 css={cardTitleStyles}>{section.title}</h2>
                  <p css={cardDescriptionStyles}>{section.description}</p>
                  <span css={viewGalleryStyles}>VIEW GALLERY →</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={currentImages.map(src => ({ src }))}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" }
        }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
      />

      <Footer />
    </div>
  );
};


/*// EVENTS PAGE
const EventsPage = () => {
  const events = [
    {
      id: 'sea-otter-classic',
      name: 'Sea Otter Classic',
      date: 'April 2025',
      location: 'Monterey, CA',
      thumbnail: '/photos/events/sea-otter/seaotter35.jpg',
      photoCount: 127
    }
  ];

  const pageStyles = css`
    min-height: 100vh;
    background: white;
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 3rem 1rem;
    padding-top: 8rem;

    @media (min-width: 768px) {
      padding: 5rem 1.5rem;
      padding-top: 10rem;
    }
  `;

  const headingStyles = css`
    font-size: 2rem;
    font-weight: bold;
    color: black;
    margin-bottom: 1rem;
    text-align: center;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
  `;

  const descriptionStyles = css`
    text-align: center;
    color: #666;
    margin-bottom: 3rem;
    font-size: 1rem;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  `;

  const gridStyles = css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
    }
  `;

  const cardStyles = css`
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    color: inherit;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(185, 28, 28, 0.3);
    }
  `;

  const imageContainerStyles = css`
    width: 100%;
    height: 350px;
    overflow: hidden;
    background: #e5e7eb;
    position: relative;

    @media (min-width: 768px) {
      height: 400px;
    }
  `;

  const cardImageStyles = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    ${cardStyles}:hover & {
      transform: scale(1.05);
    }
  `;

  const cardTextOverlayStyles = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  `;

  const cardTitleStyles = css`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    letter-spacing: -0.025em;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  `;

  const cardInfoStyles = css`
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.25rem;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  `;

  const photoCountStyles = css`
    font-size: 0.875rem;
    color: #B91C1C;
    font-weight: 600;
    margin-top: 0.5rem;
    background: rgba(255, 255, 255, 0.9);
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
  `;

  return (
    <div css={pageStyles}>
      <Navigation />
      <div css={containerStyles}>
        <FadeIn>
          <h1 css={headingStyles}>Event Photos</h1>
          <p css={descriptionStyles}>
            Browse and download photos from recent events
          </p>
        </FadeIn>

        <div css={gridStyles}>
          {events.map((event, idx) => (
            <FadeIn key={event.id} delay={idx * 0.1}>
              <Link to={`/events/${event.id}`} css={cardStyles}>
                <div css={imageContainerStyles}>
                  <img
                    src={event.thumbnail}
                    alt={event.name}
                    css={cardImageStyles}
                  />
                  <div css={cardTextOverlayStyles}>
                    <h2 css={cardTitleStyles}>{event.name}</h2>
                    <p css={cardInfoStyles}>{event.date}</p>
                    <p css={cardInfoStyles}>{event.location}</p>
                    <span css={photoCountStyles}>{event.photoCount} photos</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};*/

// CONTACT PAGE
const ContactPage = () => {
  const pageStyles = css`
    min-height: 100vh;
    background: black;
  `;

  return (
    <div css={pageStyles}>
      <Navigation />
      <Contact />
      <Footer />
    </div>
  );
};

/*// EVENT GALLERY PAGE
const EventGalleryPage = () => {
  const { eventId } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 24; // Nice even number for grid

  // ADD THIS FUNCTION HERE:
  const handleDownload = async (photo) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && navigator.share) {
      try {
        // Fetch the image as a blob
        const response = await fetch(photo.src);
        const blob = await response.blob();
        const file = new File([blob], `${photo.title}.jpg`, { type: 'image/jpeg' });
        
        // Use native share sheet
        await navigator.share({
          files: [file],
          title: photo.title,
        });
      } catch (error) {
        console.log('Share failed, opening in new tab:', error);
        // Fallback to opening in new tab
        window.open(photo.src, '_blank');
      }
    } else {
      // Desktop download
      const link = document.createElement('a');
      link.href = photo.src;
      link.download = photo.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Event data - in real app this would come from a database
  const eventData = {
    'sea-otter-classic': {
      name: 'Sea Otter Classic',
      date: 'April 2025',
      location: 'Monterey, CA',
      photos: Array.from({ length: 127 }, (_, i) => ({
        id: `seaotter${String(i + 1).padStart(4, '0')}`,
        src: `/photos/events/sea-otter/seaotter${i + 1}.jpg`,
        title: `seaotter${String(i + 1).padStart(4, '0')}`
      }))
    }
  };

  const event = eventData[eventId];

  if (!event) {
    return (
      <div>
        <Navigation />
        <div css={css`padding: 10rem 1rem; text-align: center;`}>
          <h1>Event not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(event.photos.length / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = startIndex + photosPerPage;
  const currentPhotos = event.photos.slice(startIndex, endIndex);

  // Scroll to top when page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageStyles = css`
    min-height: 100vh;
    background: white;
  `;

  const headerStyles = css`
    background: white;
    padding: 6rem 1rem 2rem;
    text-align: center;
    border-bottom: 1px solid #333;

    @media (min-width: 768px) {
      padding: 8rem 1.5rem 3rem;
    }
  `;

  const titleStyles = css`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: white;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  `;

  const subtitleStyles = css`
    font-size: 1rem;
    color: #999;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  `;

  const backButtonStyles = css`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #B91C1C;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    transition: color 0.3s;

    &:hover {
      color: #991b1b;
    }
  `;

  const gridContainerStyles = css`
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem 0.5rem;

    @media (min-width: 768px) {
      padding: 3rem 1rem;
    }
  `;

  const gridStyles = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(6, 1fr);
    }
  `;

  const imageContainerStyles = css`
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    cursor: pointer;
    background: #1a1a1a;

    &:hover::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(185, 28, 28, 0.2);
    }
  `;

  const imageStyles = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${imageContainerStyles}:hover & {
      transform: scale(1.05);
    }
  `;

  const imageTitleStyles = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: white;
    padding: 0.5rem;
    font-size: 0.65rem;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s;

    ${imageContainerStyles}:hover & {
      opacity: 1;
    }

    @media (min-width: 768px) {
      font-size: 0.75rem;
    }
  `;

  const paginationContainerStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem 1rem 3rem;
    flex-wrap: wrap;

    @media (min-width: 768px) {
      gap: 0.75rem;
      padding: 3rem 1rem 4rem;
    }
  `;

  const pageButtonStyles = (isActive) => css`
    background: ${isActive ? '#B91C1C' : '#333'};
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    transition: background 0.3s;
    min-width: 40px;

    &:hover {
      background: ${isActive ? '#991b1b' : '#444'};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (min-width: 768px) {
      padding: 0.625rem 1rem;
      font-size: 0.95rem;
    }
  `;

  const pageInfoStyles = css`
    color: #999;
    font-size: 0.875rem;
    padding: 0 0.5rem;

    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  `;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Show max 5 page numbers at a time
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis if needed
      if (start > 2) pages.push('...');
      
      // Add pages around current
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) pages.push('...');
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div css={pageStyles}>
      <Navigation />
      
      <div css={headerStyles}>
        <Link to="/events" css={backButtonStyles}>
          ← Back to Events
        </Link>
        <h1 css={titleStyles}>{event.name}</h1>
        <p css={subtitleStyles}>
          {event.date} • {event.location} • {event.photos.length} photos
        </p>
      </div>

      <div css={gridContainerStyles}>
        <div css={gridStyles}>
          {currentPhotos.map((photo, index) => (
            <div
              key={photo.id}
              css={imageContainerStyles}
              onClick={() => {
                setLightboxIndex(startIndex + index);
                setLightboxOpen(true);
              }}
            >
              <img
                src={photo.src}
                alt={photo.title}
                css={imageStyles}
                loading="lazy"
              />
              <div css={imageTitleStyles}>{photo.title}</div>
            </div>
          ))}
        </div>

        <div css={paginationContainerStyles}>
          <button
            css={pageButtonStyles(false)}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          {getPageNumbers().map((page, idx) => (
            page === '...' ? (
              <span key={`ellipsis-${idx}`} css={pageInfoStyles}>...</span>
            ) : (
              <button
                key={page}
                css={pageButtonStyles(currentPage === page)}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          ))}

          <button
            css={pageButtonStyles(false)}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={event.photos.map(photo => ({ 
          src: photo.src,
          title: photo.title,
          download: photo.src
        }))}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" }
        }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        plugins={[Download]}
        download={{
          download: async ({ slide }) => {
            const photo = event.photos.find(p => p.src === slide.src);
            await handleDownload(photo);
          }
        }}
      />

      <Footer />
    </div>
  );
};
*/

// Main App with Router
export default function PhotographyWebsite() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/couchview" element={<CouchViewPage />} />
        {/*<Route path="/events" element={<EventsPage />} />*/}
        {/*<Route path="/events/:eventId" element={<EventGalleryPage />} />*/}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}