import { GradientButton } from "@/components/ui/gradient-button"

export function GradientButtonDemo() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Gradient Button Variants</h2>
        <div className="flex gap-8 flex-wrap">
          <div className="flex flex-col gap-4">
            <h3 className="font-medium">Default Variant</h3>
            <GradientButton>Get Started</GradientButton>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-medium">Alternative Variant</h3>
            <GradientButton variant="variant">Get Started</GradientButton>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Different Sizes & Content</h3>
        <div className="flex gap-4 flex-wrap items-center">
          <GradientButton className="px-6 py-2 text-sm">Small</GradientButton>
          <GradientButton>Medium</GradientButton>
          <GradientButton className="px-12 py-5 text-lg">Large</GradientButton>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">With Icons</h3>
        <div className="flex gap-4 flex-wrap">
          <GradientButton>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Get Pro
          </GradientButton>
          <GradientButton variant="variant">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Now
          </GradientButton>
        </div>
      </div>
    </div>
  )
} 