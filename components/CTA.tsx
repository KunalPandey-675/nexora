import Image from "next/image";
import Link from "next/link";
import { BookPlus, ArrowRight } from "lucide-react";

const Cta = () => {
    return (
        <section className="cta-section relative overflow-hidden">
            {/* Subtle gradient orbs */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-blue/10 rounded-full blur-[60px] -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-cta-gold/10 rounded-full blur-[50px] -ml-12 -mb-12" />
            
            <div className="relative z-10 flex flex-col items-center gap-5">
                <div className="cta-badge">Start learning your way</div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Build and Personalize Your Mentor
                </h2>
                <p className="text-white/70 max-w-md text-sm leading-relaxed">Pick a name, subject, voice & personality — and start learning through conversations that feel natural.</p>
                <Link href="/mentor/new-mentor">
                    <button className="btn-primary group">
                        <BookPlus size={18} />
                        <p>Build a New Mentor</p>
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                </Link>
            </div>
        </section>
    )
}
export default Cta