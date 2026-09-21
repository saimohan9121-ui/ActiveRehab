import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import {
  trackVideoPreview,
  trackVideoFullPlay,
  trackVideoNext
} from '../../utils/analytics';

// ─── 1. Exactly the 6 genuine YouTube Shorts testimonials ─────────────────────
const patientVideos = [
  {
    id: 'R3x3YUFRoZk',
    url: 'https://youtube.com/shorts/R3x3YUFRoZk',
    title: 'Patient Testimonial 1'
  },
  {
    id: 'cRlGC5cISDc',
    url: 'https://youtube.com/shorts/cRlGC5cISDc',
    title: 'Patient Testimonial 2'
  },
  {
    id: 'UPdD1nPAEuQ',
    url: 'https://youtube.com/shorts/UPdD1nPAEuQ',
    title: 'Patient Testimonial 3'
  },
  {
    id: 'dn0GYZL1RvQ',
    url: 'https://youtube.com/shorts/dn0GYZL1RvQ',
    title: 'Patient Testimonial 4'
  },
  {
    id: 'zJriVUypZfQ',
    url: 'https://youtube.com/shorts/zJriVUypZfQ',
    title: 'Patient Testimonial 5'
  },
  {
    id: 'LL8un9hK9Jc',
    url: 'https://youtube.com/shorts/LL8un9hK9Jc',
    title: 'Patient Testimonial 6'
  }
];

const N = patientVideos.length; // 6 videos
const PRE_CLONES = 3;
const POST_CLONES = 3;
const AUTO_SCROLL_DELAY = 6500; // Unified 6500ms auto-scroll interval across all devices

// Triple-buffered items array for seamless 1-by-1 infinite carousel looping:
// 3 pre-clones + 6 real videos + 3 post-clones = 12 items total
const carouselItems = [
  ...patientVideos.slice(-PRE_CLONES).map((v, i) => ({
    ...v,
    isClone: true,
    slotKey: `pre-${v.id}-${i}`,
    realIdx: (N - PRE_CLONES + i) % N
  })),
  ...patientVideos.map((v, i) => ({
    ...v,
    isClone: false,
    slotKey: `real-${v.id}-${i}`,
    realIdx: i
  })),
  ...patientVideos.slice(0, POST_CLONES).map((v, i) => ({
    ...v,
    isClone: true,
    slotKey: `post-${v.id}-${i}`,
    realIdx: i
  }))
];

// ─── Global YouTube IFrame API Loader ──────────────────────────────────────────
let ytApiPromise = null;
function loadYouTubeIframeApi() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    const existing = document.getElementById('youtube-iframe-api');
    if (!existing) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(tag, firstScript);
      } else {
        document.head.appendChild(tag);
      }
    }

    const prevOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevOnReady === 'function') prevOnReady();
      resolve(window.YT);
    };

    const checkInterval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkInterval);
        resolve(window.YT);
      }
    }, 100);
  });

  return ytApiPromise;
}

// ─── YouTube Card Component with Dual-Color Backlight (Blue Left + Orange Right) ───
const YouTubeCard = React.memo(({
  item,
  isActive,
  isLoaded = false,
  onActivate,
  cardWidth,
  gapWidth,
  onPlayerStateChange,
  registerPlayer,
  unregisterPlayer
}) => {
  const iframeRef = useRef(null);
  const playerId = `yt-embed-${item.slotKey}`;

  useEffect(() => {
    // Only mount YouTube Player API if section is loaded and on core real videos (not clones)
    if (item.isClone || !isLoaded) return;

    let isCancelled = false;
    let playerInstance = null;

    loadYouTubeIframeApi().then((YT) => {
      if (isCancelled || !YT || !iframeRef.current) return;

      try {
        playerInstance = new YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event) => {
              if (!isCancelled && onPlayerStateChange) {
                onPlayerStateChange(event, playerId, item.id, item.realIdx);
              }
            }
          }
        });
        registerPlayer(playerId, playerInstance, iframeRef.current);
      } catch (err) {
        // player registration fallback
      }
    });

    return () => {
      isCancelled = true;
      unregisterPlayer(playerId);
      if (playerInstance) {
        try {
          if (typeof playerInstance.destroy === 'function') {
            playerInstance.destroy();
          }
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [item.isClone, isLoaded, playerId, item.id, item.realIdx, onPlayerStateChange, registerPlayer, unregisterPlayer]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${item.id}?enablejsapi=1&playsinline=1&rel=0&controls=1&modestbranding=1&origin=${encodeURIComponent(origin)}`;

  return (
    <div
      style={{
        width: `${cardWidth}px`,
        marginRight: `${gapWidth}px`,
        flexShrink: 0
      }}
      className="video-slide group relative z-10"
    >
      {/* ── DUAL-COLOR ACTIVE BACKLIGHT: Blue on Left + Orange on Right (z-0, Behind Player) ── */}
      <div
        className={`video-backlight absolute pointer-events-none rounded-3xl transition-all duration-400 ${
          isActive ? 'opacity-85 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          inset: cardWidth <= 340 ? '-10px -14px' : '-14px -18px',
          background: `
            radial-gradient(
              circle at 12% 50%,
              rgba(29, 116, 185, 0.75) 0%,
              rgba(29, 116, 185, 0.38) 32%,
              transparent 65%
            ),
            radial-gradient(
              circle at 88% 50%,
              rgba(251, 139, 7, 0.72) 0%,
              rgba(251, 139, 7, 0.35) 32%,
              transparent 65%
            )
          `,
          filter: cardWidth <= 340 ? 'blur(13px)' : 'blur(16px)',
          zIndex: 0
        }}
        aria-hidden="true"
      />

      {/* ── YOUTUBE PLAYER WRAPPER: Handles border-radius & clipping for iframe (z-2) ── */}
      <div
        className={`youtube-player-wrapper relative z-2 w-full rounded-2xl overflow-hidden bg-black transition-all duration-300 ${
          isActive
            ? 'border border-[#fb8b07]/50 shadow-md'
            : 'border border-slate-200/90 shadow-sm'
        }`}
        style={{ aspectRatio: '9 / 16' }}
      >
        {!item.isClone && isLoaded ? (
          // Genuine YouTube Player IFrame for the 6 core videos (mounted only when approaching viewport)
          <iframe
            ref={iframeRef}
            id={playerId}
            src={embedUrl}
            title={`ActiveRehab patient testimonial video ${item.realIdx + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full border-0 block"
          />
        ) : (
          // Lightweight Genuine YouTube Shorts Poster for Clones and Deferred Initial Load
          <div 
            className="w-full h-full relative bg-black cursor-pointer group/thumb"
            onClick={() => onActivate && onActivate(item.realIdx)}
          >
            <img
              src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
              alt={`ActiveRehab patient testimonial video ${item.realIdx + 1}`}
              loading="lazy"
              decoding="async"
              width="340"
              height="604"
              className="w-full h-full object-cover brightness-[0.95] group-hover/thumb:scale-105 transition-transform duration-300"
            />
            {/* Native Shorts Pill indicator */}
            <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                <svg className="w-3 h-3 fill-[#fb8b07]" viewBox="0 0 24 24">
                  <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.82-7.85l-.76-.43-1.63-.92-.76-.43c-1.74-.98-3.95-.36-4.93 1.38L8.7 8.16l-.8-.45c-1.32-.74-2.99-.27-3.73 1.05s-.27 2.99 1.05 3.73l.76.43 1.63.92.76.43c1.74.98 3.95.36 4.93-1.38l1.04-1.73.8.45c1.32.74 2.99.27 3.73-1.05.74-1.32.27-2.99-1.05-3.73z" />
                </svg>
                <span>Shorts</span>
              </div>
            </div>
            {/* Center Red Shorts Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-2xl bg-[#ff0000] text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-white ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

// ─── Main PatientVideoStories Component ───────────────────────────────────────
const PatientVideoStories = ({ selectedLocation = 'kondapur' }) => {
  // Start at index 3 (first real item)
  const [currentIndex, setCurrentIndex] = useState(PRE_CLONES);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Default to true so auto-scroll starts reliably without waiting on observer race
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [hasLoadedPlayers, setHasLoadedPlayers] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Responsive layout dimensions
  const [cardWidth, setCardWidth] = useState(380);
  const [gapWidth, setGapWidth] = useState(24);
  const [centerOffset, setCenterOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const autoScrollTimerRef = useRef(null);
  const userInactivityTimerRef = useRef(null);
  const transitionSafetyTimerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const currentIndexRef = useRef(PRE_CLONES);
  const playersRef = useRef(new Map());
  const iframesRef = useRef(new Map());

  // Keep refs in sync with state for instantaneous event checks
  currentIndexRef.current = currentIndex;
  isTransitioningRef.current = isTransitioning;

  // Real index of the first visible video (0 to 5)
  const realIndex = ((currentIndex - PRE_CLONES) % N + N) % N;
  const activeVideo = patientVideos[realIndex];

  // Detect whether device supports true hover (fine pointer like mouse)
  const isTrueHoverDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  };

  // ─── Player Registration ────────────────────────────────────────────────────
  const registerPlayer = useCallback((id, playerInstance, iframeEl) => {
    playersRef.current.set(id, playerInstance);
    if (iframeEl) {
      iframesRef.current.set(id, iframeEl);
    }
  }, []);

  const unregisterPlayer = useCallback((id) => {
    playersRef.current.delete(id);
    iframesRef.current.delete(id);
  }, []);

  // ─── Pause All Videos ───────────────────────────────────────────────────────
  const pauseAllOtherVideos = useCallback((activePlayerId) => {
    playersRef.current.forEach((player, id) => {
      if (id !== activePlayerId) {
        try {
          if (typeof player.pauseVideo === 'function') {
            player.pauseVideo();
          }
        } catch (e) {
          // fallback to postMessage
        }
      }
    });

    iframesRef.current.forEach((iframe, id) => {
      if (id !== activePlayerId && iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
            '*'
          );
        } catch (e) {
          // ignore
        }
      }
    });
  }, []);

  const pauseAllVideos = useCallback(() => {
    pauseAllOtherVideos(null);
    setIsVideoPlaying(false);
  }, [pauseAllOtherVideos]);

  // ─── Handle Player State Change ─────────────────────────────────────────────
  const handlePlayerStateChange = useCallback((event, playerId, videoId, videoRealIdx) => {
    const state = event.data;

    if (state === 1) {
      // PLAYING: Freeze carousel immediately and enforce single playback
      setIsVideoPlaying(true);
      pauseAllOtherVideos(playerId);

      if (userInactivityTimerRef.current) {
        clearTimeout(userInactivityTimerRef.current);
        userInactivityTimerRef.current = null;
      }

      trackVideoFullPlay({
        videoId,
        videoIndex: videoRealIdx,
        selectedLocation
      });
    } else if (state === 2) {
      // PAUSED: Keep current slide. Resume auto-scroll after 7s inactivity
      setIsVideoPlaying(false);
      setIsUserInteracting(true);
      if (userInactivityTimerRef.current) {
        clearTimeout(userInactivityTimerRef.current);
      }
      userInactivityTimerRef.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 7000);
    } else if (state === 0) {
      // ENDED: Resume auto-scroll after 3s
      setIsVideoPlaying(false);
      setIsUserInteracting(true);
      if (userInactivityTimerRef.current) {
        clearTimeout(userInactivityTimerRef.current);
      }
      userInactivityTimerRef.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 3000);
    }
  }, [selectedLocation, pauseAllOtherVideos]);

  // ─── Backup Window PostMessage Listener ─────────────────────────────────────
  useEffect(() => {
    const handleWindowMessage = (e) => {
      if (!e.data || typeof e.data !== 'string') return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === 'onStateChange') {
          if (data.info === 1) {
            setIsVideoPlaying(true);
          } else if (data.info === 2 || data.info === 0) {
            setIsVideoPlaying(false);
          }
        }
      } catch (err) {
        // not a JSON message from YouTube
      }
    };

    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, []);

  // ─── Responsive Dimensions Calculation ──────────────────────────────────────
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const availableWidth = containerRef.current.clientWidth;
    const ww = typeof window !== 'undefined' ? window.innerWidth : 1200;

    if (ww >= 1024) {
      // Desktop: exactly 3 YouTube videos side-by-side occupying full content width
      const gap = 24;
      const targetWidth = Math.floor((availableWidth - 2 * gap) / 3);
      setGapWidth(gap);
      setCardWidth(Math.max(260, targetWidth));
      setCenterOffset(0);
    } else if (ww >= 640) {
      // Tablet: exactly 2 YouTube videos side-by-side
      const gap = 20;
      const targetWidth = Math.floor((availableWidth - gap) / 2);
      setGapWidth(gap);
      setCardWidth(Math.max(240, targetWidth));
      setCenterOffset(0);
    } else {
      // Mobile: exactly 1 YouTube video centered (86-90vw, max 330px)
      const gap = 16;
      const targetWidth = Math.min(320, Math.floor(availableWidth * 0.86));
      const offset = Math.max(0, Math.floor((availableWidth - targetWidth) / 2));
      setGapWidth(gap);
      setCardWidth(targetWidth);
      setCenterOffset(offset);
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    const onResize = () => {
      setIsTransitioning(false);
      updateDimensions();
    };
    window.addEventListener('resize', onResize);

    let ro = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => {
        updateDimensions();
      });
      ro.observe(containerRef.current);
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMotion = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMotion);

    const onVis = () => {
      const isHidden = document.visibilityState === 'hidden';
      setIsTabHidden(isHidden);
      if (isHidden) {
        pauseAllVideos();
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      mq.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [updateDimensions, pauseAllVideos]);

  // ─── Intersection Observer (Practical 0.2 threshold so mobile never fails) ──
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            setHasLoadedPlayers(true);
          } else {
            pauseAllVideos();
          }
        });
      },
      { threshold: 0.1, rootMargin: '250px 0px 250px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [pauseAllVideos]);

  // ─── Carousel Navigation (One Video at a Time) ──────────────────────────────
  const nextSlide = useCallback(
    (method = 'auto') => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setIsTransitioning(true);

      setCurrentIndex((prev) => {
        const nextIdx = prev + 1;
        const nextReal = ((nextIdx - PRE_CLONES) % N + N) % N;
        trackVideoNext({
          videoId: patientVideos[nextReal].id,
          videoIndex: nextReal,
          selectedLocation,
          method
        });
        return nextIdx;
      });

      // Safety timeout: Guarantee isTransitioning resets within 700ms even if transitionend is dropped
      if (transitionSafetyTimerRef.current) {
        clearTimeout(transitionSafetyTimerRef.current);
      }
      transitionSafetyTimerRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
        setCurrentIndex((curr) => {
          if (curr >= PRE_CLONES + N) return curr - N;
          if (curr < PRE_CLONES) return curr + N;
          return curr;
        });
      }, 700);
    },
    [selectedLocation]
  );

  const prevSlide = useCallback(
    (method = 'arrow') => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setIsTransitioning(true);

      setCurrentIndex((prev) => {
        const prevIdx = prev - 1;
        const prevReal = ((prevIdx - PRE_CLONES) % N + N) % N;
        trackVideoNext({
          videoId: patientVideos[prevReal].id,
          videoIndex: prevReal,
          selectedLocation,
          method
        });
        return prevIdx;
      });

      // Safety timeout
      if (transitionSafetyTimerRef.current) {
        clearTimeout(transitionSafetyTimerRef.current);
      }
      transitionSafetyTimerRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
        setCurrentIndex((curr) => {
          if (curr >= PRE_CLONES + N) return curr - N;
          if (curr < PRE_CLONES) return curr + N;
          return curr;
        });
      }, 700);
    },
    [selectedLocation]
  );

  // Seamless Infinite Wrap on Transition End
  const handleTransitionEnd = useCallback(
    (e) => {
      if (e && e.target !== e.currentTarget) return;
      if (transitionSafetyTimerRef.current) {
        clearTimeout(transitionSafetyTimerRef.current);
      }
      isTransitioningRef.current = false;
      setIsTransitioning(false);

      if (currentIndex >= PRE_CLONES + N) {
        setCurrentIndex(currentIndex - N);
      } else if (currentIndex < PRE_CLONES) {
        setCurrentIndex(currentIndex + N);
      }
    },
    [currentIndex]
  );

  // ─── User Interaction Handler ───────────────────────────────────────────────
  const markUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (userInactivityTimerRef.current) {
      clearTimeout(userInactivityTimerRef.current);
    }
    userInactivityTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 6000);
  }, []);

  const handleNextClick = () => {
    markUserInteraction();
    nextSlide('arrow');
  };

  const handlePrevClick = () => {
    markUserInteraction();
    prevSlide('arrow');
  };

  const handleDotClick = (targetRealIdx) => {
    markUserInteraction();
    if (targetRealIdx === realIndex || isTransitioningRef.current) return;
    const diff = targetRealIdx - realIndex;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + diff);

    if (transitionSafetyTimerRef.current) {
      clearTimeout(transitionSafetyTimerRef.current);
    }
    transitionSafetyTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }, 700);
  };

  // ─── Unified Clean Auto-Scroll Timer (Runs on Desktop, Tablet & Mobile) ──────
  const clearAutoScrollTimer = useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);

  const scheduleAutoScroll = useCallback(() => {
    clearAutoScrollTimer();

    // Section 35: All conditions must be satisfied to auto-scroll
    const canAutoScroll =
      isSectionVisible &&
      !isTabHidden &&
      !isVideoPlaying &&
      !isUserInteracting &&
      !isHovered &&
      !reducedMotion;

    if (!canAutoScroll) {
      return;
    }

    autoScrollTimerRef.current = setTimeout(() => {
      nextSlide('auto');
    }, AUTO_SCROLL_DELAY);
  }, [
    clearAutoScrollTimer,
    isSectionVisible,
    isTabHidden,
    isVideoPlaying,
    isUserInteracting,
    isHovered,
    reducedMotion,
    nextSlide
  ]);

  useEffect(() => {
    scheduleAutoScroll();
    return clearAutoScrollTimer;
  }, [scheduleAutoScroll, clearAutoScrollTimer, currentIndex]);

  // Track preview whenever active card changes
  useEffect(() => {
    trackVideoPreview({
      videoId: activeVideo.id,
      videoIndex: realIndex,
      selectedLocation
    });
  }, [activeVideo.id, realIndex, selectedLocation]);

  // ─── Touch / Drag Swipe Support (Mobile Recovery Guaranteed) ────────────────
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const pointerDown = useRef(false);

  const onTouchStart = (e) => {
    if (isVideoPlaying) return;
    pointerDown.current = true;
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    dragCurrentX.current = dragStartX.current;
    setIsDragging(true);
    setIsUserInteracting(true);
    clearAutoScrollTimer();
  };

  const onTouchMove = (e) => {
    if (!pointerDown.current) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    dragCurrentX.current = x;
    setDragOffset(x - dragStartX.current);
  };

  const onTouchEnd = () => {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    setIsDragging(false);
    const diff = dragCurrentX.current - dragStartX.current;
    setDragOffset(0);

    if (diff < -45) {
      nextSlide('swipe');
    } else if (diff > 45) {
      prevSlide('swipe');
    }

    // Always guarantee interaction state clears after swipe release
    if (userInactivityTimerRef.current) {
      clearTimeout(userInactivityTimerRef.current);
    }
    userInactivityTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  const onTouchCancel = () => {
    pointerDown.current = false;
    setIsDragging(false);
    setDragOffset(0);
    if (userInactivityTimerRef.current) {
      clearTimeout(userInactivityTimerRef.current);
    }
    userInactivityTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  // ─── Keyboard Accessibility ────────────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevClick();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextClick();
    }
  };

  const step = cardWidth + gapWidth;
  const translateX = -(currentIndex * step) + centerOffset + dragOffset;

  return (
    <div
      ref={sectionRef}
      className="w-full flex flex-col items-center select-none"
      aria-label="ActiveRehab patient video testimonials"
      onKeyDown={handleKeyDown}
      role="region"
    >
      {/* ── 1. Subsection Header ───────────────────────────────────── */}
      <div className="text-center mb-6 sm:mb-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#1d74b9] block mb-1">
          PATIENT VIDEO STORIES
        </span>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          Hear From Our Patients
        </h3>
        <div className="w-10 h-0.5 bg-[#fb8b07] mx-auto mt-2 mb-2.5 rounded-full" />
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
          Real patient experiences shared through ActiveRehab's YouTube channel.
        </p>
      </div>

      {/* ── 2. Carousel Shell with Fixed Side Lights and Side Arrows ── */}
      <div className="relative w-full overflow-visible">
        {/* Previous Navigation Arrow (Far Left Edge, Vertically Centered) */}
        <button
          type="button"
          onClick={handlePrevClick}
          aria-label="Previous patient testimonial"
          className="absolute left-1 sm:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#1d74b9] text-[#1d74b9] hover:text-white border border-slate-200/90 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1d74b9] hover:scale-105 active:scale-95 group"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* Carousel Viewport Container (py-6 ensures ample vertical space for the halo without clipping) */}
        <div
          ref={containerRef}
          className="w-full relative mx-auto overflow-hidden outline-none py-6 sm:py-7 px-1"
          onMouseEnter={() => {
            // Only activate hover pause on true mouse pointer devices
            if (isTrueHoverDevice()) setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (isTrueHoverDevice()) setIsHovered(false);
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
          onMouseDown={onTouchStart}
          onMouseMove={onTouchMove}
          onMouseUp={onTouchEnd}
        >
          {/* ── FIXED LEFT SIDE AMBIENT LIGHT (Blue #1d74b9 Entry Light) ── */}
          <div
            className="absolute left-0 top-6 bottom-6 pointer-events-none z-15 w-10 sm:w-16 lg:w-24 rounded-l-2xl"
            style={{
              background: 'linear-gradient(90deg, rgba(29, 116, 185, 0.28) 0%, rgba(29, 116, 185, 0.12) 45%, transparent 100%)',
              filter: 'blur(8px)'
            }}
            aria-hidden="true"
          />

          {/* Sliding Track: Smooth 600ms transform */}
          <div
            className="flex items-center relative py-1"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: isTransitioning
                ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)'
                : 'none',
              cursor: isDragging ? 'grabbing' : 'default',
              willChange: 'transform'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {carouselItems.map((item, idx) => (
              <YouTubeCard
                key={`yt-card-${item.slotKey}`}
                item={item}
                isActive={idx === currentIndex}
                isLoaded={hasLoadedPlayers}
                onActivate={() => setHasLoadedPlayers(true)}
                cardWidth={cardWidth}
                gapWidth={gapWidth}
                onPlayerStateChange={handlePlayerStateChange}
                registerPlayer={registerPlayer}
                unregisterPlayer={unregisterPlayer}
              />
            ))}
          </div>

          {/* ── FIXED RIGHT SIDE AMBIENT LIGHT (Orange #fb8b07 Exit Light) ── */}
          <div
            className="absolute right-0 top-6 bottom-6 pointer-events-none z-15 w-10 sm:w-16 lg:w-24 rounded-r-2xl"
            style={{
              background: 'linear-gradient(270deg, rgba(251, 139, 7, 0.26) 0%, rgba(251, 139, 7, 0.10) 45%, transparent 100%)',
              filter: 'blur(8px)'
            }}
            aria-hidden="true"
          />
        </div>

        {/* Next Navigation Arrow (Far Right Edge, Vertically Centered) */}
        <button
          type="button"
          onClick={handleNextClick}
          aria-label="Next patient testimonial"
          className="absolute right-1 sm:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#1d74b9] text-[#1d74b9] hover:text-white border border-slate-200/90 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1d74b9] hover:scale-105 active:scale-95 group"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* ── 3. Carousel Pagination: 6 Compact Dots ─────────────────── */}
      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Patient video testimonials navigation"
      >
        {patientVideos.map((video, idx) => {
          const isCurrent = idx === realIndex;
          return (
            <button
              key={`dot-${video.id}`}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-label={`Go to patient story ${idx + 1}`}
              onClick={() => handleDotClick(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isCurrent
                  ? 'w-6 h-1.5 bg-[#fb8b07]'
                  : 'w-1.5 h-1.5 bg-slate-300 hover:bg-[#1d74b9]/50'
              }`}
            />
          );
        })}
      </div>

      {/* ── 4. Single Section-Level Action (No repeated cards) ──────── */}
      <div className="mt-5 flex justify-center">
        <a
          href="https://www.youtube.com/@activerehabcentre"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#1d74b9] hover:text-[#fb8b07] bg-white border border-slate-200 hover:border-[#fb8b07] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer group"
        >
          <span>View More on YouTube</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default PatientVideoStories;
