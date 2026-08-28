/**
 * TextReveal.jsx
 * -----------------------------------------------------------------------
 * Scroll-triggered typography components, built to sit inside YOUR
 * existing Portfolio.jsx (same fonts, same #080808 / #F0EBE1 / #C8FF00
 * system). This is for TEXT only — headlines, bios, pull-quotes,
 * paragraph blocks. Images/project media stay handled separately.
 *
 * 4 distinct modes, each with its own scroll mechanic (not 4 skins on
 * one effect):
 *
 *   1. <MaskLines>     — line-by-line clip-path reveal, lines rise out
 *                         of a hard mask edge. Good for headlines/CTAs.
 *   2. <InkBleed>       — word-by-word opacity + blur "focus pull",
 *                         words sharpen into view as you scroll past
 *                         them. Good for long bio/about paragraphs.
 *   3. <SplitDrag>      — characters are pulled apart on entry and
 *                         snap into kerning as they cross the viewport
 *                         center, tied directly to scroll position
 *                         (scrubbed, not just triggered once).
 *                         Good for a single big statement line.
 *   4. <TrackWiden>     — letter-spacing collapses from wide to tight
 *                         while a color wipe crosses the text, driven
 *                         by scroll. Good for section labels/eyebrows
 *                         or a two-line manifesto.
 *
 * Install once at the top of your app (already using gsap + ScrollTrigger):
 *   npm i gsap
 *
 * Usage inside your existing Portfolio.jsx sections — e.g. inside an
 * About/Bio block:
 *
 *   import { MaskLines, InkBleed, SplitDrag, TrackWiden } from "./TextReveal";
 *
 *   <MaskLines
 *     lines={["Frontend-focused", "full-stack developer."]}
 *     size="clamp(2.5rem,6vw,5rem)"
 *   />
 *
 *   <InkBleed
 *     text="I craft real-time systems, high-performance web apps and
 *           immersive 3D browser experiences, obsessing over the last
 *           15ms of latency because that's where craft actually lives."
 *   />
 *
 *   <SplitDrag text="BUILT FOR SPEED." />
 *
 *   <TrackWiden text="SELECTED WORK" />
 *
 * All four register their own ScrollTrigger and clean up on unmount —
 * safe to mount/unmount inside route changes.
 * -----------------------------------------------------------------------
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LIME = "#C8FF00";
const BONE = "#F0EBE1";

/* ------------------------------------------------------------------ */
/* 1. MaskLines — hard-edge clip reveal, line by line                  */
/* ------------------------------------------------------------------ */
export function MaskLines({
  lines = [],
  size = "clamp(2.2rem,5vw,4.5rem)",
  accentLastWord = true,
  className = "",
}) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const rows = el.querySelectorAll(".ml-row");

    const ctx = gsap.context(() => {
      gsap.set(rows, { yPercent: 100 });
      gsap.to(rows, {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={className} style={{ display: "flex", flexDirection: "column" }}>
      {lines.map((line, i) => {
        const words = line.split(" ");
        const last = words.pop();
        return (
          <div
            key={i}
            style={{ overflow: "hidden", paddingBottom: "0.08em" }}
          >
            <div
              className="ml-row"
              style={{
                fontFamily: "'Bebas Neue',cursive",
                fontSize: size,
                lineHeight: 1.02,
                letterSpacing: "0.02em",
                color: BONE,
                willChange: "transform",
              }}
            >
              {words.length > 0 ? words.join(" ") + " " : ""}
              <span style={{ color: accentLastWord ? LIME : BONE }}>{last}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. InkBleed — word-by-word blur/opacity focus pull, scrubbed        */
/* ------------------------------------------------------------------ */
export function InkBleed({
  text = "",
  size = "clamp(1.1rem,2.2vw,1.7rem)",
  className = "",
}) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".ib-word");

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.08, filter: "blur(6px)" });
      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <p
      ref={wrapRef}
      className={className}
      style={{
        fontFamily: "'Cabinet Grotesk',sans-serif",
        fontSize: size,
        lineHeight: 1.7,
        maxWidth: 720,
        margin: 0,
      }}
    >
      {text.split(/\s+/).map((w, i) => (
        <span
          key={i}
          className="ib-word"
          style={{ display: "inline-block", color: BONE, willChange: "opacity, filter" }}
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* 3. SplitDrag — characters pulled apart, snap to kerning on scroll   */
/* ------------------------------------------------------------------ */
export function SplitDrag({
  text = "",
  size = "clamp(2.4rem,7vw,6rem)",
  className = "",
}) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const chars = el.querySelectorAll(".sd-char");

    const ctx = gsap.context(() => {
      chars.forEach((c, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          c,
          {
            x: dir * gsap.utils.random(40, 140),
            opacity: 0,
            color: LIME,
          },
          {
            x: 0,
            opacity: 1,
            color: BONE,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.4,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        fontFamily: "'Bebas Neue',cursive",
        fontSize: size,
        letterSpacing: "0.02em",
        lineHeight: 1,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {text.split("").map((c, i) => (
        <span
          key={i}
          className="sd-char"
          style={{ display: "inline-block", willChange: "transform, opacity, color" }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. TrackWiden — letterspacing collapse + color wipe, scrubbed       */
/* ------------------------------------------------------------------ */
export function TrackWiden({
  text = "",
  size = "clamp(1.4rem,4vw,3rem)",
  className = "",
}) {
  const wrapRef = useRef(null);
  const wipeRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    const wipe = wipeRef.current;
    if (!el || !wipe) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { letterSpacing: "0.6em", opacity: 0.15 },
        {
          letterSpacing: "0.05em",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
      gsap.fromTo(
        wipe,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        ref={wrapRef}
        className={className}
        style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: size,
          color: BONE,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
      <div
        ref={wipeRef}
        style={{
          position: "absolute",
          left: 0,
          bottom: -6,
          height: 2,
          width: "100%",
          background: LIME,
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}