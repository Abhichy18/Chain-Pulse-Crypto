export default function SplineBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-gradient-to-b from-void to-surface dark:bg-void overflow-hidden">
      {/* 
        The iframe is scaled and shifted slightly to hide the default "Built with Spline" watermark
        while still displaying the interactive scene perfectly.
      */}
      <iframe 
        src="https://my.spline.design/unchained-tttU1L8OdirFYL5Y0u2DKoc6/" 
        className="absolute top-0 left-0 w-[calc(100%+120px)] h-[calc(100%+120px)] -mt-[60px] -ml-[60px] border-none outline-none pointer-events-auto"
        title="Spline 3D Background"
      />

      {/* 
        Subtle dark overlay to guarantee text readability and dim the scene slightly.
        pointer-events-none ensures we can still interact with the Spline canvas underneath
      */}
      <div className="absolute inset-0 bg-void/60 pointer-events-none" />
    </div>
  );
}
