import React, { useState, useRef } from 'react'
import { createPortal } from 'react-dom'

interface MultiSkillIconProps {
  icons: string[]
  subSkills?: { name: string; icon: string }[]
  size?: number // px size, e.g. 44, 48
  className?: string
  showTooltip?: boolean
  currentLevel?: number
  cornerBadge?: React.ReactNode
  tooltipPlacement?: 'top' | 'bottom'
}

export const MultiSkillIcon: React.FC<MultiSkillIconProps> = ({
  icons,
  subSkills,
  size = 44,
  className = '',
  showTooltip = true,
  currentLevel,
  cornerBadge,
  tooltipPlacement = 'bottom'
}) => {
  const count = icons.length
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null)

  const handleOpenTooltip = () => {
    if (!showTooltip || !subSkills || subSkills.length === 0) return
    if (containerRef.current) {
      setTooltipRect(containerRef.current.getBoundingClientRect())
    }
  }

  const handleCloseTooltip = () => {
    setTooltipRect(null)
  }

  // Fallback to single icon
  if (count <= 1) {
    return (
      <div
        className={`relative rounded-lg overflow-hidden border border-[#475569] bg-[#111624] shadow-inner shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={icons[0] || './icons/lethe/eye_of_eternity.png'}
          alt="Skill icon"
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = './icons/lethe/eye_of_eternity.png'
          }}
        />
        {cornerBadge && (
          <div className="absolute bottom-0 right-0 z-20 pointer-events-none select-none">
            {cornerBadge}
          </div>
        )}
      </div>
    )
  }

  // 2 SKILLS: Diagonal Split (From Top-Left to Bottom-Right like in MapleStory)
  // Half 1: Top-Right triangle: polygon(0% 0%, 100% 0%, 100% 100%)
  // Half 2: Bottom-Left triangle: polygon(0% 0%, 100% 100%, 0% 100%)
  const renderTwoSkills = () => (
    <div
      className="relative w-full h-full overflow-hidden bg-[#111624]"
      style={{ width: size, height: size }}
    >
      {/* Skill 1 (Top-Right half) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)' }}
      >
        <img
          src={icons[1] || icons[0]}
          alt="Skill 1"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Skill 0 (Bottom-Left half) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)' }}
      >
        <img
          src={icons[0]}
          alt="Skill 0"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Diagonal dividing line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="#090d16"
          strokeWidth="3.2"
        />
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="#f1f5f9"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  )

  // 3 SKILLS: Y Split (True Y shape: top quadrant, bottom-left, bottom-right)
  // Divider 1: (50%, 50%) -> (0%, 0%)
  // Divider 2: (50%, 50%) -> (100%, 0%)
  // Divider 3: (50%, 50%) -> (50%, 100%)
  const renderThreeSkills = () => (
    <div
      className="relative w-full h-full overflow-hidden bg-[#111624]"
      style={{ width: size, height: size }}
    >
      {/* Top wedge */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)' }}
      >
        <img src={icons[0]} alt="Skill 1" className="w-full h-full object-cover" />
      </div>

      {/* Bottom-Left wedge */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(50% 50%, 0% 0%, 0% 100%, 50% 100%)' }}
      >
        <img src={icons[1] || icons[0]} alt="Skill 2" className="w-full h-full object-cover" />
      </div>

      {/* Bottom-Right wedge */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%, 50% 100%)' }}
      >
        <img src={icons[2] || icons[0]} alt="Skill 3" className="w-full h-full object-cover" />
      </div>

      {/* Y dividing lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Dark drop shadow for contrast */}
        <line x1="50" y1="50" x2="0" y2="0" stroke="#090d16" strokeWidth="3" />
        <line x1="50" y1="50" x2="100" y2="0" stroke="#090d16" strokeWidth="3" />
        <line x1="50" y1="50" x2="50" y2="100" stroke="#090d16" strokeWidth="3" />
        {/* Crisp light line */}
        <line x1="50" y1="50" x2="0" y2="0" stroke="#f1f5f9" strokeWidth="1.2" />
        <line x1="50" y1="50" x2="100" y2="0" stroke="#f1f5f9" strokeWidth="1.2" />
        <line x1="50" y1="50" x2="50" y2="100" stroke="#f1f5f9" strokeWidth="1.2" />
      </svg>
    </div>
  )

  // 4 SKILLS: X Split (4 triangular quadrants meeting at center)
  // Top: polygon(50% 50%, 0% 0%, 100% 0%)
  // Right: polygon(50% 50%, 100% 0%, 100% 100%)
  // Bottom: polygon(50% 50%, 100% 100%, 0% 100%)
  // Left: polygon(50% 50%, 0% 100%, 0% 0%)
  const renderFourSkills = () => (
    <div
      className="relative w-full h-full overflow-hidden bg-[#111624]"
      style={{ width: size, height: size }}
    >
      {/* Top */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)' }}
      >
        <img src={icons[0]} alt="Skill 1" className="w-full h-full object-cover" />
      </div>

      {/* Right */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%)' }}
      >
        <img src={icons[1] || icons[0]} alt="Skill 2" className="w-full h-full object-cover" />
      </div>

      {/* Bottom */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(50% 50%, 100% 100%, 0% 100%)' }}
      >
        <img src={icons[2] || icons[0]} alt="Skill 3" className="w-full h-full object-cover" />
      </div>

      {/* Left */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(50% 50%, 0% 100%, 0% 0%)' }}
      >
        <img src={icons[3] || icons[0]} alt="Skill 4" className="w-full h-full object-cover" />
      </div>

      {/* X dividing lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="#090d16" strokeWidth="3.2" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#090d16" strokeWidth="3.2" />
        <line x1="0" y1="0" x2="100" y2="100" stroke="#f1f5f9" strokeWidth="1.2" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#f1f5f9" strokeWidth="1.2" />
      </svg>
    </div>
  )

  const renderPortalTooltip = () => {
    if (!tooltipRect || !showTooltip || !subSkills || subSkills.length === 0) return null
    if (typeof document === 'undefined') return null

    const placeTop =
      tooltipPlacement === 'top' ||
      (window.innerHeight - tooltipRect.bottom < 180 && tooltipRect.top > 180)

    const left = Math.max(12, Math.min(window.innerWidth - 280, tooltipRect.left))
    const arrowOffset = Math.max(12, Math.min(240, tooltipRect.left + tooltipRect.width / 2 - left - 6))

    const style: React.CSSProperties = placeTop
      ? {
          position: 'fixed',
          left,
          bottom: window.innerHeight - tooltipRect.top + 8,
          zIndex: 9999
        }
      : {
          position: 'fixed',
          left,
          top: tooltipRect.bottom + 8,
          zIndex: 9999
        }

    return createPortal(
      <div
        style={style}
        className="min-w-[260px] max-w-xs bg-slate-900/98 border border-purple-500/90 rounded-xl p-3 shadow-2xl backdrop-blur-md pointer-events-none animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Pointer arrow */}
        {placeTop ? (
          <div
            style={{ left: arrowOffset }}
            className="absolute -bottom-1.5 w-3 h-3 bg-slate-900 border-r border-b border-purple-500/90 rotate-45"
          />
        ) : (
          <div
            style={{ left: arrowOffset }}
            className="absolute -top-1.5 w-3 h-3 bg-slate-900 border-l border-t border-purple-500/90 rotate-45"
          />
        )}

        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] font-bold text-purple-300 uppercase tracking-wider relative z-10">
          <span>Kỹ Năng Kép ({count} in 1)</span>
          <span className="text-amber-400 font-mono">
            {currentLevel !== undefined ? `Lv ${currentLevel}` : ''}
          </span>
        </div>

        <div className="py-2 space-y-2 relative z-10">
          {subSkills.map((sub, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <img
                src={sub.icon}
                alt={sub.name}
                className="w-6 h-6 rounded border border-slate-700 object-cover shrink-0"
              />
              <span className="text-xs text-slate-100 font-semibold truncate">
                {sub.name}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400 italic relative z-10">
          Nâng 1 node sẽ đồng thời tăng cấp cho tất cả {count} kỹ năng trong nhóm.
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleOpenTooltip}
      onMouseLeave={handleCloseTooltip}
      onTouchStart={handleOpenTooltip}
      onTouchEnd={handleCloseTooltip}
      onTouchCancel={handleCloseTooltip}
      className={`relative group/multi shrink-0 ${className}`}
    >
      {/* Outer border & frame */}
      <div
        className="relative rounded-lg overflow-hidden border border-[#475569] shadow-md hover:border-purple-400 transition-colors cursor-pointer"
        style={{ width: size, height: size }}
      >
        {count === 2 && renderTwoSkills()}
        {count === 3 && renderThreeSkills()}
        {count >= 4 && renderFourSkills()}

        {cornerBadge && (
          <div className="absolute bottom-0 right-0 z-20 pointer-events-none select-none">
            {cornerBadge}
          </div>
        )}
      </div>

      {renderPortalTooltip()}
    </div>
  )
}
