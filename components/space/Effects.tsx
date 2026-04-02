"use client";

import { useThree } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";

export function Effects() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const isTablet = size.width < 1100;

  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={0.34} intensity={isMobile ? 0.28 : 0.44} mipmapBlur />
      {isMobile ? <></> : <DepthOfField focusDistance={0.012} focalLength={0.02} bokehScale={0.95} height={420} />}
      <Vignette eskil={false} offset={isTablet ? 0.12 : 0.16} darkness={isMobile ? 0.46 : 0.62} />
    </EffectComposer>
  );
}
