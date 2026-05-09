import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Clock, Award, Users, Heart, ChevronRight, Star, CheckCircle, ArrowRight, Quote, Facebook, Instagram, Linkedin, ArrowUp, Zap, MapPin, Menu, X, Brain, Stethoscope, ShieldCheck, History, Activity, LifeBuoy, ChevronDown, Globe, ChevronLeft } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);
// Internal sub-component for premium interactive cards
const InteractiveCard = ({ condition, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  // Spotlight effect tracking
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  function onMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.a
      href={`https://wa.me/919000229040?text=${encodeURIComponent(`Hello! I would like to enquire about ${condition.title}.`)}`}
      target="_blank"
      rel="noreferrer"
      className="group relative h-full perspective-1000 block"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative h-full bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden transition-all duration-300"
      >
        {/* Dynamic Spotlight Glow */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at var(--x) var(--y), rgba(46,67,134,0.15), transparent 40%)`,
            "--x": useTransform(glowX, (v) => `${v}%`),
            "--y": useTransform(glowY, (v) => `${v}%`),
          }}
        />

        {/* Background Image with Parallax */}
        <div className="h-52 overflow-hidden relative">
          <motion.img
            src={condition.image}
            alt={condition.title}
            style={{
              scale: 1.1,
              x: useTransform(mouseX, [-0.5, 0.5], [10, -10]),
              y: useTransform(mouseY, [-0.5, 0.5], [10, -10]),
            }}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

          {/* Floating Icon with 3D Pop */}
          <div className="absolute -bottom-5 right-6" style={{ transform: "translateZ(60px)" }}>
            <motion.div
              className="bg-white p-4 rounded-2xl shadow-xl text-brandBlue border border-slate-50"
              whileHover={{ y: -8, rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {condition.icon}
            </motion.div>
          </div>

          <div className="absolute bottom-5 left-6" style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-xl font-black text-white tracking-tight">{condition.title}</h3>
          </div>
        </div>

        {/* Content with Staggered Elements */}
        <div className="p-7 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
          <motion.p
            className="text-slate-500 text-[13px] mb-6 font-bold italic leading-relaxed line-clamp-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {condition.description}
          </motion.p>

          <div className="space-y-3 mb-6 flex-grow">
            {condition.conditions.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center text-[13px] text-slate-700 font-black group/item"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brandOrange mr-3 group-hover/item:scale-125 transition-transform shadow-lg shadow-brandOrange/20"></div>
                {item}
              </motion.div>
            ))}
          </div>

          <div
            className="mt-auto pt-6 border-t border-slate-100/50 flex items-center justify-between group/btn w-full bg-transparent"
          >
            <span className="text-[12px] font-black text-brandBlue uppercase tracking-[0.2em] flex items-center">
              Full Coverage
            </span>
            <div className="flex items-center bg-[#25D366] text-white px-3 py-1.5 rounded-full shadow-md group-hover:bg-[#128C7E] transition-colors">
              <WhatsAppIcon className="w-4 h-4 mr-1.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Enquire</span>
            </div>
          </div>
        </div>

        {/* Holographic Reflection Layer */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </motion.div>
    </motion.a>
  );
};

const ServiceCard = ({ service, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  function onMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      key={index}
      className="relative group h-full perspective-1000"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative h-full bg-white/70 backdrop-blur-xl border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-brandBlue/10 transition-all duration-700 flex flex-col"
      >
        {/* Dynamic Spotlight Glow */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at var(--x) var(--y), rgba(46,67,134,0.1), transparent 40%)`,
            "--x": useTransform(glowX, (v) => `${v}%`),
            "--y": useTransform(glowY, (v) => `${v}%`),
          }}
        />

        {/* Image Header */}
        <div className="h-64 overflow-hidden relative">
          <motion.img
            src={service.image}
            alt={service.title}
            style={{
              scale: 1.1,
              x: useTransform(mouseX, [-0.5, 0.5], [15, -15]),
              y: useTransform(mouseY, [-0.5, 0.5], [15, -15]),
            }}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent`}></div>

          {/* Floating Number Backdrop */}
          <div className="absolute -top-4 -left-4 text-9xl font-black text-white/10 select-none group-hover:text-brandOrange/20 transition-colors duration-500 pointer-events-none">
            0{index + 1}
          </div>

          {/* Icon Container with 3D Pop */}
          <div className="absolute -bottom-6 left-10" style={{ transform: "translateZ(80px)" }}>
            <motion.div
              className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white shadow-2xl border-4 border-white`}
              whileHover={{ y: -8, rotate: 12, scale: 1.1 }}
            >
              {service.icon}
            </motion.div>
          </div>
        </div>

        <div className="p-10 pt-12 flex flex-col flex-grow" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-brandBlue transition-colors">{service.title}</h3>
          <h4 className="text-brandOrange font-black uppercase text-xs tracking-widest mb-6">{service.subtitle}</h4>

          <p className="text-slate-600 leading-relaxed mb-10 font-medium text-sm flex-grow">
            {service.description}
          </p>

          <motion.button
            className={`mt-auto w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-gradient-to-r ${service.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>Discover More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Bottom Accent Glow */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-gradient-to-r ${service.color} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
      </motion.div>
    </motion.div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // EmailJS integration for Hero Appointment Form
  const heroFormRef = useRef();
  const [isHeroSubmitting, setIsHeroSubmitting] = useState(false);

  // EmailJS integration for Contact Section Form
  const contactFormRef = useRef();
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    setIsHeroSubmitting(true);

    emailjs.sendForm(
      'service_xnocv4r',
      'template_ihtju25',
      heroFormRef.current,
      'iEz80bY3eySot8Qa9'
    )
    .then((result) => {
        toast.success("Appointment request sent successfully!");
        heroFormRef.current.reset();
        setIsHeroSubmitting(false);
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-16732521690/xT1WCKjEkdkaENqJ2Ko-'
          });
        }
        navigate('/thank-you');
    }, (error) => {
        console.error("EmailJS Hero Form Error:", error);
        toast.error(`Failed: ${error.text || "Check EmailJS setup"}`);
        setIsHeroSubmitting(false);
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsContactSubmitting(true);

    emailjs.sendForm(
      'service_xnocv4r',
      'template_ihtju25',
      contactFormRef.current,
      'iEz80bY3eySot8Qa9'
    )
    .then((result) => {
        toast.success("Message sent successfully!");
        contactFormRef.current.reset();
        setIsContactSubmitting(false);
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-16732521690/xT1WCKjEkdkaENqJ2Ko-'
          });
        }
        navigate('/thank-you');
    }, (error) => {
        console.error("EmailJS Contact Form Error:", error);
        toast.error(`Failed: ${error.text || "Check EmailJS setup"}`);
        setIsContactSubmitting(false);
    });
  };

  useEffect(() => {
    // Event snippet for Home page (1) conversion page
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16732521690/xT1WCKjEkdkaENqJ2Ko-'
      });
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Neha Yadav",
      time: "Recent Patient",
      content: "He is the best Chiropractor I have been to. My neck pain, backache, my mother's Frozen shoulder, my son's Plantar fasciitis has all been treated by Dr. Ashok. He listens to your issues very patiently, gives enough time to each patient.",
      rating: 5
    },
    {
      name: "Sameendra Rachuri",
      time: "Recent Patient",
      content: "I was suffering from lower back pain and consulted Dr. Ashok Kota regarding this. After a thorough discussion about my condition and a checkup, he suggested two to three chiropractic sessions to relieve my muscle tension and some lower body and neck exercises to further reduce the pain and prevent future occurrences.",
      rating: 5
    },
    {
      name: "Kolli Srilaxmi",
      time: "Recent Patient",
      content: "I had a knee pain and lower back pain. I found Dr.Ashok in Google and went for treatment. Explained all my issues, he listened carefully and explained about the sessions/treatment. My pain had cured in 4 sessions. I will recommend my friends as well. Thank you Mr.Ashok.",
      rating: 5
    },
    {
      name: "Sachin Gupta",
      time: "Recent Patient",
      content: "Dr Ashok under promise and over deliver. For me he said I might improve but I see major improvement after 3 sessions. His empathetic nature, precision of how much adjustment is required and confidence in his skills sets him apart!",
      rating: 5
    }
  ];

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Auto-scroll testimonials every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Slower interval for longer text
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const painConditions = [
    {
      title: "Neck Pain",
      description: "Pain in the cervical spine region",
      conditions: ["Cervical strain", "Whiplash", "Cervical disc issues", "Poor neck posture"],
      image: "/images/neck-pain.jpg"
    },
    {
      title: "Joint Pain",
      description: "Pain affecting specific or multiple joints",
      conditions: ["Osteoarthritis", "Rheumatoid arthritis", "Bursitis", "Joint injuries"],
      image: "/images/joint-pain.jpg"
    },
    {
      title: "Headaches",
      description: "Pain in the head with accompanying symptoms",
      conditions: ["Tension headaches", "Migraines", "Cervicogenic headaches"],
      image: "/images/headache.jpg"
    },
    {
      title: "Nerve Pain",
      description: "Pain from nerve irritation or compression",
      conditions: ["Sciatica", "Carpal tunnel syndrome", "Radiculopathy"],
      image: "/images/nerve-pain.jpg"
    },
    {
      title: "Post-Surgical Pain",
      description: "Advanced orthopedic rehabilitation and post-operative neuropathic pain management.",
      conditions: ["Joint Replacement Recovery", "Spinal Fusion Care", "Hardware Integration", "Post-Surgical Neuralgia"],
      image: "/images/post-surgical.jpg"
    },
    {
      title: "Chronic Pain",
      description: "Comprehensive management of systemic central sensitization and long-term neuropathic syndromes.",
      conditions: ["Complex Regional Pain", "Fibromyalgia Protocol", "Central Sensitization", "Chronic Neuralgia"],
      image: "/images/chronic-pain.jpg"
    },
    {
      title: "Pain Associated with Aging",
      description: "Specialized geriatric orthopedic care focusing on degenerative disc disease and skeletal structural integrity.",
      conditions: ["Degenerative Disc Disease", "Spinal Stenosis", "Osteoporotic Care", "Geriatric Mobility"],
      image: "/images/aging-pain.jpg"
    },
    {
      title: "Back Pain",
      description: "Precision lumbar spine therapy targeting disc herniation, mechanical instability, and radicular syndromes.",
      conditions: ["Lumbar Herniation", "Spondylolisthesis", "Mechanical Back Pain", "Degenerative Instability"],
      image: "/images/back-pain.jpg"
    }
  ];

  const services = [
    {
      title: "Chiropractic Adjustments",
      subtitle: "Personalized Care",
      description: "Experience personalized chiropractic care with Dr. Ashok P. Kota at Activerehab. Our tailored treatments in Kondapur and Kompally ensure your spine aligns with your health goals. Rediscover mobility and comfort today!",
      icon: <Brain className="w-8 h-8" />,
      image: "/images/chiropractic-adjustments.png",
      color: "from-brandBlue to-brandBlue/80"
    },
    {
      title: "Rehabilitation Therapy",
      subtitle: "Improved Movement",
      description: "Step into a world of improved movement at Activerehab. Under Dr. Ashok P. Kota's expert guidance in Hyderabad, our rehabilitation therapy sessions are designed to strengthen and heal. Begin your journey to full recovery now!",
      icon: <ShieldCheck className="w-8 h-8" />,
      image: "/images/rehab-therapy.png",
      color: "from-brandBlue to-brandBlue/80"
    },
    {
      title: "Posture Correction",
      subtitle: "Precise Corrections",
      description: "Perfect your posture with precise corrections at Activerehab. Dr. Ashok P. Kota's specialized approach in Kondapur and Kompally helps align your body and enhance wellbeing. Transform your posture and enhance your lifestyle!",
      icon: <Activity className="w-8 h-8" />,
      image: "/images/posture-correction.png",
      color: "from-brandBlue to-brandBlue/80"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
      <Toaster position="top-right" />
      {/* Navigation Header */}
      <motion.header
        className={`fixed top-0 w-full z-[60] transition-all duration-500 ${isScrolled || isMenuOpen
          ? 'bg-white shadow-lg shadow-brandBlue/10'
          : 'bg-white/20 backdrop-blur-sm border-b border-white/40'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">

            <motion.a
              href="#home"
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="/images/logo.png"
                alt="Activerehab Logo"
                className="h-14 md:h-16 w-auto object-contain transition-all duration-300"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`font-semibold text-sm transition-colors duration-300 relative group ${isScrolled ? 'text-gray-700 hover:text-brandBlue' : 'text-white hover:text-brandOrange'
                    }`}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brandOrange transition-all duration-300 group-hover:w-full rounded-full"></span>
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <motion.a
                href="tel:+919000229040"
                className={`hidden md:flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${isScrolled
                  ? 'bg-brandBlue text-white hover:bg-brandBlue/90 shadow-lg shadow-brandBlue/25'
                  : 'bg-white/20 text-white border border-white/40 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
                <span>+91 9000229040</span>
              </motion.a>

              {/* Mobile Menu Toggle */}
              <button
                className={`lg:hidden p-2 rounded-lg transition-colors relative z-10 ${isScrolled || isMenuOpen ? 'text-brandBlue hover:bg-brandBlue/10' : 'text-white hover:bg-white/20'
                  }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-6 flex flex-col space-y-1">
                {navLinks.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-brandBlue font-semibold py-3 px-4 rounded-xl hover:bg-brandBlue/5 transition-all flex items-center justify-between group"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.07 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const targetId = item.href.replace('#', '');
                      const element = document.getElementById(targetId);
                      if (element) {
                        setTimeout(() => {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-brandOrange opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.a>
                ))}
                <motion.a
                  href="tel:+919000229040"
                  className="mt-4 bg-brandBlue text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-brandBlue/20 flex items-center justify-center space-x-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 9000229040</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="pt-24 min-h-screen flex items-center relative overflow-hidden bg-brandBlue scroll-mt-20">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/herobg.mp4" type="video/mp4" />
          </video>
          {/* Cinematic Dark Overlay for Maximum Readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-12 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              className="space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hyderabad's{" "}
                <span className="text-brandOrange underline decoration-white/20 underline-offset-8 drop-shadow-md">
                  Best Chiropractic
                </span>{" "}
                Center
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-white font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                At Activerehab, we offer personalized treatment plans that focus on your unique health goals. As the best chiropractic center in Hyderabad, our team of experienced professionals is dedicated to helping you achieve optimal wellness.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.a
                  href="tel:+919000229040"
                  className="bg-brandBlue text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Consult Now</span>
                  <ChevronRight className="w-5 h-5 text-brandOrange" />
                </motion.a>

                <motion.a
                  href="#contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-brandBlue transition-all duration-300 flex items-center justify-center space-x-3 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Clock className="w-5 h-5" />
                  <span>Make an Appointment</span>
                </motion.a>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8 pt-2 lg:pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">5,000+ Satisfied Patients</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-brandOrange/30 shadow-lg">
                  <Award className="w-5 h-5 text-brandOrange" />
                  <span className="text-white font-bold">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">4 Branch Clinics</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative order-last lg:order-last w-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/20 via-white/5 to-brandOrange/20 shadow-2xl backdrop-blur-md">
                <div className="bg-black/40 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 lg:p-10 border border-white/10">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Book Appointment</h3>
                  <p className="text-slate-300 font-medium mb-8 text-sm sm:text-base">Fill out the form below and we will contact you shortly.</p>

                  <form ref={heroFormRef} onSubmit={handleHeroSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 flex flex-col items-start w-full">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Full Name</label>
                        <input
                          type="text"
                          name="user_name"
                          required
                          placeholder="John Doe"
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/50 transition-all duration-300 text-white font-medium placeholder:text-slate-400 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5 flex flex-col items-start w-full">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Phone</label>
                        <input
                          type="tel"
                          name="user_phone"
                          required
                          placeholder="+91 000 000 0000"
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/50 transition-all duration-300 text-white font-medium placeholder:text-slate-400 outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 flex flex-col items-start w-full">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Email Address</label>
                        <input
                          type="email"
                          name="user_email"
                          placeholder="john@example.com"
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/50 transition-all duration-300 text-white font-medium placeholder:text-slate-400 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 flex flex-col items-start w-full sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Your Area / Location</label>
                        <input
                          type="text"
                          name="user_location"
                          required
                          placeholder="e.g. Gachibowli"
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/50 transition-all duration-300 text-white font-medium placeholder:text-slate-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 flex flex-col items-start w-full">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Your Condition / Message</label>
                      <textarea
                        name="message"
                        required
                        placeholder="Briefly describe your conditon..."
                        rows={3}
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/50 transition-all duration-300 text-white font-medium placeholder:text-slate-400 resize-none outline-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isHeroSubmitting}
                      className={`w-full bg-brandOrange text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-brandOrange/20 hover:shadow-xl hover:bg-orange-600 transition-all duration-300 flex justify-center items-center space-x-2 ${isHeroSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      whileHover={!isHeroSubmitting ? { y: -2 } : {}}
                      whileTap={!isHeroSubmitting ? { scale: 0.98 } : {}}
                    >
                      <span>{isHeroSubmitting ? 'Sending Request...' : 'Request Appointment'}</span>
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Conditions Section - Premium Redesign */}
      <section id="services" className="py-20 lg:py-32 bg-slate-50/50 relative overflow-hidden scroll-mt-20">
        {/* Cinematic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brandOrange/5 rounded-full blur-[120px] translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="text-brandOrange font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
              initial={{ opacity: 0, tracking: "0.1em" }}
              whileInView={{ opacity: 1, tracking: "0.3em" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              Specialized Care
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
              Your <span className="text-brandBlue">Pain,</span> <span className="text-brandOrange">Our Expertise</span>
            </h2>
            <div className="w-24 h-1.5 bg-brandBlue mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              We provide advanced clinical assessment and personalized treatment plans for a wide range of neuro-musculoskeletal conditions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {[
              { ...painConditions[0], icon: <LifeBuoy className="w-8 h-8" />, color: "blue" },
              { ...painConditions[1], icon: <Activity className="w-8 h-8" />, color: "cyan" },
              { ...painConditions[2], icon: <Brain className="w-8 h-8" />, color: "purple" },
              { ...painConditions[3], icon: <Zap className="w-8 h-8" />, color: "indigo" },
              { ...painConditions[4], icon: <Stethoscope className="w-8 h-8" />, color: "emerald" },
              { ...painConditions[5], icon: <ShieldCheck className="w-8 h-8" />, color: "orange" },
              { ...painConditions[6], icon: <History className="w-8 h-8" />, color: "rose" },
              { ...painConditions[7], icon: <ChevronDown className="w-8 h-8" />, color: "sky" },
            ].map((condition, index) => (
              <InteractiveCard key={index} condition={condition} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Premium Overhaul */}
      <section id="contact" className="py-24 lg:py-32 bg-slate-50/30 relative overflow-hidden scroll-mt-20">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brandOrange/5 rounded-full blur-[120px] translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brandBlue font-black tracking-[0.3em] uppercase text-xs mb-6 block">Ready to start?</span>
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">
              Get in <span className="text-brandBlue">Touch</span>
            </h2>
            <div className="w-24 h-2 bg-brandBlue mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Take the first step towards a pain-free life. Our expert team is here to support your recovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto items-start">

            {/* Left: Contact Info Cards */}
            <motion.div
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight flex items-center">
                Contact <span className="text-brandBlue ml-2">Channels</span>
                <div className="ml-4 h-px flex-grow bg-slate-100"></div>
              </h3>

              {[
                { icon: <Phone className="w-6 h-6" />, label: "Call Us Anytime", value: "+91 9000229040", desc: "Available Mon-Sat", color: "blue" },
                { icon: <Mail className="w-6 h-6" />, label: "Email Support", value: "activerehab.in@gmail.com", desc: "Quick response time", color: "orange" },
                { icon: <MapPin className="w-6 h-6" />, label: "Kondapur Branch", value: "Plot No. 1272, 80 Feet Road", desc: "above Burfi Ghar, Rajarajeshwara Colony, Kondapur", color: "blue" },
                { icon: <MapPin className="w-6 h-6" />, label: "Kompally Branch", value: "Petbasheerabad, Quthbullapur", desc: "opp. Decathlon, Kompally, Hyderabad", color: "orange" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group flex items-center space-x-6 bg-white/50 backdrop-blur-md border border-white p-6 rounded-[2rem] hover:shadow-2xl hover:shadow-brandBlue/5 transition-all duration-500"
                  whileHover={{ x: 10 }}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 ${item.color === 'blue' ? 'bg-brandBlue text-white group-hover:bg-brandBlue/90' : 'bg-brandOrange text-white'
                    }`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</div>
                    <div className="text-lg font-black text-slate-900 leading-none mb-1">
                      {item.label === 'Call Us Anytime' ? (
                        <a href="tel:+919000229040" className="hover:text-brandBlue">{item.value}</a>
                      ) : item.label === 'Email Support' ? (
                        <a href="mailto:activerehab.in@gmail.com" className="hover:text-brandBlue">{item.value}</a>
                      ) : item.label === 'Kondapur Branch' ? (
                        <a
                          href="https://maps.google.com/?q=Plot No. 1272, 80 Feet Road, above Burfi Ghar, Rajarajeshwara Colony, Kondapur, Telangana 500084"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-brandBlue"
                        >
                          {item.value}
                        </a>
                      ) : item.label === 'Kompally Branch' ? (
                        <a
                          href="https://maps.google.com/?q=Petbasheerabad, Quthbullapur, opp. Decathlon, Kompally, Hyderabad, Telangana 500055"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-brandBlue"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-500">{item.desc}</div>
                  </div>
                </motion.div>
              ))}

              {/* Working Hours Floating Badge */}
              <div className="mt-12 p-8 bg-gradient-to-br from-brandBlue to-brandBlue/80 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="relative z-10 flex items-center space-x-6">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight">Clinic Timing</h4>
                    <p className="text-blue-100 font-bold">Mon - Sat: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Glassmorphism Appointment Form */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-br from-white via-white to-brandOrange/20 shadow-2xl">
                <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] p-10 lg:p-14">
                  <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Book Appointment</h3>
                  <p className="text-slate-500 font-bold mb-10">Fill out the form below and we will contact you shortly.</p>

                  <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                        <input
                          type="text"
                          name="user_name"
                          required
                          placeholder="John Doe"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-brandBlue focus:ring-4 focus:ring-brandBlue/5 transition-all duration-300 font-bold placeholder:text-slate-300 outline-none"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Phone</label>
                        <input
                          type="tel"
                          name="user_phone"
                          required
                          placeholder="+91 000 000 0000"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-brandBlue focus:ring-4 focus:ring-brandBlue/5 transition-all duration-300 font-bold placeholder:text-slate-300 outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                        <input
                          type="email"
                          name="user_email"
                          placeholder="john@example.com"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-brandBlue focus:ring-4 focus:ring-brandBlue/5 transition-all duration-300 font-bold placeholder:text-slate-300 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2 text-left">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Your Area / Location</label>
                        <input
                          type="text"
                          name="user_location"
                          required
                          placeholder="e.g. Gachibowli"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-brandBlue focus:ring-4 focus:ring-brandBlue/5 transition-all duration-300 font-bold placeholder:text-slate-300 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Your Condition / Message</label>
                      <textarea
                        name="message"
                        required
                        placeholder="Briefly describe your conditon..."
                        rows={4}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-brandBlue focus:ring-4 focus:ring-brandBlue/5 transition-all duration-300 font-bold placeholder:text-slate-300 resize-none outline-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isContactSubmitting}
                      className={`w-full bg-gradient-to-r ${isContactSubmitting ? 'from-slate-400 to-slate-500 cursor-not-allowed' : 'from-brandBlue to-brandBlue/90 hover:shadow-2xl hover:shadow-brandBlue/40 cursor-pointer'} text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brandBlue/20 transition-all duration-500 relative overflow-hidden group flex items-center justify-center space-x-2`}
                      whileHover={!isContactSubmitting ? { y: -5 } : {}}
                      whileTap={!isContactSubmitting ? { scale: 0.98 } : {}}
                    >
                      <span className="relative z-10">{isContactSubmitting ? 'Sending Request...' : 'Request Appointment'}</span>
                      {!isContactSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-brandOrange to-brandOrange/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>}
                    </motion.button>
                  </form>

                  <p className="text-center mt-8 text-[10px] font-bold text-slate-400 leading-relaxed max-w-sm mx-auto">
                    By submitting this form, you agree to our contact terms. We respect your privacy and will never share your details.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctor Profile Section - Artistic Redesign */}
      <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden scroll-mt-20">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left: Artistic Image Layout */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10">
                {/* Floating Geometric Shapes */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-brandOrange/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brandBlue/10 rounded-full blur-3xl"></div>

                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(46,67,134,0.25)] border-[12px] border-white">
                  <img
                    src="/images/doctorphoto.jpg"
                    alt="Dr. Ashok P. Kota - Best Chiropractor in Hyderabad"
                    loading="lazy"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Floating Identity Label */}
                  <div className="absolute bottom-6 left-6 right-6 bg-brandBlue/90 backdrop-blur-md p-6 rounded-2xl text-white border border-white/20 shadow-2xl">
                    <h3 className="text-xl font-black uppercase tracking-tighter">Dr. Ashok P. Kota</h3>
                    <p className="text-brandOrange font-bold text-sm tracking-[0.2em] uppercase">Master of Chiropractic</p>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-100 z-20 hidden md:block"
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brandBlue/5 rounded-2xl flex items-center justify-center mb-2">
                    <Award className="w-8 h-8 text-brandBlue" />
                  </div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">Awarded</div>
                  <div className="text-xl font-black text-brandBlue">Best Doctor</div>
                  <div className="text-xs font-bold text-brandOrange">Excellence Award</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Premium Content Layout */}
            <motion.div
              className="lg:col-span-7 space-y-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <span className="text-brandBlue font-black tracking-[0.3em] uppercase text-xs">Excellence in Healthcare</span>
                <h2 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1]">
                  Meet Our <span className="text-brandBlue">Expert</span>
                </h2>
                <div className="w-20 h-2 bg-brandOrange rounded-full"></div>
              </div>

              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Activerehab Chiropractic Centre is more than just a clinic—it's your premier destination in Kondapur and Kompally, Hyderabad, where your health and comfort are our top priorities. As the best chiropractic center in Hyderabad, our expert team, led by Dr. Ashok P. Kota, is committed to providing personalized treatment plans tailored to your individual health needs.
              </p>

              {/* Mission & Vision Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="bg-brandBlue/5 p-6 rounded-3xl border border-brandBlue/10">
                  <h3 className="text-brandBlue font-black uppercase tracking-widest text-sm mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2" /> Our Mission
                  </h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    To Enhance Lives Through Passionate, Comprehensive Care
                  </p>
                </div>
                <div className="bg-brandOrange/5 p-6 rounded-3xl border border-brandOrange/10">
                  <h3 className="text-brandOrange font-black uppercase tracking-widest text-sm mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2" /> Our Vision
                  </h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    To Be a Leading Provider of Innovative and Patient-Centered Chiropractic Care
                  </p>
                </div>
              </div>

              {/* Premium Qualification Tags */}
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Qualifications & Mission</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { text: "Master of Chiropractic", location: "Certified", color: "blue" },
                    { text: "Rehabilitation Therapy", location: "Expert", color: "orange" },
                    { text: "Holistic Care", location: "Patient-Centered", color: "blue" },
                    { text: "Pain Relief", location: "Specialist", color: "orange" }
                  ].map((q, i) => (
                    <motion.div
                      key={i}
                      className={`px-6 py-3 rounded-full border shadow-sm flex items-center space-x-3 group cursor-default transition-all ${q.color === 'blue'
                        ? 'bg-blue-50/50 border-blue-100 hover:bg-blue-100 hover:border-brandBlue/30'
                        : 'bg-orange-50/50 border-orange-100 hover:bg-orange-100 hover:border-brandOrange/30'
                        }`}
                      whileHover={{ y: -3 }}
                    >
                      <CheckCircle className={`w-5 h-5 ${q.color === 'blue' ? 'text-brandBlue' : 'text-brandOrange'}`} />
                      <span className="font-bold text-slate-800 text-sm whitespace-nowrap">
                        {q.text} <span className="opacity-40 font-medium">({q.location})</span>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated Stats Bar */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                {[
                  { label: "Years Exp", value: "15+", color: "text-brandBlue" },
                  { label: "Patients", value: "5,000+", color: "text-brandOrange" },
                  { label: "Branch Clinics", value: "4", color: "text-brandBlue" }
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left group">
                    <div className={`text-4xl font-black ${stat.color} mb-1 transition-transform group-hover:scale-110`}>{stat.value}</div>
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Services Section - Super-Premium Overhaul */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Editorial Background Text */}
        <div className="absolute top-1/2 left-0 w-full text-[20vw] font-black text-slate-50 leading-none select-none pointer-events-none -translate-y-1/2 opacity-50 uppercase tracking-tighter">
          Excellence
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brandBlue font-black tracking-[0.3em] uppercase text-xs mb-6 block">Our Methodology</span>
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">
              Start Your Journey to <span className="text-brandBlue">Better Health</span>
            </h2>
            <div className="w-24 h-2 bg-brandOrange mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium italic">
              "A comprehensive, science-led approach to spine and joint care."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 lg:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -mr-36 -mt-36"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-100/30 rounded-full blur-3xl -ml-36 -mb-36"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brandBlue font-bold tracking-widest uppercase text-[10px] mb-3 block underline decoration-brandOrange decoration-2 underline-offset-8">Testimonials</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">Patient <span className="text-brandBlue">Success</span> <span className="text-brandOrange">Stories</span></h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Experience the journey of recovery through the words of those who have regained their active lifestyles.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Decorative Quote Mark */}
              <div className="absolute -top-8 -left-6 text-blue-100 opacity-40 hidden lg:block">
                <Quote size={80} fill="currentColor" />
              </div>

              <motion.div
                className="bg-white rounded-2xl lg:rounded-[2.5rem] shadow-xl p-6 lg:p-12 border border-gray-100 relative overflow-hidden"
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 bg-brandBlue rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-brandBlue/20">
                        {testimonials[activeTestimonial].name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-brandOrange p-1.5 rounded-full shadow-lg border-2 border-white">
                        <Star size={12} fill="white" className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brandBlue">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-brandOrange font-bold text-xs">{testimonials[activeTestimonial].time}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="flex mb-4 space-x-1 justify-center lg:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < testimonials[activeTestimonial].rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <blockquote className="text-lg lg:text-xl text-gray-800 font-medium leading-relaxed mb-6 relative text-center lg:text-left">
                      <span className="text-blue-600 text-2xl leading-none font-serif ml-[-1rem] mr-1">"</span>
                      {testimonials[activeTestimonial].content}
                      <span className="text-blue-600 text-2xl leading-none font-serif ml-1">"</span>
                    </blockquote>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
                  <button
                    onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brandBlue hover:text-white transition-all duration-300 border border-gray-200"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>

                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <button
                    onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brandBlue hover:text-white transition-all duration-300 border border-gray-200"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="mt-8 flex justify-center lg:justify-end space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${index === activeTestimonial
                        ? 'bg-brandOrange w-8'
                        : 'bg-gray-200 hover:bg-gray-300 w-1.5'
                        }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Re-designed Professional Footer */}
      <footer className="bg-[#0f172a] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand & About */}
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-7 h-7 text-brandBlue" />
                </div>
                <div className="text-2xl font-bold tracking-tight">
                  <span className="text-white">ACTIVEREHAB</span>{" "}
                  <span className="text-brandOrange">CENTRE</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
                Premium specialized care for neuro-musculoskeletal conditions. We merge traditional expertise with modern treatments for optimal recovery.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                {[
                  { icon: <Facebook className="w-5 h-5" />, href: "#" },
                  { icon: <Instagram className="w-5 h-5" />, href: "#" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "#" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brandOrange transition-colors duration-300"
                    whileHover={{ y: -4 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-8 relative inline-block uppercase tracking-wider">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brandOrange rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Services', href: '#services' },
                  { name: 'Success Stories', href: '#testimonials' },
                  { name: 'Book Appointment', href: '#contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                      <ChevronRight className="w-4 h-4 text-brandOrange opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="text-lg font-bold mb-8 relative inline-block uppercase tracking-wider">
                Specialized Care
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brandOrange rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {['Spine Adjustment', 'Joint Pain Treatment', 'Sciatica Care', 'Post-Op Rehab', 'Chronic Pain Management'].map((service) => (
                  <li key={service}>
                    <span className="text-slate-400 flex items-center">
                      <Zap className="w-4 h-4 text-brandOrange mr-2" />
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-lg font-bold mb-8 relative inline-block uppercase tracking-wider">
                Connect With Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brandOrange rounded-full"></span>
              </h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brandBlue/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-brandOrange" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Our Locations</p>
                    <p className="text-white font-medium">Kondapur & Kompally, Hyderabad</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brandOrange/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-brandOrange" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Emergency Call</p>
                    <p className="text-white font-medium">+91 9000229040</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-50 flex items-center justify-center"
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
        >
          <ArrowUp size={24} />
        </motion.button>

        {/* Floating Call Button */}
        <motion.a
          href="tel:+919000229040"
          className="fixed bottom-8 left-8 bg-brandBlue text-white p-4 rounded-full shadow-2xl hover:bg-brandBlue/90 shadow-brandBlue/30 transition-all duration-300 z-50 flex items-center justify-center group"
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Phone className="w-8 h-8" />
          <span className="absolute left-full ml-4 whitespace-nowrap bg-white text-slate-800 text-sm font-bold px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0">
            Call us
          </span>
        </motion.a>

        {/* Floating WhatsApp Button */}
        <motion.a
          href="https://wa.me/919000229040?text=Hello!%20I%20would%20like%20to%20enquire%20about%20your%20services."
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] shadow-[#25D366]/30 transition-all duration-300 z-50 flex items-center justify-center group"
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <WhatsAppIcon className="w-8 h-8" />
          <span className="absolute right-full mr-4 whitespace-nowrap bg-white text-slate-800 text-sm font-bold px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none -translate-x-4 group-hover:translate-x-0">
            Chat with us
          </span>
        </motion.a>
      </footer>
    </div>
  );
};

export default HomePage;
