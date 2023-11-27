import { useEffect, useRef } from "react";
import { useStore } from '@nanostores/react';

import { windowSize } from "../store/windowSize";
import WebglApp from '../webgl/index';


export default function Webgl() {
  const $windowSize = useStore(windowSize);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webglRef = useRef<WebglApp | null>(null);

  useEffect(() => {
    if (canvasRef.current && webglRef.current == null) {
      webglRef.current = new WebglApp(canvasRef.current);
      webglRef.current.load().then(() => {
        webglRef.current.start();
      }).catch((e) => {
        console.error('ERROR:', e);
      });
    }

    return () => {
      webglRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    webglRef.current?.resize($windowSize.width, $windowSize.height);
  }, [$windowSize]);

  return <canvas ref={canvasRef} className="Webgl"></canvas>;
}