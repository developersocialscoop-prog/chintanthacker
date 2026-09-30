import { useCallback, useEffect, useRef, useState } from 'react';
import { FiMoreVertical, FiMoreHorizontal } from 'react-icons/fi';
import { cn } from '../../lib/utils';

export default function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After',
    orientation = 'horizontal',
    initialPosition = 50,
    showLabels = true,
    dividerWidth = 4,
    className,
}) {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const isHorizontal = orientation === 'horizontal';

    // Move handler — updates % based on mouse/touch position
    const handleMove = useCallback(
        (clientX, clientY) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();

            if (isHorizontal) {
                const x = clientX - rect.left;
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                setPosition(percentage);
            } else {
                const y = clientY - rect.top;
                const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
                setPosition(percentage);
            }
        },
        [isHorizontal]
    );

    // Mouse down
    const handleMouseDown = useCallback(
        (e) => {
            e.preventDefault();
            setIsDragging(true);
            handleMove(e.clientX, e.clientY);
        },
        [handleMove]
    );

    // Touch start
    const handleTouchStart = useCallback(
        (e) => {
            setIsDragging(true);
            const touch = e.touches[0];
            if (touch) handleMove(touch.clientX, touch.clientY);
        },
        [handleMove]
    );

    // Global listeners while dragging
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) handleMove(e.clientX, e.clientY);
        };

        const handleTouchMove = (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                if (touch) handleMove(touch.clientX, touch.clientY);
            }
        };

        const handleEnd = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchend', handleEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, handleMove]);

    return (
        <div
            ref={containerRef}
            role="slider"
            aria-label="Before/After comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={position}
            tabIndex={0}
            className={cn(
                'relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 select-none',
                'aspect-[4/5]',
                isHorizontal ? 'cursor-ew-resize' : 'cursor-ns-resize',
                className
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* After Image (bottom) */}
            <div className="absolute inset-0">
                <img
                    src={afterImage.src}
                    alt={afterImage.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />
            </div>

            {/* Before Image (top, clipped) */}
            <div
                className="absolute inset-0"
                style={{
                    clipPath: isHorizontal
                        ? `inset(0 ${100 - position}% 0 0)`
                        : `inset(0 0 ${100 - position}% 0)`,
                }}
            >
                <img
                    src={beforeImage.src}
                    alt={beforeImage.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />
            </div>

            {/* Divider + Handle */}
            <div
                className={cn(
                    'absolute bg-white shadow-lg z-10',
                    isHorizontal
                        ? 'top-0 bottom-0 -translate-x-1/2'
                        : 'left-0 right-0 -translate-y-1/2'
                )}
                style={{
                    [isHorizontal ? 'left' : 'top']: `${position}%`,
                    [isHorizontal ? 'width' : 'height']: `${dividerWidth}px`,
                }}
            >
                {/* <div
                    className={cn(
                        'absolute bg-[#C5A47E] text-black rounded-full shadow-xl',
                        'flex items-center justify-center',
                        'w-10 h-10 border-2 border-white',
                        'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',   
                        'transition-transform',
                        isDragging && 'scale-110'
                    )}
                >
                    {isHorizontal ? (
                        <FiMoreVertical size={18} />
                    ) : (
                        <FiMoreHorizontal size={18} />
                    )}
                </div> */}
                
            </div>

            {/* Labels */}
            {showLabels && (
                <>
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
                        {beforeLabel}
                    </div>
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
                        {afterLabel}
                    </div>
                </>
            )}
        </div>
    );
}