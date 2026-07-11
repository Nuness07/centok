"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const vertexShader = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
varying vec2 v_uv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.52;
  }
  return value;
}

void main() {
  vec2 uv = v_uv;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.16;
  vec2 flow = vec2(
    fbm(p * 2.0 + vec2(t, -t * 0.7)),
    fbm(p * 2.0 + vec2(-t * 0.5, t))
  );

  vec2 mouse = u_mouse / u_resolution;
  mouse.y = 1.0 - mouse.y;
  vec2 m = mouse - uv;
  m.x *= u_resolution.x / u_resolution.y;
  float mousePull = smoothstep(0.42, 0.0, length(m));

  float field = fbm(p * 3.4 + flow * 1.7 + mousePull * 0.65);
  float ribbon = sin((p.x + flow.x * 0.42) * 5.8 + t * 3.2) * 0.5 + 0.5;
  float veil = smoothstep(0.05, 0.88, field * 0.82 + ribbon * 0.34 + mousePull * 0.28);

  vec3 color = mix(u_color0, u_color1, smoothstep(0.18, 0.95, field));
  color = mix(color, u_color2, smoothstep(0.35, 0.95, ribbon));
  color = mix(vec3(0.985, 0.988, 1.0), color, veil * 0.72);

  color = mix(vec3(0.99, 0.992, 1.0), color, 0.82);

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

export function LiquidEtherBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reducedMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canvas || reducedMotion) {
      setFallback(true);
      return;
    }

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    } catch {
      gl = null;
    }
    if (!gl) {
      setFallback(true);
      return;
    }

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      setFallback(true);
      return;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "a_position");
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const mouse = gl.getUniformLocation(program, "u_mouse");
    const time = gl.getUniformLocation(program, "u_time");
    const color0 = gl.getUniformLocation(program, "u_color0");
    const color1 = gl.getUniformLocation(program, "u_color1");
    const color2 = gl.getUniformLocation(program, "u_color2");
    const c0 = hexToRgb("#2563EB");
    const c1 = hexToRgb("#5227FF");
    const c2 = hexToRgb("#8CB4FF");

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const pointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    let frame = 0;
    const startedAt = performance.now();
    const render = () => {
      gl.useProgram(program);
      gl.enableVertexAttribArray(position);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(mouse, mouseRef.current.x || canvas.width * 0.5, mouseRef.current.y || canvas.height * 0.5);
      gl.uniform1f(time, (performance.now() - startedAt) / 1000);
      gl.uniform3f(color0, c0[0], c0[1], c0[2]);
      gl.uniform3f(color1, c1[0], c1[1], c1[2]);
      gl.uniform3f(color2, c2[0], c2[1], c2[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointerMove);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 overflow-hidden bg-[radial-gradient(circle_at_18%_32%,rgba(37,99,235,0.18),transparent_34rem),radial-gradient(circle_at_82%_38%,rgba(82,39,255,0.16),transparent_38rem),linear-gradient(180deg,#fbfcff_0%,#f4f7ff_100%)]",
        className
      )}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={cn("absolute inset-0 h-full w-full opacity-90", fallback && "hidden")} />
      <div className="absolute inset-0 bg-white/12" />
    </div>
  );
}


