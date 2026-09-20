/**
 * SamagriSetu3DTopology.tsx
 * Re-exports the newly redesigned SamagriSetuHarmonizationScene
 * to preserve backwards compatibility across existing pages.
 */

import React from 'react';
import { SamagriSetuHarmonizationScene } from '../harmonization-flow/SamagriSetuHarmonizationScene';

interface SamagriSetu3DTopologyProps {
  height?: string;
  showControls?: boolean;
  className?: string;
}

export const SamagriSetu3DTopology: React.FC<SamagriSetu3DTopologyProps> = ({
  className = '',
}) => {
  return <SamagriSetuHarmonizationScene className={className} />;
};

export { SamagriSetuHarmonizationScene };
