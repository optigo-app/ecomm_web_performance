import { useEffect } from 'react';

const useZoom = (containerRef, imgRef) => {
    useEffect(() => {
        const container = containerRef.current;
        const img = imgRef.current;

        const onZoom = (e) => {
            const x = e.clientX - container.offsetLeft;
            const y = e.clientY - container.offsetTop;
            img.style.transformOrigin = `${x}px ${y}px`;
            img.style.transform = "scale(1.5)";
        };

        const offZoom = () => {
            img.style.transformOrigin = `center center`;
            img.style.transform = "scale(1)";
        };

        if (container) {
            container.addEventListener("mousemove", onZoom);
            container.addEventListener("mouseover", onZoom);
            container.addEventListener("mouseleave", offZoom);
        }

        return () => {
            if (container) {
                container.removeEventListener("mousemove", onZoom);
                container.removeEventListener("mouseover", onZoom);
                container.removeEventListener("mouseleave", offZoom);
            }
        };
    }, [containerRef, imgRef]);
};

export default useZoom;
