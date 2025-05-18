import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Database } from "lucide-react";
const HomePage = () => {
  return <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-blue/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="container max-w-5xl mx-auto text-center">
          <div className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 animate-fade-in-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink glow-purple">
              XINETEE
            </span>
          </div>
          
          <h1 className="mb-6 animate-fade-in-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink">
              Secure. Decentralized. Yours.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground animate-fade-in-up" style={{
          animationDelay: "0.1s"
        }}>
            The next generation of file storage. Powered by blockchain technology 
            and triple-layer encryption protocols.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{
          animationDelay: "0.2s"
        }}>
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground glow glow-purple">
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-neon-blue text-neon-blue hover:bg-neon-blue/10">
              <Link to="/invest">Invest</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="container max-w-5xl mx-auto py-12">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">Military-grade Security</Badge>
          <h2 className="mb-4">3-Layer Security Model</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides unmatched security through a proprietary three-layer 
            protection system that keeps your data safe and accessible only to you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center animate-fade-in-up">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Encryption Layer</h3>
            <p className="text-sm text-muted-foreground">
              Files are encrypted client-side with AES-256 before they ever leave your device.
              Your encryption keys never touch our servers.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center animate-fade-in-up" style={{
          animationDelay: "0.1s"
        }}>
            <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-neon-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Blockchain Layer</h3>
            <p className="text-sm text-muted-foreground">
              File signatures are stored on our immutable blockchain, preventing tampering
              and providing verifiable proof of ownership and integrity.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center animate-fade-in-up" style={{
          animationDelay: "0.2s"
        }}>
            <div className="w-12 h-12 rounded-full bg-neon-pink/20 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-neon-pink" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Distribution Layer</h3>
            <p className="text-sm text-muted-foreground">
              Data chunks are distributed across a global network of nodes,
              ensuring redundancy and eliminating single points of failure.
            </p>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="container max-w-5xl mx-auto py-12">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-2">See It In Action</Badge>
          <h2 className="mb-4">Watch How Xinetee Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A quick demonstration of our technology and how it keeps your data safe.
          </p>
        </div>
        
        <div className="aspect-video rounded-xl overflow-hidden glass-panel neon-border relative flex items-center justify-center">
          {/* This would be replaced with an actual video in production */}
          <div className="text-center p-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <p className="text-muted-foreground">Demo Video Placeholder</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neon-purple/10 via-neon-blue/10 to-neon-pink/10" />
        
        <div className="container max-w-5xl mx-auto text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the future of secure decentralized storage today.
            Your data deserves better protection.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground glow glow-purple">
              <Link to="/dashboard">Launch Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to="/learn">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default HomePage;