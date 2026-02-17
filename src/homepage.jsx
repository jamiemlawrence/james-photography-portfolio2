/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { Instagram, Mail, Menu, X } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Lightbox from "yet-another-react-lightbox";
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
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
      color: #666;
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
    color: #000;

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

    @media (min-width: 768px) {
      display: none;
    }
  `;

  const mobileMenuStyles = css`
    background: white;
    border-top: 1px solid #e5e7eb;
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

  return (
    <nav css={navStyles}>
      <div css={navContainerStyles}>
        <div css={navContentStyles}>
          {/* Left Menu */}
            <div css={menuStyles}>
              <Link to="/" css={linkStyles} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
              <a href="/#portfolio" css={linkStyles}>Photo</a>
              <a href="/#video" css={linkStyles}>Video</a>
              <Link to="/events" css={linkStyles}>Events</Link>
            </div>

            {/* Center Logo */}
            <Link to="/" css={logoStyles} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <h1>JAMES LAWRENCE</h1>
            </Link>

          {/* Right Menu */}
          <div css={menuStyles}>
            <a href="/#contact" css={linkStyles}>Contact</a>
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
            <Link to="/" css={linkStyles} onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</Link>
            <a href="/#portfolio" css={linkStyles} onClick={() => setMobileMenuOpen(false)}>Photo</a>
            <a href="/#video" css={linkStyles} onClick={() => setMobileMenuOpen(false)}>Video</a>
            <Link to="/events" css={linkStyles} onClick={() => setMobileMenuOpen(false)}>Events</Link>
            <a href="/#contact" css={linkStyles} onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section with Magazine Layout
const Hero = () => {
  const portfolioItems = [
    {
      image: '/photos/photo1.jpg',
      title: 'CYCLE',
      subtitle: 'road & dirt'
    },
    {
      image: '/photos/auto4.jpeg',
      title: 'AUTO',
      subtitle: 'racing'
    },
    {
      image: '/photos/photoski.jpg',
      title: 'SKI',
      subtitle: 'snow'
    },
    {
      image: '/photos/photo3.jpg',
      title: 'LIFESTYLE',
      subtitle: 'portrait'
    },
    {
      image: '/photos/photofood.jpg',
      title: 'CULINARY',
      subtitle: 'eats'
    }
  ];

  const sectionStyles = css`
    background: #f9fafb;
    padding-top: 4rem;

    @media (min-width: 768px) {
      padding-top: 5rem;
    }
  `;

  const heroContainerStyles = css`
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;

    @media (min-width: 768px) {
      padding: 0;
    }
  `;

  const heroTextContainerStyles = css`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 30;
    pointer-events: none;
  `;

  const heroTextStyles = css`
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 1;
    text-align: center;
    padding: 0 1rem;
    color: #B91C1C;

    @media (min-width: 640px) {
      font-size: 4rem;
    }

    @media (min-width: 768px) {
      font-size: 5rem;
    }

    @media (min-width: 1024px) {
      font-size: 7rem;
    }

    @media (min-width: 1280px) {
      font-size: 10rem;
    }
  `;

  const cardsContainerStyles = css`
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;

    @media (min-width: 768px) {
      padding: 2rem;
    }
  `;

  const topRowStyles = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    gap: 1rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
      flex-wrap: nowrap;
      justify-content: space-around;
      margin-bottom: 12rem;
    }
  `;

  const bottomRowStyles = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 1000px;
    margin: 0 auto;

    @media (min-width: 768px) {
      flex-wrap: nowrap;
      justify-content: space-around;
    }
  `;

  const cardStyles = css`
    cursor: pointer;
    flex: 0 0 auto;
    width: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 640px) {
      width: 150px;
    }

    @media (min-width: 768px) {
      width: 180px;
      flex-direction: row-reverse;
      gap: 0.75rem;
    }

    @media (min-width: 1024px) {
      width: 200px;
    }
  `;

  const imageContainerStyles = css`
    position: relative;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    flex-shrink: 0;
    width: 100%;
  `;

  const imageStyles = css`
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    transition: transform 0.7s;

    ${cardStyles}:hover & {
      transform: scale(1.05);
    }
  `;

  const overlayStyles = css`
    position: absolute;
    inset: 0;
    background: black;
    opacity: 0;
    transition: opacity 0.3s;

    ${cardStyles}:hover & {
      opacity: 0.2;
    }
  `;

  const cardTextStyles = css`
    text-align: center;
    flex-shrink: 0;

    @media (min-width: 768px) {
      text-align: left;
    }
  `;

  const cardTitleStyles = css`
    font-size: 0.625rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;

    @media (min-width: 640px) {
      font-size: 0.75rem;
    }

    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  `;

  const cardSubtitleStyles = css`
    font-size: 0.625rem;
    color: #666;
    letter-spacing: 0.025em;

    @media (min-width: 640px) {
      font-size: 0.75rem;
    }
  `;

  const taglineContainerStyles = css`
    position: relative;
    z-index: 30;
    padding: 2rem 1rem 3rem;

    @media (min-width: 768px) {
      padding: 0 1.5rem 5rem;
    }
  `;

  const taglineInnerStyles = css`
    max-width: 1024px;
    margin: 0 auto;
    text-align: center;
  `;

  const taglineTextStyles = css`
    font-size: 0.875rem;
    letter-spacing: 0.025em;
    line-height: 1.625;
    font-weight: 500;

    @media (min-width: 640px) {
      font-size: 1rem;
    }

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.25rem;
    }
  `;

  return (
    <section css={sectionStyles} id="home">
      {/* Hero Container */}
      <div css={heroContainerStyles}>
        {/* Main Hero Text - Centered */}
        <div css={heroTextContainerStyles}>
          <h1 css={heroTextStyles}>
            JAMES<br />LAWRENCE
          </h1>
        </div>

        {/* Portfolio Cards - Staggered Layout */}
        <div css={cardsContainerStyles}>
          {/* Top Row - 3 images */}
          <div css={topRowStyles}>
            {portfolioItems.slice(0, 3).map((item, index) => (
              <a 
                key={index} 
                href={`#${item.title.toLowerCase().replace(' ', '-')}`}
                css={css`text-decoration: none; color: inherit;`}
              >
                <div css={cardStyles}>
                  <div css={imageContainerStyles}>
                    <img 
                      src={item.image}
                      alt={item.title}
                      css={imageStyles}
                    />
                    <div css={overlayStyles}></div>
                  </div>
                  <div css={cardTextStyles}>
                    <h3 css={cardTitleStyles}>{item.title}</h3>
                    <p css={cardSubtitleStyles}>{item.subtitle}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Row - 2 images */}
          <div css={bottomRowStyles}>
            {portfolioItems.slice(3, 5).map((item, index) => (
              <a 
                key={index} 
                href={`#${item.title.toLowerCase().replace(' ', '-')}`}
                css={css`text-decoration: none; color: inherit;`}
              >
                <div css={cardStyles}>
                  <div css={imageContainerStyles}>
                    <img 
                      src={item.image}
                      alt={item.title}
                      css={imageStyles}
                    />
                    <div css={overlayStyles}></div>
                  </div>
                  <div css={cardTextStyles}>
                    <h3 css={cardTitleStyles}>{item.title}</h3>
                    <p css={cardSubtitleStyles}>{item.subtitle}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div css={taglineContainerStyles}>
        <div css={taglineInnerStyles}>
          <p css={taglineTextStyles}>
            I CAPTURE NATURAL MOMENTS THROUGH CLEAN<br />
            CINEMATIC PHOTOGRAPHY AND VIDEOGRAPHY<br />
            DOCUMENTING LIFE IN MOTION.
          </p>

          {/* Brands Banner */}
          <div css={css`
            margin-top: 2rem;

            @media (min-width: 768px) {
              display: block;
              margin-top: 3rem;
            }
          `}>
            <img 
              src="/photos/Brands.png"
              alt="Brand Logos"
              css={css`
                max-width: 100%;
                height: auto;
                margin: 0 auto;
                display: block;
              `}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Grid Section
const PortfolioGrid = () => {

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [scrollIndicators, setScrollIndicators] = useState({});

  const handleScroll = (categoryId, e) => {
    const scrollLeft = e.target.scrollLeft;
    if (scrollLeft > 10 && scrollIndicators[categoryId] !== 'hiding') {
      setScrollIndicators(prev => ({ ...prev, [categoryId]: 'hiding' }));
      // After animation completes, fully hide it
      setTimeout(() => {
        setScrollIndicators(prev => ({ ...prev, [categoryId]: false }));
      }, 500);
    }
  };

  const categories = [
    {
      title: 'CYCLE',
      id: 'cycle',
      images: [
        '/photos/cycle0.jpg',
        '/photos/cycle7.jpg',
        '/photos/cycle9.jpg',
        '/photos/cycle1.jpg',
        '/photos/cycle2.jpg',
        '/photos/cycle3.jpg',
        '/photos/cycle4.jpg',
        '/photos/cycle5.jpg',
        '/photos/cycle6.jpg',
        '/photos/cycle8.jpg',
        '/photos/cycle10.jpg',
        '/photos/cycle12.jpg',
        '/photos/cycle13.jpg'
      ]
    },
    {
      title: 'AUTO',
      id: 'auto',
      images: [
        '/photos/auto2.jpeg',
        '/photos/auto1.jpeg',
        '/photos/auto4.jpeg'
      ]
    },
    {
      title: 'SKI',
      id: 'ski',
      images: [
        '/photos/ski6.jpg',
        '/photos/ski3.jpg',
        '/photos/ski7.jpg',
        '/photos/photoski.jpg',
        '/photos/ski1.jpg',
        '/photos/ski2.jpg',
        '/photos/ski4.jpg',
        '/photos/ski5.jpg',
        '/photos/ski8.jpg',
        '/photos/ski9.jpg'
      ]
    },
    {
      title: 'LIFESTYLE',
      id: 'lifestyle',
      images: [
        '/photos/life1.jpg',
        '/photos/life11.jpg',
        '/photos/life10.jpg',
        '/photos/life2.jpg',
        '/photos/life3.jpg',
        '/photos/life4.jpg',
        '/photos/life5.jpg',
        '/photos/life6.jpg',
        '/photos/life12.jpg',
        '/photos/life13.jpg',
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
    background: #f9fafb;

    @media (min-width: 768px) {
      padding: 5rem 1.5rem;
    }

    @media (min-width: 1024px) {
      padding: 8rem 1.5rem;
    }
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
  `;

  const headingStyles = css`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
      margin-bottom: 5rem;
    }

    @media (min-width: 1280px) {
      font-size: 3.75rem;
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

  const gridWrapperStyles = css`
    position: relative;
  `;

  const scrollIndicatorStyles = css`
  position: absolute;
  right: 1rem;
  bottom: -2.5rem;
  color: #B91C1C;
  pointer-events: none;
  z-index: 10;
  transition: transform 0.5s ease, opacity 0.5s ease;
  transform-origin: left center;
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
    <section css={sectionStyles} id="portfolio">
      <div css={containerStyles}>
        <FadeIn>
          <h2 css={headingStyles}>PHOTO</h2>
        </FadeIn>
        {categories.map((category, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div css={categoryStyles} id={category.id}>
              <h3 css={categoryTitleStyles}>{category.title}</h3>
              <div css={gridWrapperStyles}>
                {/* Scroll Indicator - only shows on mobile and fades after scroll */}
                {scrollIndicators[category.id] !== false && (
                  <div 
                    css={css`
                      ${scrollIndicatorStyles}
                      ${scrollIndicators[category.id] === 'hiding' && css`
                        transform: scaleX(2) translateX(20px);
                        opacity: 0;
                      `}
                    `}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="15 9 19 12 15 15"></polyline>
                    </svg>
                  </div>
                )}
                <div 
                  css={gridStyles}
                  onScroll={(e) => handleScroll(category.id, e)}
                >
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

// Video Section
const Video = () => {
  const sectionStyles = css`
    padding: 1rem 1rem 3rem;
    padding-top: 6rem;
    margin-top: -5rem;
    background: #f9fafb;

    @media (min-width: 768px) {
      padding: 1rem 1.5rem 5rem;
      padding-top: 9rem;
      margin-top: -6rem;
    }

    @media (min-width: 1024px) {
      padding: 1rem 1.5rem 8rem;
      padding-top: 10rem;
    }
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
  `;

  const headingStyles = css`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
      margin-bottom: 5rem;
    }

    @media (min-width: 1280px) {
      font-size: 3.75rem;
    }
  `;

  const videoContainerStyles = css`
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio - full width on mobile */
    height: 0;
    overflow: hidden;
    max-width: 100%;
    margin: 0 auto;
    background: #000;

    @media (min-width: 768px) {
      padding-bottom: 42.1875%; /* 16:9 at 75% width */
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
    <section css={sectionStyles} id="video">
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
  );
};

// About Me Section
const AboutMe = () => {
  const sectionStyles = css`
    padding: 2rem 1rem 3rem;
    background: white;

    @media (min-width: 768px) {
      padding: 2rem 1.5rem 5rem;
    }

    @media (min-width: 1024px) {
      padding: 2rem 1.5rem 8rem;
    }
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
  `;

  const headingStyles = css`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
      margin-bottom: 5rem;
    }

    @media (min-width: 1280px) {
      font-size: 3.75rem;
    }
  `;

  const gridStyles = css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;
    max-width: 1152px;
    margin: 0 auto;

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
    color: #374151;
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
    <section css={sectionStyles} id="about-me">
      <div css={containerStyles}>
        <FadeIn>
          <h2 css={headingStyles}>ABOUT ME</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div css={gridStyles}>
            <div>
              <img 
                src='/photos/photome.jpg'
                alt="About Me"
                css={imageStyles}
              />
            </div>
            <div>
              <p css={paragraphStyles}>
                Hi! I'm a passionate photographer and videographer in California. My camera allows me to capture all of life's adventures.
              </p>
              <p css={paragraphStyles}>
                With a vast array of hobbies, I strive to recreate the experiences of the moment through my lens.
              </p>
              <p css={paragraphStyles}>
                I'd love the opportunity to create. Whether it's lifestyle, adventure, products, events, or something new, I'm fully on board :)
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const sectionStyles = css`
    padding: 3rem 1rem;
    background: white;

    @media (min-width: 768px) {
      padding: 5rem 1.5rem;
    }

    @media (min-width: 1024px) {
      padding: 8rem 1.5rem;
    }
  `;

  const containerStyles = css`
    max-width: 1024px;
    margin: 0 auto;
    text-align: center;
  `;

  const headingStyles = css`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    letter-spacing: -0.025em;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 1280px) {
      font-size: 3.75rem;
    }
  `;

  const descriptionStyles = css`
    color: #374151;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.125rem;
      margin-bottom: 3rem;
    }
  `;

  const linksContainerStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @media (min-width: 640px) {
      flex-direction: row;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      gap: 2rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 1024px) {
      margin-bottom: 3rem;
    }
  `;

  const linkStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #000;
    text-decoration: none;
    transition: color 0.3s;
    word-break: break-all;

    &:hover {
      color: #666;
    }

    @media (min-width: 640px) {
      font-size: 0.9rem;
      gap: 0.6rem;
    }

    @media (min-width: 768px) {
      font-size: 1rem;
      gap: 0.75rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.125rem;
    }
  `;

  return (
    <section css={sectionStyles} id="contact">
      <div css={containerStyles}>
        <FadeIn>
          <h2 css={headingStyles}>GET IN TOUCH</h2>
          <p css={descriptionStyles}>
            Interested in working together? Let's discuss your project and create 
            something exceptional.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
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

// Events Page Component
const EventsPage = () => {
  //const events = [
    //{
     // id: 'sample-event',
     // name: 'Sample Event',
     // date: 'Coming Soon',
      //location: 'TBD',
      //thumbnail: '/photos/cycle0.jpg',
     // photoCount: 0
   // }
 // ];

  const pageStyles = css`
    min-height: 100vh;
    background: white;
    padding-top: 2rem;
  `;

  const containerStyles = css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 3rem 1rem;

    @media (min-width: 768px) {
      padding: 5rem 1.5rem;
    }
  `;

  const headingStyles = css`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
    padding-top: 5rem;

    @media (min-width: 768px) {
      font-size: 3.5rem;
      margin-bottom: 2rem;
    }
  `;

  const descriptionStyles = css`
    text-align: center;
    color: #666;
    margin-bottom: 3rem;
    font-size: 1.125rem;
  `;

  return (
    <div css={pageStyles}>
      <Navigation />
      <div css={containerStyles}>
        <h1 css={headingStyles}>Event Photos</h1>
        <p css={descriptionStyles}>
          Event galleries coming soon! Check back later for photos available for purchase.
        </p>
      </div>
      <Footer />
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'white', color: 'black' }}>
      <Navigation />
      <Hero />
      <PortfolioGrid />
      <Video />
      <AboutMe />
      <Contact />
      <Footer />
    </div>
  );
};

// Main App with Router
export default function PhotographyWebsite() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}