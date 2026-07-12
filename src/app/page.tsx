import { MarketingHeader } from "@/components/layout/marketing-header";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { HowItWorks } from "@/features/marketing/components/how-it-works";
import { InvestmentCalculatorSection } from "@/features/marketing/components/investment-calculator-section";
import { InfrastructureSection } from "@/features/marketing/components/infrastructure-section";
import { ProcessComparison } from "@/features/marketing/components/process-comparison";
import { ProductDisclaimer } from "@/features/marketing/components/product-disclaimer";
import { SecuritySection } from "@/features/marketing/components/security-section";

export default function HomePage() {
  return (
    <div className="bg-white">
      <MarketingHeader />
      <HeroSection />
      <HowItWorks />
      <InvestmentCalculatorSection />
      <ProcessComparison />
      <FinalCta />
      <ProductDisclaimer />
    </div>
  );
}
