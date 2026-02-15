"use client";

import Link from "next/link";
import { PricingTable } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookPlus, Users, MessageSquare, TrendingUp, Sparkles, Zap, Brain, Mic2, Target } from "lucide-react";
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

  return <h3 ref={ref} className="text-4xl font-bold mb-2">0</h3>;
};

const Page = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 bg-white">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-cta-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-200 rounded-full blur-3xl" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 px-4 py-2 text-sm font-medium border-cta/20" variant="outline">
                <Mic2 className="w-4 h-4 mr-2 inline animate-pulse" />
                Voice-Powered Learning Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Master Anything with{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Nexora</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-3 bg-cta-gold/30 -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Learn through conversation. Your personal AI tutor adapts to your pace, 
              answers your questions, and makes learning feel natural.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/mentor/new-mentor">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-cta text-white hover:bg-cta/90 shadow-lg group">
                    <BookPlus className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Create Your Mentor
                  </Button>
                </motion.div>
              </Link>
              <Link href="#how-it-works">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-gray-300">
                    Watch Demo
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm mb-4 border border-gray-100"
                whileHover={{ rotate: 360, borderColor: "#fccc41" }}
                transition={{ duration: 0.6 }}
              >
                <Users className="w-7 h-7 text-cta" />
              </motion.div>
              <AnimatedCounter value={500} suffix="+" />
              <p className="text-gray-600 font-medium">Active Learners</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm mb-4 border border-gray-100"
                whileHover={{ rotate: 360, borderColor: "#fccc41" }}
                transition={{ duration: 0.6 }}
              >
                <MessageSquare className="w-7 h-7 text-cta" />
              </motion.div>
              <AnimatedCounter value={2000} suffix="+" />
              <p className="text-gray-600 font-medium">Conversations</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm mb-4 border border-gray-100"
                whileHover={{ rotate: 360, borderColor: "#fccc41" }}
                transition={{ duration: 0.6 }}
              >
                <TrendingUp className="w-7 h-7 text-cta" />
              </motion.div>
              <AnimatedCounter value={95} suffix="%" />
              <p className="text-gray-600 font-medium">Success Rate</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm mb-4 border border-gray-100"
                whileHover={{ rotate: 360, borderColor: "#fccc41" }}
                transition={{ duration: 0.6 }}
              >
                <Brain className="w-7 h-7 text-cta" />
              </motion.div>
              <AnimatedCounter value={200} suffix="+" />
              <p className="text-gray-600 font-medium">AI Mentors</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Learning Reimagined
            </h2>
            <p className="text-xl text-gray-600">
              No more boring lectures. Just natural conversations that stick.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div 
              className="relative p-8 rounded-3xl bg-linear-to-br from-gray-50 to-white border border-gray-200 overflow-hidden group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cta-gold/5 rounded-full -mr-16 -mt-16" />
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-5"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-7 h-7 text-cta-gold" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">Talk Naturally</h3>
              <p className="text-gray-600 leading-relaxed">
                No scripts. No rigid formats. Just speak your mind and get instant, intelligent responses.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative p-8 rounded-3xl bg-linear-to-br from-gray-50 to-white border border-gray-200 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cta-gold/5 rounded-full -mr-16 -mt-16" />
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-5"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Target className="w-7 h-7 text-cta-gold" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">Your Mentor, Your Rules</h3>
              <p className="text-gray-600 leading-relaxed">
                Design mentors with specific expertise, teaching styles, and personalities that match your vibe.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative p-8 rounded-3xl bg-linear-to-br from-gray-50 to-white border border-gray-200 overflow-hidden group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cta-gold/5 rounded-full -mr-16 -mt-16" />
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-5"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Brain className="w-7 h-7 text-cta-gold" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">Actually Learn</h3>
              <p className="text-gray-600 leading-relaxed">
                Track progress, review conversations, and see your knowledge grow with detailed insights.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Video Section */}
      <section id="how-it-works" className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                See It In Action
              </h2>
              <p className="text-xl text-gray-600">
                Watch how Nexora turns conversations into learning moments
              </p>
            </motion.div>
            
            <motion.div 
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-video bg-gray-900">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pick Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you're ready to unlock everything
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PricingTable />
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="relative max-w-5xl mx-auto rounded-[3rem] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-black">
              <motion.div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-cta-gold/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-700/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
            
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-cta-gold/20 text-cta-gold border-cta-gold/30" variant="outline">
                  <Sparkles className="w-4 h-4 mr-2 inline" />
                  Join 50,000+ Learners
                </Badge>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Ready to Start Learning?
              </motion.h2>
              
              <motion.p 
                className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Create your first AI mentor in minutes. No credit card required to start.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href="/mentor/new-mentor">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-cta-gold text-black hover:bg-cta-gold/90 shadow-lg font-semibold">
                      <BookPlus className="mr-2 h-5 w-5" />
                      Create Your First Mentor
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/dashboard">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                      Explore Dashboard
                    </Button>
                  </motion.div>
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