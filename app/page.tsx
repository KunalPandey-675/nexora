"use client";

import Link from "next/link";
import { PricingTable } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookPlus, Users, MessageSquare, TrendingUp, Sparkles, Zap, Brain, Mic2, Target, ArrowRight } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <h3 ref={ref} className="text-4xl font-bold mb-2 text-text-primary">0</h3>;
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;
type EaseTuple = [number, number, number, number];
const easingCurve: EaseTuple = [...ease];

const Page = () => {
  return (
    <main className="min-h-screen p-0! max-w-none! gap-0!">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-24 bg-surface">
        {/* Subtle mesh gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-125 h-125 bg-accent-blue/4 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-150 h-150 bg-cta-gold/5 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-accent-blue/2 rounded-full blur-[80px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easingCurve }}
            >
              <Badge className="mb-8 px-4 py-2 text-xs font-medium border-accent-blue/20 bg-accent-blue/6 text-accent-blue tracking-wide uppercase" variant="outline">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mr-2 inline-block animate-pulse" />
                Voice-Powered Learning
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-[4.25rem] font-bold mb-6 tracking-tight leading-[1.1] text-text-primary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easingCurve }}
            >
              Master anything with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-linear-to-r from-text-primary via-accent-blue to-text-primary bg-clip-text">Nexora</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.75 bg-linear-to-r from-cta-gold/60 to-cta-gold/20 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.7, ease: easingCurve }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: easingCurve }}
            >
              Learn through natural conversation. Your personal AI tutor adapts 
              to your pace and makes learning feel effortless.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easingCurve }}
            >
              <Link href="/mentor/new-mentor">
                <Button size="lg" className="bg-cta text-white hover:bg-cta/90 shadow-[0_2px_8px_rgba(26,26,46,0.15)] hover:shadow-[0_4px_16px_rgba(26,26,46,0.2)] transition-all duration-300 group rounded-xl px-6">
                  <BookPlus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  Create Your Mentor
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-sunken hover:border-border-default transition-all duration-300 rounded-xl px-6">
                  See How It Works
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface-raised border-y border-border-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, value: 500, suffix: "+", label: "Active Learners" },
              { icon: MessageSquare, value: 2000, suffix: "+", label: "Conversations" },
              { icon: TrendingUp, value: 95, suffix: "%", label: "Success Rate" },
              { icon: Brain, value: 200, suffix: "+", label: "AI Mentors" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easingCurve }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-sunken mb-4 border border-border-subtle"
                  whileHover={{ scale: 1.05, borderColor: "var(--accent-blue)" }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className="w-5 h-5 text-accent-blue" />
                </motion.div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-text-tertiary text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easingCurve }}
          >
            <p className="text-accent-blue text-sm font-semibold tracking-wide uppercase mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary tracking-tight">
              Learning, reimagined
            </h2>
            <p className="text-lg text-text-secondary">
              No more boring lectures. Natural conversations that actually stick.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Talk Naturally",
                description: "No scripts or rigid formats. Just speak your mind and get instant, intelligent responses.",
                delay: 0,
              },
              {
                icon: Target,
                title: "Your Mentor, Your Rules",
                description: "Design mentors with specific expertise, teaching styles, and personalities that match your vibe.",
                delay: 0.08,
              },
              {
                icon: Brain,
                title: "Actually Learn",
                description: "Track progress, review conversations, and see your knowledge grow with detailed insights.",
                delay: 0.16,
              },
            ].map((feature) => (
              <motion.div 
                key={feature.title}
                className="relative p-7 rounded-2xl bg-surface-raised border border-border-subtle overflow-hidden group hover:border-border-default transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay, ease: easingCurve }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/3 rounded-full -mr-12 -mt-12 group-hover:bg-accent-blue/6 transition-colors duration-500" />
                <div className="w-11 h-11 rounded-xl bg-cta flex items-center justify-center mb-5 shadow-[0_2px_8px_rgba(26,26,46,0.12)]">
                  <feature.icon className="w-5 h-5 text-cta-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-text-primary">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Video Section */}
      <section id="how-it-works" className="py-24 bg-surface-raised border-y border-border-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easingCurve }}
            >
              <p className="text-accent-blue text-sm font-semibold tracking-wide uppercase mb-3">Demo</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary tracking-tight">
                See it in action
              </h2>
              <p className="text-lg text-text-secondary">
                Watch how Nexora turns conversations into learning moments
              </p>
            </motion.div>
            
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-border-subtle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easingCurve }}
            >
              <div className="aspect-video bg-cta/5">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/im_RhrmZs4o"
                  title="How Nexora Works"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easingCurve }}
          >
            <p className="text-accent-blue text-sm font-semibold tracking-wide uppercase mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-text-secondary">
              Start free. Upgrade when you need more.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easingCurve }}
          >
            <PricingTable />
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-surface-raised border-t border-border-subtle">
        <div className="container mx-auto px-6">
          <motion.div 
            className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easingCurve }}
          >
            {/* Refined gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-[#1a1a2e] via-[#1e1e3a] to-[#1a1a2e]">
              <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent-blue/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cta-gold/8 rounded-full blur-[100px]" />
            </div>
            
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: easingCurve }}
              >
                <Badge className="mb-6 px-3.5 py-1.5 bg-cta-gold/15 text-cta-gold border-cta-gold/20 text-xs tracking-wide" variant="outline">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
                  Join 50,000+ Learners
                </Badge>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-5 text-white tracking-tight"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08, ease: easingCurve }}
              >
                Ready to start learning?
              </motion.h2>
              
              <motion.p 
                className="text-base md:text-lg mb-8 text-white/60 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.16, ease: easingCurve }}
              >
                Create your first AI mentor in minutes. No credit card required.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.24, ease: easingCurve }}
              >
                <Link href="/mentor/new-mentor">
                  <Button size="lg" className="bg-cta-gold text-cta hover:bg-cta-gold/90 shadow-[0_2px_12px_rgba(212,168,83,0.25)] font-semibold rounded-xl px-6 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,168,83,0.35)]">
                    <BookPlus className="mr-2 h-4 w-4" />
                    Create Your First Mentor
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="bg-white/6 text-white/80 border-white/12 hover:bg-white/10 hover:text-white hover:border-white/20 backdrop-blur-sm rounded-xl px-6 transition-all duration-300">
                    Explore Dashboard
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Page;
