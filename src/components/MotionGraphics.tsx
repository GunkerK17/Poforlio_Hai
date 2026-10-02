import { useReducedMotion } from '../hooks/useReducedMotion';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { profileContent } from '../data/profileContent';

export function MotionGraphics() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const pointerX = useMotionValue(-100), pointerY = useMotionValue(-100);
  const cursorX = useSpring(pointerX, { stiffness: 240, damping: 25 });
  const cursorY = useSpring(pointerY, { stiffness: 240, damping: 25 });
  const cursor = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.querySelector('.portfolio-app, .wl');
    if (!root || reduced || !('IntersectionObserver' in window)) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('.section-heading, .jrn-header, .gun-service-card, .jrn-chapter, .capability-grid article, .showcase-grid article, .moment, .contact-layout, .wf-head, .wf-plan, .wf-bottom'));
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('motion-visible'); reveal.unobserve(entry.target); } });
    }, { threshold: .08 });
    targets.forEach((target, i) => {
      target.style.setProperty('--reveal-delay', `${(i % 3) * 100}ms`);
      target.classList.add('motion-reveal');
      reveal.observe(target);
    });
    const headings = Array.from(root.querySelectorAll<HTMLElement>('.section-heading, .jrn-header, .wf-head'));
    const photos = Array.from(root.querySelectorAll<HTMLElement>('.jrn-collage, .showcase-photo, .moment-image, .wf-hero-visual'));
    const visible = new Set<HTMLElement>();
    const near = new IntersectionObserver(entries => entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) visible.add(el); else visible.delete(el);
    }), { rootMargin: '100px 0px' });
    headings.forEach(el => { el.classList.add('motion-scroll-heading'); near.observe(el); });
    photos.forEach(el => { el.classList.add('motion-scroll-photo'); near.observe(el); });
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => visible.forEach(el => {
        const rect = el.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        el.style.setProperty('--scroll-fill', String(Math.max(.1, progress)));
        el.style.setProperty('--image-scroll-shift', `${((progress - .5) * 34).toFixed(2)}px`);
      }));
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();
    return () => {
      cancelAnimationFrame(frame); reveal.disconnect(); near.disconnect();
      window.removeEventListener('scroll', updateScroll); window.removeEventListener('resize', updateScroll);
      targets.forEach(el => el.classList.remove('motion-reveal'));
      headings.forEach(el => el.classList.remove('motion-scroll-heading'));
      photos.forEach(el => el.classList.remove('motion-scroll-photo'));
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const root = document.querySelector('.portfolio-app, .wl');
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.gun-service-card, .jrn-card, .showcase-grid article, .capability-grid article, .moment, .wifi-panel, .wf-plan'));
    const buttons = Array.from(root.querySelectorAll<HTMLElement>('.button, .wf-btn, .wl-nav-cta, .gun-socials a'));
    cards.forEach(el => { el.classList.add('motion-card'); el.setAttribute('data-motion-card', ''); });
    buttons.forEach(el => el.classList.add('motion-magnetic'));
    let frame = 0, activeCard: HTMLElement | null = null, activeButton: HTMLElement | null = null;
    const resetCard = () => {
      if (activeCard) { activeCard.style.setProperty('--card-rx', '0deg'); activeCard.style.setProperty('--card-ry', '0deg'); activeCard.style.setProperty('--card-lift', '0px'); activeCard.classList.remove('card-pointer-active'); }
      activeCard = null;
    };
    const resetButton = () => {
      if (activeButton) { activeButton.style.setProperty('--magnet-x', '0px'); activeButton.style.setProperty('--magnet-y', '0px'); }
      activeButton = null;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        pointerX.set(event.clientX); pointerY.set(event.clientY);
        const target = event.target instanceof Element ? event.target : null;
        cursor.current?.classList.add('cursor-visible');
        cursor.current?.classList.toggle('cursor-active', !!target?.closest('a, button, summary'));
        if (light.current) {
          light.current.style.transform = `translate3d(${event.clientX - 200}px, ${event.clientY - 200}px, 0)`;
          light.current.classList.add('pointer-light-visible');
        }
        const card = target?.closest<HTMLElement>('[data-motion-card]') ?? null;
        if (activeCard !== card) resetCard();
        if (card) {
          activeCard = card;
          const rect = card.getBoundingClientRect();
          const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
          const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
          card.style.setProperty('--card-rx', `${-(py - .5) * 10}deg`);
          card.style.setProperty('--card-ry', `${(px - .5) * 12}deg`);
          card.style.setProperty('--card-lift', '-6px');
          card.style.setProperty('--spot-x', `${px * 100}%`);
          card.style.setProperty('--spot-y', `${py * 100}%`);
          card.classList.add('card-pointer-active');
        }
        const button = target?.closest<HTMLElement>('.motion-magnetic') ?? null;
        if (activeButton !== button) resetButton();
        if (button) {
          activeButton = button;
          const rect = button.getBoundingClientRect();
          button.style.setProperty('--magnet-x', `${((event.clientX - rect.left - rect.width / 2) * .12).toFixed(2)}px`);
          button.style.setProperty('--magnet-y', `${((event.clientY - rect.top - rect.height / 2) * .18).toFixed(2)}px`);
        }
      });
    };
    const leave = () => { cursor.current?.classList.remove('cursor-visible'); light.current?.classList.remove('pointer-light-visible'); resetCard(); resetButton(); };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    window.addEventListener('scroll', leave, { passive: true });
    return () => {
      cancelAnimationFrame(frame); leave();
      window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave); window.removeEventListener('scroll', leave);
      cards.forEach(el => { el.classList.remove('motion-card'); el.removeAttribute('data-motion-card'); });
      buttons.forEach(el => el.classList.remove('motion-magnetic'));
    };
  }, [reduced, pointerX, pointerY]);

  // Filtered journal cards mount after the initial reveal pass. Observe those too.
  useEffect(() => {
    const grid = document.querySelector('.portfolio-app .moments-grid');
    if (!grid || reduced) return;
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('motion-visible'); reveal.unobserve(entry.target); }
    }), { threshold: .08 });
    const attach = () => grid.querySelectorAll<HTMLElement>('.moment').forEach((card, i) => {
      if (card.dataset.journalMotion) return;
      card.dataset.journalMotion = 'true';
      card.classList.add('motion-card', 'motion-reveal');
      card.setAttribute('data-motion-card', '');
      card.style.setProperty('--reveal-delay', `${i * 70}ms`);
      reveal.observe(card);
    });
    attach();
    const mutations = new MutationObserver(attach);
    mutations.observe(grid, { childList: true });
    return () => {
      mutations.disconnect(); reveal.disconnect();
      grid.querySelectorAll<HTMLElement>('.moment').forEach(card => {
        delete card.dataset.journalMotion; card.removeAttribute('data-motion-card'); card.classList.remove('motion-card', 'motion-reveal');
      });
    };
  }, [reduced]);

  return <>
    <motion.div className="gun-scroll-progress" style={{ scaleX: reduced ? scrollYProgress : scaleX }} aria-hidden="true" />
    {!reduced && <>
      <div className="gun-pointer-light" ref={light} aria-hidden="true" />
      <motion.div className="gun-cursor" ref={cursor} style={{ x: cursorX, y: cursorY }} aria-hidden="true"><span><ArrowUpRight size={22}/></span></motion.div>
    </>}
    <a className="gun-contact-dock" href={profileContent.contact.zaloUrl} target="_blank" rel="noopener noreferrer" aria-label="Nhắn Hải qua Zalo"><MessageCircle size={20}/><span>Nhắn Hải</span><ArrowUpRight size={15}/></a>
  </>;
}
