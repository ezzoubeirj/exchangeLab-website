"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const CSS = `
.cp-root{
  --blue:#3a6cb4; --blue-d:#2b5390; --blue-ink:#22345a;
  --coral:#ef8266; --coral-d:#e26b4d;
  --band:#eef4fc; --band2:#f4f8ff; --ink:#243349; --muted:#6a7994; --line:#e4ecf7; --white:#fff;
  --ease:cubic-bezier(.22,1,.36,1);
  --shadow-s:0 10px 26px -16px rgba(43,83,144,.34);
  --shadow:0 26px 50px -26px rgba(43,83,144,.3);
  --r-xl:34px;
  color:var(--ink);line-height:1.55;background:#fff;-webkit-font-smoothing:antialiased;overflow-x:hidden;
}
.cp-root *{box-sizing:border-box;margin:0;padding:0}
.cp-root img{max-width:100%;display:block}
.cp-root a{text-decoration:none;color:inherit}
.cp-root .wrap{max-width:1200px;margin:0 auto;padding-inline:clamp(20px,5vw,72px)}
.cp-root .pad{padding:clamp(56px,8vw,104px) 0}
.cp-root .band{background:var(--band)}
.cp-root .eyebrow{display:inline-flex;align-items:center;gap:10px;color:var(--coral-d);font-weight:700;font-size:13px;letter-spacing:.16em;text-transform:uppercase}
.cp-root .eyebrow::before{content:"";width:26px;height:2px;background:var(--coral);border-radius:2px}
.cp-root h2{font-size:clamp(28px,4.2vw,46px);font-weight:800;color:var(--blue-ink);letter-spacing:-.025em;line-height:1.06}
.cp-root .sub{color:var(--muted);font-size:clamp(16px,1.4vw,18px);max-width:54ch;margin-top:16px}
.cp-root .btn{display:inline-flex;align-items:center;gap:9px;border-radius:40px;padding:15px 28px;font-weight:700;font-size:15px;font-family:inherit;cursor:pointer;border:none;transition:transform .24s var(--ease),box-shadow .24s var(--ease)}
.cp-root .btn-coral{background:var(--coral);color:#fff;box-shadow:0 14px 26px -12px rgba(226,107,77,.75)}
.cp-root .btn-coral:hover{transform:translateY(-3px);box-shadow:0 18px 30px -12px rgba(226,107,77,.78)}.cp-root .btn-coral:active{transform:translateY(0) scale(.98)}
.cp-root .btn-coral:hover .ar{transform:translateX(4px)}.cp-root .ar{transition:transform .22s var(--ease)}
.cp-root .btn-ghost{background:transparent;color:var(--blue);font-weight:700}.cp-root .btn-ghost:hover{transform:translateX(3px)}
.cp-root :focus-visible{outline:3px solid rgba(58,108,180,.5);outline-offset:3px;border-radius:6px}
.cp-root .reveal{opacity:0;transform:translateY(20px);transition:opacity .68s var(--ease),transform .68s var(--ease);transition-delay:calc(var(--i,0)*75ms)}
.cp-root .reveal.in{opacity:1;transform:none}
@keyframes cpHeroFade{from{opacity:0}to{opacity:1}}
@keyframes cpHeroRise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.cp-root .hero>div:first-child>.reveal{animation:cpHeroRise .62s var(--ease) both}
.cp-root .hero>div:first-child>.reveal:nth-child(1){animation-delay:.32s}
.cp-root .hero>div:first-child>.reveal:nth-child(2){animation-delay:.42s}
.cp-root .hero>div:first-child>.reveal:nth-child(3){animation-delay:.52s}
.cp-root .hero>div:first-child>.reveal:nth-child(4){animation-delay:.62s}
.cp-root .hero>div:first-child>.reveal:nth-child(5){animation-delay:.72s}
.cp-root .hero .hv.reveal{opacity:1;transform:none;transition:none}
.cp-root .hero-toggle{opacity:0;animation:cpHeroFade .42s var(--ease) .04s both}
.cp-root .hv .scene{opacity:0;animation:cpHeroRise .68s var(--ease) .14s both}
.cp-root .hv .badge{opacity:0;animation:cpHeroRise .55s var(--ease) .28s both,cpfloaty 6s ease-in-out 1.1s infinite}
.cp-root .hv .b2{animation-duration:.55s,7s;animation-delay:.36s,1.3s}
@media (prefers-reduced-motion:reduce){
  .cp-root *{animation:none!important;scroll-behavior:auto!important}
  .cp-root .reveal,.cp-root .hero-toggle,.cp-root .hv .scene,.cp-root .hv .badge{opacity:1!important;transform:none!important;transition:none!important}
}
.cp-root .shead{max-width:640px}.cp-root .shead h2{margin-top:14px}

.cp-root .subbar{background:#fff;border-bottom:1px solid var(--line)}
.cp-root .subbar-in{display:flex;justify-content:flex-end;padding:12px 0}
.cp-root .toggle-wrap{position:relative}
.cp-root .toggle{display:grid;grid-template-columns:1fr 1fr;background:#3a6cb4;border-radius:40px;padding:5px;gap:3px;position:relative;z-index:2;box-shadow:0 10px 24px -12px rgba(43,83,144,.7)}
.cp-root .toggle::before{content:"";position:absolute;inset-block:5px;inset-inline-start:5px;width:calc(50% - 6.5px);border-radius:34px;background:#fff;box-shadow:0 3px 10px rgba(25,55,102,.22);transition:transform .32s var(--ease)}
.cp-root[data-audience="adults"][dir="ltr"] .toggle::before{transform:translateX(calc(100% + 3px))}
.cp-root[data-audience="adults"][dir="rtl"] .toggle::before{transform:translateX(calc(-100% - 3px))}
.cp-root .toggle button{position:relative;z-index:1;border:none;background:transparent;padding:9px 20px;border-radius:40px;font-weight:800;font-family:inherit;cursor:pointer;color:#fff;font-size:14px;transition:color .25s var(--ease),transform .25s var(--ease)}
.cp-root .toggle button.on{color:var(--blue-d)}
@keyframes cpdraw{to{stroke-dashoffset:0}}
.cp-root .hero-toggle{position:absolute;top:22px;right:0;z-index:4}

.cp-root .hero{display:grid;grid-template-columns:1.02fr .98fr;gap:48px;align-items:center;padding:92px 0 64px}
.cp-root .hero h1{font-size:clamp(38px,5.6vw,62px);font-weight:900;color:var(--blue-ink);letter-spacing:-.03em;line-height:1.02}
.cp-root .hero h1 .c{color:var(--coral);position:relative;white-space:nowrap}
.cp-root .hero h1 .c svg{position:absolute;left:0;bottom:.04em;width:100%;height:.22em;overflow:visible}
.cp-root .hero h1 .c path{stroke:var(--blue);stroke-width:5;fill:none;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:100;animation:cpdraw 1s var(--ease) .9s forwards}
.cp-root .hero p{margin:24px 0 30px;color:var(--muted);font-size:clamp(16px,1.5vw,19px);max-width:44ch}
.cp-root .hero-cta{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
.cp-root .hero-trust{margin-top:26px;display:flex;align-items:center;gap:10px;color:#48586e;font-weight:600;font-size:14px}
.cp-root .hero-trust .stars{color:#f5b301;letter-spacing:1px}
.cp-root .stars{color:#f5b301;letter-spacing:1px}
.cp-root .hv{position:relative;min-height:440px;display:flex;align-items:center;justify-content:center}
.cp-root .hv .scene{position:relative;z-index:1;width:100%;filter:drop-shadow(0 30px 40px rgba(43,83,144,.18))}
.cp-root .hv .blobbg{position:absolute;inset:20px 4px 10px 30px;background:radial-gradient(circle at 60% 40%,#dbe8fb,#eef4fc);border-radius:44% 56% 52% 48%/54% 46% 54% 46%;z-index:0}
.cp-root .hv .badge{position:absolute;z-index:2;background:#fff;border-radius:16px;padding:11px 15px;box-shadow:var(--shadow);display:flex;align-items:center;gap:10px;font-weight:800;font-size:13px;color:var(--blue-ink)}
.cp-root .hv .badge small{color:var(--muted);font-weight:600;display:block;font-size:11px}
.cp-root .hv .b1{top:37%;right:-2%;animation:cpHeroRise .55s var(--ease) .28s both,cpfloaty 6s ease-in-out 1.1s infinite}
.cp-root .hv .b2{bottom:10%;left:-4%;animation:cpHeroRise .55s var(--ease) .36s both,cpfloaty 7s ease-in-out 1.3s infinite}
.cp-root .ic{width:34px;height:34px;border-radius:10px;background:var(--band);display:flex;align-items:center;justify-content:center;color:var(--blue);flex:0 0 auto}
@keyframes cpfloaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

.cp-root .bstrip{display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:#fff;border:1px solid var(--line);border-radius:var(--r-xl);box-shadow:var(--shadow-s);padding:22px 0}
.cp-root .ben{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;padding:22px 24px;position:relative}
.cp-root .ben+.ben::before{content:"";position:absolute;left:0;top:22px;bottom:22px;width:1px;background:var(--line)}
.cp-root .ben img{width:104px;height:104px;object-fit:contain;transition:transform .3s var(--ease)}
.cp-root .ben:hover img{transform:translateY(-4px)}
.cp-root .ben h3{font-size:16px;font-weight:800;color:var(--blue-ink)}
.cp-root .ben p{color:var(--muted);font-size:13.5px}

.cp-root .why-grid{display:grid;grid-template-columns:.92fr 1.08fr;gap:52px;align-items:center}
.cp-root .why-media .why-scene{border-radius:28px}
.cp-root .squig{width:120px;height:16px;margin:14px 0 8px;overflow:visible}
.cp-root .squig path{fill:none;stroke:var(--coral);stroke-width:4;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:100;animation:cpdraw 1.1s var(--ease) .4s forwards}
.cp-root .quote{margin-top:20px;background:#fff;border-radius:20px;box-shadow:var(--shadow-s);padding:20px 22px 20px 46px;position:relative;max-width:440px}
.cp-root .quote .qm{position:absolute;left:16px;top:8px;font-size:44px;color:var(--coral);font-weight:900;line-height:1}
.cp-root .quote p{color:#3a4a63;font-weight:600;font-size:15.5px}
.cp-root .quote b{color:var(--blue-d)}
.cp-root .why-clouds{display:flex;flex-direction:column;gap:14px}
.cp-root .wc{position:relative}
.cp-root .wc img{width:100%;height:auto}
.cp-root .wc .ptext{position:absolute;top:0;bottom:0;right:10%;width:56%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 4%}
.cp-root .wc .ptext h3{font-size:clamp(17px,2.1vw,24px);font-weight:800;color:var(--blue-ink);line-height:1.22}
.cp-root .wc .ptext p{font-size:clamp(11.5px,1.35vw,15px);color:var(--muted);margin-top:6px;line-height:1.3}

.cp-root .how-grid{display:grid;grid-template-columns:.96fr 1.04fr;gap:48px;align-items:center}
.cp-root .how-left .how-scene{border-radius:28px}
.cp-root .flexpill{margin-top:20px;display:inline-flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);border-radius:40px;box-shadow:var(--shadow-s);padding:14px 22px;font-weight:600;color:#3a4a63;font-size:15px}
.cp-root .flexpill .h{width:34px;height:34px;border-radius:50%;background:var(--band);display:flex;align-items:center;justify-content:center;color:var(--coral);flex:0 0 auto}
.cp-root .steps{position:relative;display:flex;flex-direction:column;gap:22px}
.cp-root .steps .spine{position:absolute;left:0;top:0;bottom:0;width:120px;height:100%;overflow:visible;z-index:0;pointer-events:none}
.cp-root .steps .spine path{fill:none;stroke:#c3d5ef;stroke-width:2;stroke-dasharray:2 7;stroke-linecap:round}
.cp-root .step{position:relative;display:grid;grid-template-columns:64px 1fr;gap:20px;align-items:center;z-index:1}
.cp-root .step:nth-child(even){margin-left:38px}
.cp-root .snum{width:64px;height:64px;border-radius:50%;background:#fff;box-shadow:0 16px 30px -16px rgba(43,83,144,.55);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:26px;z-index:1}
.cp-root .step .snum{color:var(--coral)}.cp-root .step:first-child .snum{color:var(--blue)}
.cp-root .spanel{position:relative}
.cp-root .spanel img{width:100%;height:auto}
.cp-root .spanel .ptext{position:absolute;top:0;bottom:0;right:0;width:52%;display:flex;flex-direction:column;justify-content:center;padding-right:7%}
.cp-root .spanel .ptext h4{font-size:clamp(15px,1.5vw,19px);font-weight:800;color:var(--blue-ink);line-height:1.15}
.cp-root .spanel .ptext p{font-size:clamp(12px,1.2vw,14px);color:var(--muted);margin-top:3px}

.cp-root .lang-head{position:relative}
.cp-root .plane-img{position:absolute;right:0;top:-30px;width:48%;pointer-events:none}
.cp-root .langsel{margin-top:30px}
.cp-root .lstabs{display:flex;justify-content:center;flex-wrap:wrap;gap:10px}
.cp-root .ltab{border:1px solid var(--line);background:#fff;color:var(--muted);font-family:inherit;font-weight:700;font-size:15px;padding:11px 26px;border-radius:40px;cursor:pointer;transition:transform .2s var(--ease),background .2s var(--ease),color .2s var(--ease),border-color .2s var(--ease)}
.cp-root .ltab:hover{transform:translateY(-2px)}
.cp-root[data-active-language="en"] .ltab.en{background:#3a6cb4;border-color:#3a6cb4;color:#fff}
.cp-root[data-active-language="es"] .ltab.es{background:#e9a52f;border-color:#e9a52f;color:#fff}
.cp-root[data-active-language="ar"] .ltab.ar{background:#37b3a5;border-color:#37b3a5;color:#fff}
.cp-root[data-active-language="fr"] .ltab.fr{background:#8f83d8;border-color:#8f83d8;color:#fff}
.cp-root .lpanels{position:relative;margin-top:34px}
.cp-root .lpanel{display:none;grid-template-columns:1fr 1.05fr;gap:52px;align-items:center}
.cp-root[data-active-language="en"] .lpanel.en,.cp-root[data-active-language="es"] .lpanel.es,.cp-root[data-active-language="ar"] .lpanel.ar,.cp-root[data-active-language="fr"] .lpanel.fr{display:grid;animation:cpfade .28s var(--ease)}
.cp-root[data-active-language="en"] .lpanel.en .lp-media img,.cp-root[data-active-language="es"] .lpanel.es .lp-media img,.cp-root[data-active-language="ar"] .lpanel.ar .lp-media img,.cp-root[data-active-language="fr"] .lpanel.fr .lp-media img{animation:cpLangZoom .3s var(--ease)}
@keyframes cpfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes cpLangZoom{from{opacity:.72;transform:scale(.985)}to{opacity:1;transform:none}}
.cp-root .lp-badge{display:inline-flex;align-items:center;justify-content:center;min-width:48px;height:48px;padding:0 13px;border-radius:15px;color:#fff;font-weight:800;font-size:19px}
.cp-root .lpanel.en .lp-badge{background:#3a6cb4}.cp-root .lpanel.es .lp-badge{background:#e9a52f}.cp-root .lpanel.ar .lp-badge{background:#37b3a5}.cp-root .lpanel.fr .lp-badge{background:#8f83d8}
.cp-root .lp-text h3{font-size:clamp(27px,3.4vw,40px);font-weight:800;color:var(--blue-ink);margin:18px 0 10px;letter-spacing:-.02em}
.cp-root .lp-text .lp-desc{color:var(--muted);font-size:clamp(16px,1.5vw,18px);max-width:42ch}
.cp-root .lp-chips{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0 28px}
.cp-root .lp-chips span{display:inline-flex;align-items:center;gap:8px;background:var(--band);color:#3a4a63;font-weight:600;font-size:14px;padding:9px 16px;border-radius:30px}
.cp-root .lp-chips span::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--coral)}
.cp-root .lpanel.en .lp-chips span::before{background:#3a6cb4}.cp-root .lpanel.es .lp-chips span::before{background:#e9a52f}.cp-root .lpanel.ar .lp-chips span::before{background:#37b3a5}.cp-root .lpanel.fr .lp-chips span::before{background:#8f83d8}
.cp-root .lp-media{position:relative}
.cp-root .lp-media img{width:100%;border-radius:28px;box-shadow:var(--shadow)}
.cp-root .lp-cap{position:absolute;top:28%;left:13%;max-width:58%;z-index:2;font-weight:800;font-size:clamp(16px,1.6vw,20px);line-height:1.3}
.cp-root .lpanel.en .lp-cap{color:#fff}
.cp-root .lpanel.es .lp-cap,.cp-root .lpanel.ar .lp-cap,.cp-root .lpanel.fr .lp-cap{color:#2b5390}
.cp-root .needcard{margin-top:20px;display:flex;align-items:center;gap:16px;background:#fff;border:1px solid var(--line);border-radius:22px;box-shadow:var(--shadow-s);padding:20px 24px}
.cp-root .needcard .pl{width:46px;height:46px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.cp-root .needcard h4{font-size:17px;font-weight:800;color:var(--blue-ink)}.cp-root .needcard p{color:var(--muted);font-size:14px}
.cp-root .needcard .go{margin-left:auto;width:40px;height:40px;border-radius:50%;background:var(--band);display:flex;align-items:center;justify-content:center;color:var(--blue);flex:0 0 auto}

.cp-root .tsec{overflow:hidden}
.cp-root .trail{position:relative;margin-top:34px;background:linear-gradient(180deg,#f2f7ff,#eaf2fc);border:1px solid var(--line);border-radius:60px;padding:26px 10px}
.cp-root .trail .arrow{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:var(--shadow-s);display:flex;align-items:center;justify-content:center;color:var(--blue);z-index:2}
.cp-root .trail .arrow.l{left:-10px}.cp-root .trail .arrow.r{right:-10px}
.cp-root .marq{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
.cp-root .track{display:flex;gap:26px;width:max-content;animation:cpscroll 48s linear infinite}

@keyframes cpscroll{to{transform:translateX(-50%)}}
.cp-root .tp{width:104px;flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:8px}
.cp-root .tp .circ{width:96px;height:96px;border-radius:50%;position:relative;padding:4px;background:conic-gradient(var(--blue) 0 75%,#d7e3f6 75% 100%)}
.cp-root .tp .circ .inner{width:100%;height:100%;border-radius:50%;border:3px solid #fff;background:repeating-linear-gradient(135deg,#eef4fc,#eef4fc 8px,#e4edf9 8px,#e4edf9 16px);display:flex;align-items:center;justify-content:center;color:#9fb2d2;overflow:hidden}
.cp-root .tp .star{width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:var(--shadow-s);display:flex;align-items:center;justify-content:center;color:var(--blue);margin-top:-16px;z-index:1}
.cp-root .assign{position:relative;margin:34px auto 0;max-width:560px;display:flex;gap:14px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:20px;padding:18px 22px;color:#33455d;font-weight:600;font-size:15px;box-shadow:var(--shadow)}
.cp-root .assign::before{content:"";position:absolute;top:-34px;left:50%;width:2px;height:34px;background:#c7d7ef}
.cp-root .assign .pl{width:42px;height:42px;border-radius:50%;background:var(--band);color:var(--blue);display:flex;align-items:center;justify-content:center;flex:0 0 auto}

.cp-root .prog-grid{position:relative;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.cp-root .report-wrap{position:relative}
.cp-root .suivi-blob{position:absolute;z-index:0;width:165%;left:-28%;top:-18%;transform:rotate(-4deg);opacity:.9}
.cp-root .motion{position:absolute;z-index:2;width:58px;pointer-events:none}
.cp-root .motion.a{top:0%;left:-18%}
.cp-root .motion.b{top:3%;right:calc(4% - 40px);transform:scaleX(-1)}
.cp-root .report{position:relative;z-index:1;background:#fff;border-radius:26px;border:1px solid var(--line);box-shadow:var(--shadow);padding:28px;transform:translateX(-38px) rotate(-5deg)}
.cp-root .report .rh{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.cp-root .report .rh b{color:var(--blue-ink);font-size:18px;display:flex;align-items:center;gap:10px}
.cp-root .report .rh .ric{width:40px;height:40px;display:flex;align-items:center;justify-content:center}
.cp-root .report .rh .ric img{width:100%;height:100%;object-fit:contain}
.cp-root .report .tag{font-size:12px;color:var(--coral-d);background:rgba(239,130,102,.14);padding:5px 12px;border-radius:20px;font-weight:700}
.cp-root .metric{display:grid;grid-template-columns:40px 1fr;gap:14px;align-items:center;margin:16px 0}
.cp-root .metric .mic{width:40px;height:40px;display:flex;align-items:center;justify-content:center}
.cp-root .metric .mic img{width:100%;height:100%;object-fit:contain}
.cp-root .metric .lbl{display:flex;justify-content:space-between;font-weight:700;color:#33455d;font-size:14px}
.cp-root .metric .lbl b{color:var(--blue-ink)}
.cp-root .bar{height:9px;border-radius:6px;background:var(--band);overflow:hidden;margin-top:7px}
.cp-root .bar i{display:block;height:100%;border-radius:6px;background:linear-gradient(90deg,var(--blue),#8f83d8,var(--coral));transform:scaleX(0);transform-origin:left;transition:transform 1.2s var(--ease)}
.cp-root .report.in .m1 i{transform:scaleX(.82)}.cp-root .report.in .m2 i{transform:scaleX(.68)}.cp-root .report.in .m3 i{transform:scaleX(.91)}
.cp-root .report .ends{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);font-weight:600;margin-top:4px}
.cp-root .arrowheart{position:absolute;z-index:2;bottom:-18%;left:14%;width:44%;pointer-events:none}
.cp-root .prooftrio{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:26px;background:#fff;border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadow-s);padding:20px 0}
.cp-root .pt{text-align:center;padding:4px 16px;position:relative}
.cp-root .pt+.pt::before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:1px;background:var(--line)}
.cp-root .pt img{width:46px;height:46px;object-fit:contain;margin:0 auto 10px}
.cp-root .pt b{display:block;color:var(--blue-ink);font-size:13.5px}
.cp-root .pt small{color:var(--muted);font-size:12.5px}

.cp-root .avis{position:relative;text-align:center}
.cp-root .avis .circ-bg{position:absolute;border-radius:50%;z-index:0}
.cp-root .avis .cb1{width:230px;height:230px;background:#dce7fb;left:-2%;top:34%}
.cp-root .avis .cb2{width:200px;height:200px;background:#fbe6dd;right:0;top:38%}
.cp-root .avis .dots{position:absolute;z-index:0;color:#cdd9ee}
.cp-root .avis .dl{left:2%;bottom:6%}.cp-root .avis .dr{right:3%;top:64%}
.cp-root .avis-wa{position:absolute;right:22%;top:10%;width:112px;z-index:2;filter:drop-shadow(0 5px 18px rgba(120,130,150,.6))}
.cp-root .avis-lh{position:absolute;left:2%;top:16%;width:230px;z-index:2}
.cp-root .avis .head{position:relative;z-index:1;max-width:640px;margin:0 auto}
.cp-root .avis h2 .c{color:var(--coral);position:relative}
.cp-root .avis .u{display:block;width:200px;height:10px;margin:2px auto 0;overflow:visible}
.cp-root .avis .u path{fill:none;stroke:var(--blue);stroke-width:5;stroke-linecap:round}
.cp-root .avis .qmark{position:relative;z-index:1;width:64px;height:64px;border-radius:50%;background:#fff;box-shadow:var(--shadow);display:flex;align-items:center;justify-content:center;color:var(--coral);font-size:34px;font-weight:900;margin:34px auto -32px}
.cp-root .avis .slot{position:relative;z-index:1;max-width:1080px;margin:0 auto;height:340px;border:2px dashed #c3d3ec;border-radius:28px;background:rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#93a6c6;font-weight:700;font-size:14px}

.cp-root .price{max-width:460px;margin:44px auto 0;background:#fff;border-radius:var(--r-xl);border:1px solid var(--line);box-shadow:var(--shadow);padding:40px;text-align:center;position:relative;overflow:hidden}
.cp-root .price::before{content:"";position:absolute;top:-70px;right:-70px;width:200px;height:200px;border-radius:50%;background:rgba(239,130,102,.12)}
.cp-root .price .tag2{display:inline-flex;align-items:center;gap:7px;color:var(--coral-d);background:rgba(239,130,102,.14);padding:6px 14px;border-radius:20px;font-weight:700;font-size:13px}
.cp-root .price .amt{font-size:clamp(44px,7vw,60px);font-weight:900;color:var(--blue-ink);letter-spacing:-.03em;margin-top:14px;position:relative}
.cp-root .price .amt small{font-size:20px;color:var(--muted);font-weight:600}
.cp-root .price .fine{color:var(--muted);font-size:13px;margin:8px 0 20px}
.cp-root .price hr{border:none;border-top:1px solid var(--line);margin:0 0 20px}
.cp-root .price ul{list-style:none;text-align:left;margin:0 auto 26px;display:flex;flex-direction:column;gap:13px;max-width:280px}
.cp-root .price li{display:flex;gap:12px;color:#33455d;font-weight:600;font-size:15px}
.cp-root .price .ck{width:24px;height:24px;border-radius:50%;background:rgba(58,108,180,.12);color:var(--blue);display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.cp-root .adult-pricing-grid{max-width:1040px;margin:44px auto 0;display:grid;grid-template-columns:.95fr 1fr 1.08fr;gap:18px;align-items:stretch}
.cp-root .adult-price-card{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:410px;padding:32px 28px;border:1px solid var(--line);border-radius:28px;background:#fff;box-shadow:var(--shadow-s);text-align:left}
.cp-root .adult-price-card::before{content:"";position:absolute;top:-60px;right:-60px;width:150px;height:150px;border-radius:50%;background:rgba(58,108,180,.08)}
.cp-root .adult-price-card.featured{transform:translateY(-8px);border-color:rgba(58,108,180,.35);box-shadow:var(--shadow)}
.cp-root .adult-price-card .pack-name{font-size:20px;font-weight:900;color:var(--blue-ink)}
.cp-root .adult-price-card .saving{align-self:flex-start;margin-top:10px;padding:5px 11px;border-radius:18px;background:rgba(239,130,102,.14);color:var(--coral-d);font-size:12px;font-weight:800}
.cp-root .adult-price-card .rate{margin:26px 0 4px;color:var(--blue-ink);font-size:clamp(38px,4vw,50px);font-weight:900;line-height:1;letter-spacing:-.03em}
.cp-root .adult-price-card .rate small{font-size:16px;font-weight:700;color:var(--muted)}
.cp-root .adult-price-card .pack-benefits{list-style:none;margin:24px 0;padding:0;border-top:1px solid var(--line)}
.cp-root .adult-price-card .pack-benefits li{padding:9px 0;border-bottom:1px solid var(--line);color:#33455d;font-size:14px;font-weight:700}
.cp-root .adult-price-card .btn{width:100%;justify-content:center;margin-top:auto}
.cp-root .adult-price-note{margin-top:22px;color:var(--muted);font-size:13px}
.cp-root .ctapanel{margin-top:44px;background:linear-gradient(120deg,var(--blue),var(--blue-d));border-radius:var(--r-xl);color:#fff;overflow:hidden;text-align:center;padding:56px 28px;position:relative}
.cp-root .ctapanel h2{color:#fff}.cp-root .ctapanel p{color:rgba(255,255,255,.85);margin:12px auto 22px}
.cp-root .ctapanel::after{content:"";position:absolute;bottom:-90px;right:-40px;width:280px;height:280px;border-radius:50%;background:rgba(239,130,102,.2)}

.cp-root .faq{max-width:840px;margin:0 auto}
.cp-root .faq details{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow-s);margin-bottom:14px;overflow:hidden;transition:background .25s var(--ease)}
.cp-root .faq details[open]{background:var(--band2)}
.cp-root .faq summary{cursor:pointer;display:flex;align-items:center;gap:16px;padding:20px 22px;font-weight:700;color:var(--blue-ink);font-size:16px;list-style:none}
.cp-root .faq summary::-webkit-details-marker{display:none}
.cp-root .faq summary .qic{width:38px;height:38px;border-radius:50%;background:var(--band);display:flex;align-items:center;justify-content:center;color:var(--blue);flex:0 0 auto}
.cp-root .faq summary .pm{margin-left:auto;width:26px;height:26px;border-radius:50%;position:relative;flex:0 0 auto}
.cp-root .faq summary .pm::before,.cp-root .faq summary .pm::after{content:"";position:absolute;background:var(--coral);border-radius:2px;left:50%;top:50%;transition:transform .3s var(--ease)}
.cp-root .faq summary .pm::before{width:13px;height:2.5px;transform:translate(-50%,-50%)}
.cp-root .faq summary .pm::after{width:2.5px;height:13px;transform:translate(-50%,-50%)}
.cp-root .faq details[open] summary .pm::after{transform:translate(-50%,-50%) rotate(90deg);opacity:0}
.cp-root .faq .ans{padding:0 22px 20px 76px;color:var(--muted);font-size:15.5px;line-height:1.6}

.cp-root[dir="rtl"]{text-align:right}
.cp-root[dir="rtl"] .hero-toggle{right:auto;left:0}
.cp-root[dir="rtl"] .wc .ptext{right:auto;left:10%}
.cp-root[dir="rtl"] .steps .spine{left:auto;right:0;transform:scaleX(-1)}
.cp-root[dir="rtl"] .needcard .go{margin-left:0;margin-right:auto;transform:scaleX(-1)}
.cp-root[dir="rtl"] .btn .ar{transform:scaleX(-1)}
.cp-root[dir="rtl"] .btn-coral:hover .ar{transform:scaleX(-1) translateX(4px)}
.cp-root[dir="rtl"] .price ul{text-align:right}
.cp-root[dir="rtl"] .adult-price-card{text-align:right}
.cp-root[dir="rtl"] .faq .ans{padding:0 76px 20px 22px}
.cp-root[dir="rtl"] .assign::before{left:auto;right:50%}
.cp-root[dir="rtl"] .motion{display:none}
.cp-root[dir="rtl"] .trail{direction:ltr}
.cp-root[dir="rtl"] .track{animation-direction:reverse}

@media(hover:hover) and (pointer:fine){
  .cp-root .needcard,.cp-root .price,.cp-root .adult-price-card,.cp-root .faq details,.cp-root .lp-media img{transition:transform .28s var(--ease),box-shadow .28s var(--ease)}
  .cp-root .needcard:hover,.cp-root .price:hover,.cp-root .adult-price-card:hover,.cp-root .faq details:hover{transform:translateY(-3px);box-shadow:0 24px 42px -24px rgba(43,83,144,.38)}
  .cp-root .adult-price-card.featured:hover{transform:translateY(-11px)}
  .cp-root .lp-media:hover img{transform:scale(1.012)}
}

@media(min-width:961px){
  .cp-root[dir="rtl"] .wc .ptext{right:7%;left:auto;width:61%;padding:0 2%}
  .cp-root[dir="rtl"] .wc:first-child .ptext{transform:translateX(-16px)}
  .cp-root[dir="rtl"] .wc .ptext h3{font-size:clamp(20px,2.5vw,29px)}
  .cp-root[dir="rtl"] .wc:nth-child(3) .ptext h3{white-space:nowrap}
  .cp-root[dir="rtl"] .spanel img{transform:scaleX(-1)}
  .cp-root[dir="rtl"] .spanel .ptext{right:auto;left:5%;width:55%;padding:0;text-align:right;align-items:flex-start}
  .cp-root[dir="rtl"] .spanel .ptext h4{font-size:clamp(18px,1.8vw,23px)}
  .cp-root[dir="rtl"] .spanel .ptext p{font-size:clamp(14px,1.45vw,17px);line-height:1.3}
  .cp-root[dir="rtl"] .report{transform:translateX(2px) rotate(-5deg)}
  .cp-root[dir="rtl"] .suivi-blob{left:calc(-28% + 150px)}
}

@media(max-width:960px){
  .cp-root .hero,.cp-root .why-grid,.cp-root .how-grid,.cp-root .prog-grid{grid-template-columns:1fr;gap:34px}
  .cp-root .proof,.cp-root .bstrip{grid-template-columns:1fr 1fr}.cp-root .ben+.ben::before{display:none}
  .cp-root .lpanel{grid-template-columns:1fr;gap:30px}.cp-root .lp-media{order:-1}
  .cp-root .steps .spine{display:none}.cp-root .step:nth-child(even){margin-left:0}
  .cp-root .suivi-blob{display:none}.cp-root .motion{display:none}.cp-root .arrowheart{position:static;width:40%;margin:10px auto 0}
  .cp-root .avis-wa,.cp-root .avis-lh{display:none}
}
@media(min-width:601px) and (max-width:960px){
  .cp-root .hero{padding:92px clamp(32px,6vw,52px) 64px}
  .cp-root[dir="rtl"] .wc .ptext{right:7%;left:auto;width:61%;padding:0 2%;text-align:center;align-items:center}
  .cp-root[dir="rtl"] .wc .ptext h3{font-size:clamp(38px,5.3vw,43px);line-height:1.12}
  .cp-root[dir="rtl"] .wc:nth-child(3) .ptext h3{white-space:nowrap}
  .cp-root[dir="rtl"] .spanel img{transform:scaleX(-1)}
  .cp-root[dir="rtl"] .spanel .ptext{right:auto;left:5%;width:56%;padding:0;text-align:right;align-items:flex-start}
  .cp-root[dir="rtl"] .spanel .ptext h4{font-size:clamp(42px,6vw,48px);line-height:1.08}
  .cp-root[dir="rtl"] .spanel .ptext p{font-size:clamp(30px,4.2vw,34px);line-height:1.15;margin-top:7px}
  .cp-root[dir="rtl"] .report{width:92%;margin-inline:auto;transform:translateX(18px) rotate(-4deg)}
}
@media(min-width:961px) and (max-width:1200px), (min-width:961px) and (max-width:1366px) and (pointer:coarse){
  .cp-root .wrap{padding-inline:40px}
  .cp-root .hero,.cp-root .why-grid,.cp-root .how-grid,.cp-root .prog-grid{grid-template-columns:1fr;gap:40px}
  .cp-root .proof,.cp-root .bstrip{grid-template-columns:1fr 1fr}.cp-root .ben+.ben::before{display:none}
  .cp-root .why-media,.cp-root .why-clouds,.cp-root .how-left,.cp-root .steps,.cp-root .report-wrap,.cp-root .prog-grid>div{width:100%;max-width:760px;margin-inline:auto}
  .cp-root .lpanel{grid-template-columns:1fr;gap:30px}.cp-root .lp-media{order:-1}
  .cp-root .steps .spine{display:none}.cp-root .step:nth-child(even){margin-left:0}
  .cp-root .suivi-blob{display:none}.cp-root .motion{display:none}.cp-root .arrowheart{position:static;width:40%;margin:10px auto 0}
  .cp-root .report,.cp-root[dir="rtl"] .report{width:88%;margin-inline:auto;transform:rotate(-4deg)}
  .cp-root .avis-wa,.cp-root .avis-lh{display:none}
  .cp-root .adult-pricing-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
  .cp-root .adult-price-card{padding:28px 22px}
  .cp-root .adult-price-card .rate{font-size:36px}
}
@media(max-width:600px){
  .cp-root .hero{display:flex;flex-direction:column;padding:104px clamp(20px,5vw,72px) 64px}
  .cp-root .hero>div:first-child{order:2;width:100%;min-width:0}
  .cp-root .hero h1 .c{white-space:normal}
  .cp-root .hv{order:1;min-height:0;width:100%;display:flex;flex-direction:column;padding-top:0}
  .cp-root .hero-toggle,.cp-root[dir="rtl"] .hero-toggle{position:static;inset:auto;align-self:center;order:-1;margin-bottom:18px}
  .cp-root .hv .blobbg{display:none}
  .cp-root .hv .scene{width:100%}
  .cp-root .reveal{transform:translateY(10px);transition-duration:.44s;transition-delay:calc(var(--i,0)*55ms)}
  .cp-root .hero>div:first-child>.reveal{animation-duration:.46s}
  .cp-root .hero-toggle{animation-duration:.32s}
  .cp-root .hv .scene{animation-duration:.48s}
  .cp-root .hv .b1{top:58%;right:1%;padding:10px 13px;gap:8px;font-size:12px;animation:cpHeroRise .4s var(--ease) .14s both;transform:scale(.9);transform-origin:top right}
  .cp-root .hv .b2{animation:cpHeroRise .4s var(--ease) .2s both}
  .cp-root .hv .b1 .ic{width:31px;height:31px}
  .cp-root .report-wrap{padding-block:18px}
  .cp-root .report{width:85%;margin-inline:auto;padding:22px;transform:rotate(-4deg)}
  .cp-root .bstrip,.cp-root .langs,.cp-root .prooftrio{grid-template-columns:1fr}
  .cp-root .wc .ptext{right:8%;width:60%;padding:0 3%}
  .cp-root[dir="rtl"] .wc .ptext{right:7%;left:auto;width:61%;padding:0 2%}
  .cp-root .wc .ptext h3{font-size:15px;line-height:1.15}
  .cp-root[dir="rtl"] .wc .ptext h3{font-size:18px}
  .cp-root[dir="rtl"] .wc:nth-child(3) .ptext h3{white-space:nowrap}
  .cp-root .step{grid-template-columns:52px 1fr;gap:12px}
  .cp-root .snum{width:52px;height:52px;font-size:22px}
  .cp-root .spanel .ptext{right:0;width:56%;padding-right:5%}
  .cp-root[dir="rtl"] .spanel img{transform:scaleX(-1)}
  .cp-root[dir="rtl"] .spanel .ptext{right:auto;left:5%;width:55%;padding:0;text-align:right;align-items:flex-start}
  .cp-root .spanel .ptext h4{font-size:13px}
  .cp-root .spanel .ptext p{font-size:10.5px;line-height:1.25}
  .cp-root[dir="rtl"] .spanel .ptext h4{font-size:16px}
  .cp-root[dir="rtl"] .spanel .ptext p{font-size:12.5px}
  .cp-root .adult-pricing-grid{grid-template-columns:1fr;gap:14px}
  .cp-root .adult-price-card,.cp-root .adult-price-card.featured{min-height:410px;transform:none}
  .cp-root .track{animation:none;transform:none}
}
`;

// eslint-disable-next-line no-unused-vars
const TEACHER_PLACEHOLDER =
  '<div class="tp"><div class="circ"><div class="inner"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#b6c7e2" stroke-width="1.8"><circle cx="12" cy="9" r="4"/><path d="M5 20c0-4 3.5-6 7-6s7 2 7 6"/></svg></div></div><div class="star"><svg width="12" height="12" viewBox="0 0 24 24" fill="#3a6cb4"><path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3Z"/></svg></div></div>';
const TEACHER_PLACEHOLDERS = "<div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/1.Ezzoubeir.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/2.Soumaya.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/3.Aya.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/4.Khaoula.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/5.Selah.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/6.Abdelghafour.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/7.Houda.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/8.Ahlam.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/9.Karima.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/10.Meryem.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/11.Inass.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/12.Radia.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/13.Zineb.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/14.Ayoub.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/15.MarieLaure.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/16.HajarRia.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/17.Hajar.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/18.Hamza.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/19.FatimaZahra.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/20.FatimaEzzahra.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/21.ZinebEsp.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/22.Douae.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/23.Lamiae.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/24.Fayza.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/25.Imane.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/26.Chaimaa.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/1.Ezzoubeir.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/2.Soumaya.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/3.Aya.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/4.Khaoula.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/5.Selah.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/6.Abdelghafour.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/7.Houda.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/8.Ahlam.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/9.Karima.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/10.Meryem.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/11.Inass.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/12.Radia.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/13.Zineb.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/14.Ayoub.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/15.MarieLaure.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/16.HajarRia.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/17.Hajar.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/18.Hamza.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/19.FatimaZahra.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/20.FatimaEzzahra.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/21.ZinebEsp.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/22.Douae.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/23.Lamiae.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/24.Fayza.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/25.Imane.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div><div class=\"tp\"><div class=\"circ\"><div class=\"inner\"><img src=\"/profs/26.Chaimaa.png\" alt=\"Professeur Exchange Lab\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover\"></div></div></div>";

const ADULT_PACK_BENEFITS = {
  fr: '<ul class="pack-benefits"><li>100% en ligne</li><li>Attention personnalisée</li><li>Résumé des leçons</li><li>Professeurs qualifiés</li></ul>',
  ar: '<ul class="pack-benefits"><li>100% عبر الإنترنت</li><li>اهتمام شخصي</li><li>ملخص الدروس</li><li>مدرّسون مؤهلون</li></ul>',
};

const ADULT_PRICING = {
  fr: `<div class="reveal adult-pricing-grid">
    <article class="adult-price-card"><div class="pack-name">Pack 15 heures</div><span class="saving">Tarif de base</span><div class="rate">200 DH <small>/ heure</small></div>${ADULT_PACK_BENEFITS.fr}<button class="btn btn-coral" data-pack-hours="15">Choisir 15 heures</button></article>
    <article class="adult-price-card"><div class="pack-name">Pack 20 heures</div><span class="saving">10% d'économie</span><div class="rate">180 DH <small>/ heure</small></div>${ADULT_PACK_BENEFITS.fr}<button class="btn btn-coral" data-pack-hours="20">Choisir 20 heures</button></article>
    <article class="adult-price-card featured"><div class="pack-name">Pack 30 heures</div><span class="saving">Meilleur tarif · 20% d'économie</span><div class="rate">160 DH <small>/ heure</small></div>${ADULT_PACK_BENEFITS.fr}<button class="btn btn-coral" data-pack-hours="30">Choisir 30 heures</button></article>
  </div><p class="reveal adult-price-note">Tarifs hors taxe · paiement réglé à l'avance · +100 DH d'inscription (une seule fois)</p>`,
  ar: `<div class="reveal adult-pricing-grid">
    <article class="adult-price-card"><div class="pack-name">باقة 15 ساعة</div><span class="saving">السعر الأساسي</span><div class="rate">200 درهم <small>/ الساعة</small></div>${ADULT_PACK_BENEFITS.ar}<button class="btn btn-coral" data-pack-hours="15">اختيار 15 ساعة</button></article>
    <article class="adult-price-card"><div class="pack-name">باقة 20 ساعة</div><span class="saving">توفير 10%</span><div class="rate">180 درهم <small>/ الساعة</small></div>${ADULT_PACK_BENEFITS.ar}<button class="btn btn-coral" data-pack-hours="20">اختيار 20 ساعة</button></article>
    <article class="adult-price-card featured"><div class="pack-name">باقة 30 ساعة</div><span class="saving">أفضل سعر · توفير 20%</span><div class="rate">160 درهم <small>/ الساعة</small></div>${ADULT_PACK_BENEFITS.ar}<button class="btn btn-coral" data-pack-hours="30">اختيار 30 ساعة</button></article>
  </div><p class="reveal adult-price-note">الأسعار دون الضريبة · الأداء مقدماً · 100 درهم رسوم تسجيل تُدفع مرة واحدة</p>`,
};

const KIDS_HTML = `
<section class="hero-sec">
  <div class="wrap hero">
    <div>
      <div class="reveal eyebrow">Cours particuliers en ligne</div>
      <h1 class="reveal" style="--i:1;margin-top:18px">Un cours rien que pour <span class="c">votre enfant<svg viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M3 8 Q100 -1 197 6"/></svg></span>.</h1>
      <p class="reveal" style="--i:2">Anglais, espagnol, arabe ou français. Un professeur dédié, un rythme adapté au niveau et aux objectifs de votre enfant.</p>
      <div class="reveal hero-cta" style="--i:3">
        <button class="btn btn-coral">Inscrire mon enfant <svg class="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        <a class="btn btn-ghost" href="#pricing">Voir les tarifs</a>
      </div>
      <div class="reveal hero-trust" style="--i:4"><span class="stars">★★★★★</span> 4,8 sur Google · familles satisfaites</div>
    </div>
    <div class="reveal hv" style="--i:2">
      <div class="toggle-wrap hero-toggle">
        <div class="toggle" role="tablist"><button class="on" role="tab" aria-selected="true">Enfants</button><button role="tab" aria-selected="false">Adultes</button></div>
      </div>
      <div class="blobbg"></div>
      <img class="scene" src="/one-to-one/hero-scene.png" alt="Enfant en cours particulier en ligne">
      <div class="badge b1"><span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><rect x="2" y="4" width="20" height="14" rx="3"/><path d="M8 21h8"/></svg></span><div>1 élève · 1 prof<small>séance en ligne</small></div></div>
      <div class="badge b2"><span class="ic" style="background:rgba(239,130,102,.16);color:#e26b4d"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e26b4d" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></span><div>Suivi mensuel<small>progrès visibles</small></div></div>
    </div>
  </div>
</section>

<section class="pad"><div class="wrap">
  <div class="reveal bstrip">
    <div class="ben"><img src="/one-to-one/benefit-online.png" alt=""><h3>100% en ligne</h3><p>Apprendre depuis chez vous.</p></div>
    <div class="ben"><img src="/one-to-one/benefit-attention.png" alt=""><h3>Attention personnalisée</h3><p>Un suivi adapté à chaque enfant.</p></div>
    <div class="ben"><img src="/one-to-one/benefit-summary.png" alt=""><h3>Résumé des leçons</h3><p>Après chaque séance pour suivre les progrès.</p></div>
    <div class="ben"><img src="/one-to-one/benefit-teachers.png" alt=""><h3>Professeurs qualifiés</h3><p>Pédagogues expérimentés et bienveillants.</p></div>
  </div>
</div></section>

<section class="band pad"><div class="wrap why-grid">
  <div class="why-media reveal">
    <div class="eyebrow">Le cours individuel</div>
    <h2 style="margin-top:14px">Pourquoi un cours individuel change tout</h2>
    <svg class="squig" viewBox="0 0 120 16"><path d="M4 10 Q22 2 40 9 T78 8 T116 7"/></svg>
    <img class="why-scene" src="/one-to-one/why-scene%2002.57.12.png" alt="Professeur et enfant en cours individuel">
    <div class="quote"><span class="qm">“</span><p>Un accompagnement <b>sur mesure</b> pour révéler tout le potentiel de votre enfant.</p></div>
  </div>
  <div class="why-clouds">
    <div class="reveal wc" style="--i:0"><img src="/one-to-one/why-cloud-1.png" alt=""><div class="ptext"><h3>Toute l'attention<br>du prof</h3></div></div>
    <div class="reveal wc" style="--i:1"><img src="/one-to-one/why-cloud-2.png" alt=""><div class="ptext"><h3>On cible ce qui<br>compte</h3></div></div>
    <div class="reveal wc" style="--i:2"><img src="/one-to-one/why-cloud-3.png" alt=""><div class="ptext"><h3>Un rythme adapté</h3></div></div>
  </div>
</div></section>

<section class="pad"><div class="wrap how-grid">
  <div class="reveal how-left">
    <div class="eyebrow">Comment ça se passe</div>
    <h2 style="margin:14px 0 0">Vous décidez<br>du rythme</h2>
    <img class="how-scene" src="/one-to-one/how-scene.png" alt="Le parcours d'apprentissage de l'enfant">
    <div class="flexpill"><span class="h"><svg width="16" height="16" viewBox="0 0 24 24" fill="#ef8266"><path d="M12 21s-6.7-4.3-9.3-8.1C.9 10.2 2 6.5 5.2 6c2-.3 3.4.8 4.8 2.3C11.4 6.8 12.8 5.7 14.8 6c3.2.5 4.3 4.2 2.5 6.9C18.7 16.7 12 21 12 21Z"/></svg></span>Un parcours flexible, pensé pour votre enfant.</div>
  </div>
  <div class="reveal steps" style="--i:1">
    <svg class="spine" viewBox="0 0 120 400" preserveAspectRatio="none"><path d="M32 26 C96 70 8 128 40 176 C78 232 0 286 46 330 C74 356 44 380 40 388"/></svg>
    <div class="step"><div class="snum">1</div><div class="spanel"><img src="/one-to-one/how-icon-1.png" alt=""><div class="ptext"><h4>Niveau actuel</h4><p>On évalue le point de départ.</p></div></div></div>
    <div class="step"><div class="snum">2</div><div class="spanel"><img src="/one-to-one/how-icon-2.png" alt=""><div class="ptext"><h4>Objectifs</h4><p>Ce que votre enfant veut atteindre.</p></div></div></div>
    <div class="step"><div class="snum">3</div><div class="spanel"><img src="/one-to-one/how-icon-3.png" alt=""><div class="ptext"><h4>Programme personnalisé</h4><p>Construit autour de lui.</p></div></div></div>
    <div class="step"><div class="snum">4</div><div class="spanel"><img src="/one-to-one/how-icon-4.png" alt=""><div class="ptext"><h4>Progression</h4><p>Étape par étape, séance après séance.</p></div></div></div>
  </div>
</div></section>

<section class="band pad"><div class="wrap">
  <div class="lang-head reveal shead">
    <div class="eyebrow">Nos langues</div><h2 style="margin-top:14px">Quatre langues, un cours sur mesure</h2>
    <p class="sub" style="margin-top:10px">Choisissez la langue de votre enfant et nous construisons le parcours idéal.</p>
    <img class="plane-img" src="/one-to-one/lang-plane.png" alt="">
  </div>
  <div class="langsel">
    <div class="lstabs" role="tablist">
      <button type="button" class="ltab en" data-l="en" role="tab" aria-selected="true" aria-controls="language-panel-en">Anglais</button>
      <button type="button" class="ltab es" data-l="es" role="tab" aria-selected="false" aria-controls="language-panel-es">Espagnol</button>
      <button type="button" class="ltab ar" data-l="ar" role="tab" aria-selected="false" aria-controls="language-panel-ar">Arabe</button>
      <button type="button" class="ltab fr" data-l="fr" role="tab" aria-selected="false" aria-controls="language-panel-fr">Français</button>
    </div>
    <div class="lpanels">
      <div class="lpanel en" id="language-panel-en" role="tabpanel">
        <div class="lp-text">
          <span class="lp-badge">En</span>
          <h3>Anglais</h3>
          <p class="lp-desc">Parler avec aisance, renforcer les bases et progresser à l'école — à l'oral comme à l'écrit.</p>
          <div class="lp-chips"><span>Conversation</span><span>Bases solides</span><span>Soutien scolaire</span></div>
          <button class="btn btn-coral">Inscrire mon enfant <svg class="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
        <div class="lp-media"><div class="lp-cap">L'anglais, la langue internationale des affaires, des études et d'Internet.</div><img src="/one-to-one/lang-en-card.png" alt="Cours d'anglais en ligne pour enfants"></div>
      </div>
      <div class="lpanel es" id="language-panel-es" role="tabpanel">
        <div class="lp-text">
          <span class="lp-badge">Es</span>
          <h3>Espagnol</h3>
          <p class="lp-desc">Débuter ou progresser en espagnol, en pratiquant l'oral à son rythme et en confiance.</p>
          <div class="lp-chips"><span>Débutants bienvenus</span><span>Oral en priorité</span><span>À son rythme</span></div>
          <button class="btn btn-coral">Inscrire mon enfant <svg class="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
        <div class="lp-media"><div class="lp-cap">L'espagnol, parlé par plus de 500 millions de personnes.</div><img src="/one-to-one/lang-es-card.png" alt="Cours d'espagnol en ligne pour enfants"></div>
      </div>
      <div class="lpanel ar" id="language-panel-ar" role="tabpanel">
        <div class="lp-text">
          <span class="lp-badge">ع</span>
          <h3>Arabe · العربية</h3>
          <p class="lp-desc">Développer l'expression, la lecture et l'écriture, avec un professeur adapté au niveau de votre enfant.</p>
          <div class="lp-chips"><span>Expression</span><span>Lecture</span><span>Écriture</span></div>
          <button class="btn btn-coral">Inscrire mon enfant <svg class="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
        <div class="lp-media"><div class="lp-cap">L'arabe, la langue de la culture et des racines.</div><img src="/one-to-one/lang-ar-card.png" alt="Cours d'arabe en ligne pour enfants"></div>
      </div>
      <div class="lpanel fr" id="language-panel-fr" role="tabpanel">
        <div class="lp-text">
          <span class="lp-badge">Fr</span>
          <h3>Français</h3>
          <p class="lp-desc">Gagner en confiance à l'oral et à l'écrit, avec un vrai soutien scolaire au quotidien.</p>
          <div class="lp-chips"><span>Oral &amp; écrit</span><span>Confiance</span><span>Soutien scolaire</span></div>
          <button class="btn btn-coral">Inscrire mon enfant <svg class="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
        <div class="lp-media"><div class="lp-cap">Le français, une langue de culture et d'opportunités.</div><img src="/one-to-one/lang-fr-card.png" alt="Cours de français en ligne pour enfants"></div>
      </div>
    </div>
  </div>
  <div class="reveal needcard" style="--i:4"><span class="pl"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg></span><div><h4>Un besoin précis ?</h4><p>On adapte le programme à l'objectif de votre enfant.</p></div><span class="go"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
</div></section>

<section class="tsec pad"><div class="wrap">
  <div class="reveal shead"><div class="eyebrow">Nos professeurs</div><h2 style="margin-top:14px">Des professeurs qualifiés,<br>choisis pour votre enfant</h2><p class="sub" style="margin-top:12px">Passionnés, pédagogues et à l'écoute.</p></div>
</div>
<div class="wrap"><div class="trail reveal">
  <span class="arrow l"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2.4" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg></span>
  <span class="arrow r"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2.4" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg></span>
  <div class="marq"><div class="track" id="track">${TEACHER_PLACEHOLDERS}</div></div>
</div></div>
<div class="wrap"><div class="assign reveal"><span class="pl"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></span><div><b style="color:#22345a">Nous choisissons le professeur</b> selon l'âge, le niveau, les objectifs et les disponibilités.</div></div></div>
</section>

<section class="band pad"><div class="wrap prog-grid">
  <div class="reveal report-wrap">
    <img class="suivi-blob" src="/one-to-one/suivi-blob.png" alt="">
    <img class="motion a" src="/one-to-one/suivi-motion.png" alt="">
    <div class="report" id="report">
      <div class="rh"><b><span class="ric"><img src="/one-to-one/suivi-icon-1.png" alt=""></span>Bulletin de progrès</b><span class="tag">Chaque mois</span></div>
      <div class="metric m1"><span class="mic"><img src="/one-to-one/suivi-icon-2.png" alt=""></span><div><div class="lbl"><span>Expression orale</span><b>82%</b></div><div class="bar"><i></i></div><div class="ends"><span>0%</span><span>100%</span></div></div></div>
      <div class="metric m2"><span class="mic"><img src="/one-to-one/suivi-icon-3.png" alt=""></span><div><div class="lbl"><span>Vocabulaire</span><b>68%</b></div><div class="bar"><i></i></div><div class="ends"><span>0%</span><span>100%</span></div></div></div>
      <div class="metric m3"><span class="mic"><img src="/one-to-one/suivi-icon-4.png" alt=""></span><div><div class="lbl"><span>Confiance</span><b>91%</b></div><div class="bar"><i></i></div><div class="ends"><span>0%</span><span>100%</span></div></div></div>
    </div>
    <img class="arrowheart" src="/one-to-one/suivi-arrow-heart.png" alt="">
  </div>
  <div class="reveal" style="--i:1;position:relative">
    <img class="motion b" src="/one-to-one/suivi-motion.png" alt="">
    <div class="eyebrow">Suivi mensuel</div>
    <h2 style="margin:14px 0 14px">Vous savez où en est votre enfant</h2>
    <p class="sub" style="margin-top:0">Chaque mois, un point clair : les progrès, les points à renforcer et les prochaines priorités. Et après chaque leçon, un court résumé.</p>
    <div class="prooftrio">
      <div class="pt"><img src="/one-to-one/suivi-icon-5.png" alt=""><b>Des progrès suivis</b><small>mois après mois</small></div>
      <div class="pt"><img src="/one-to-one/suivi-icon-6.png" alt=""><b>Points à renforcer</b><small>identifiés clairement</small></div>
      <div class="pt"><img src="/one-to-one/suivi-icon-7.png" alt=""><b>Un résumé</b><small>après chaque leçon</small></div>
    </div>
  </div>
</div></section>

<section class="pad avis"><div class="wrap">
  <span class="circ-bg cb1"></span><span class="circ-bg cb2"></span>
  <svg class="dots dl" width="70" height="70"><g fill="currentColor"><circle cx="6" cy="6" r="3"/><circle cx="24" cy="6" r="3"/><circle cx="42" cy="6" r="3"/><circle cx="6" cy="24" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="42" cy="24" r="3"/><circle cx="6" cy="42" r="3"/><circle cx="24" cy="42" r="3"/><circle cx="42" cy="42" r="3"/></g></svg>
  <svg class="dots dr" width="70" height="70"><g fill="currentColor"><circle cx="6" cy="6" r="3"/><circle cx="24" cy="6" r="3"/><circle cx="42" cy="6" r="3"/><circle cx="6" cy="24" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="42" cy="24" r="3"/><circle cx="6" cy="42" r="3"/><circle cx="24" cy="42" r="3"/><circle cx="42" cy="42" r="3"/></g></svg>
  <img class="avis-lh" src="/one-to-one/avis-line-heart.png" alt="">
  <img class="avis-wa" src="/one-to-one/avis-whatsapp.png" alt="">
  <div class="head reveal">
    <div class="eyebrow" style="display:inline-flex">Avis</div>
    <h2 style="margin-top:10px">Ce que disent <span class="c">les parents</span></h2>
    <svg class="u" viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M4 6 Q100 1 196 5"/></svg>
    <p class="sub" style="margin:14px auto 0">Des familles qui progressent avec <b style="color:#2b5390">Exchange Lab</b>.</p>
  </div>
  <div class="qmark reveal">“</div>
  <div class="slot reveal">Vos 6 captures WhatsApp viendront ici (carrousel)</div>
</div></section>

<section class="band pad" id="pricing" style="scroll-margin-top:96px"><div class="wrap" style="text-align:center">
  <div class="reveal shead" style="margin:0 auto"><div class="eyebrow">Tarifs</div><h2 style="margin-top:14px">Un tarif simple et clair</h2></div>
  <div class="reveal price">
    <span class="tag2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e26b4d" stroke-width="2"><path d="M20 12 12 20l-8-8V4h8Z"/><circle cx="8.5" cy="7.5" r="1.2" fill="#e26b4d"/></svg> Une seule formule</span>
    <div class="amt"><span id="pricecount">150</span> DH <small>/ heure</small></div>
    <div class="fine">Tarifs hors taxe · paiement mensuel réglé à l'avance · +100 DH d'inscription (une seule fois)</div>
    <hr>
    <ul>
      <li><span class="ck"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>Un professeur dédié</li>
      <li><span class="ck"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>Un programme personnalisé</li>
      <li><span class="ck"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>Un résumé après chaque leçon</li>
      <li><span class="ck"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>Un suivi mensuel</li>
    </ul>
    <button class="btn btn-coral" style="width:100%;justify-content:center">Inscrire mon enfant <svg class="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
  </div>
  <div class="reveal ctapanel">
    <h2>Prêt à aider votre enfant à progresser ?</h2>
    <p>Un accompagnement individuel, en anglais, espagnol, arabe ou français.</p>
    <button class="btn btn-coral">Inscrire mon enfant <svg class="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
  </div>
</div></section>

<section class="pad"><div class="wrap">
  <div class="reveal shead" style="text-align:center;margin:0 auto 40px"><div class="eyebrow">FAQ</div><h2 style="margin-top:14px">Vos questions</h2><p class="sub" style="margin:12px auto 0">Retrouvez ici les réponses aux questions les plus fréquentes des parents.</p></div>
  <div class="faq reveal">
    <details open><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></span>À partir de quel âge mon enfant peut-il suivre des cours ?<span class="pm"></span></summary><div class="ans">À partir de 8 ans.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>Combien de temps dure une séance ?<span class="pm"></span></summary><div class="ans">À partir d'1h00, avec 1h15 recommandé pour les enfants. Vous choisissez la durée.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/></svg></span>Comment choisissez-vous le professeur de mon enfant ?<span class="pm"></span></summary><div class="ans">Selon son âge, son niveau, ses objectifs et ses disponibilités.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-3.5 4-3.5s3 1 3 3"/></svg></span>Mon enfant garde-t-il le même professeur ?<span class="pm"></span></summary><div class="ans">Oui, le même professeur à chaque séance.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-8-5"/><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 8 5"/><path d="M20 4v4h-4"/><path d="M4 20v-4h4"/></svg></span>Peut-on changer de professeur si besoin ?<span class="pm"></span></summary><div class="ans">Oui, bien sûr. Si le courant ne passe pas, nous trouvons un autre professeur.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>Comment choisir les horaires de mon enfant ?<span class="pm"></span></summary><div class="ans">Vous choisissez vos jours et vos horaires dans le formulaire d'inscription, puis nous vous contactons pour confirmer.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg></span>Comment puis-je suivre les progrès de mon enfant ?<span class="pm"></span></summary><div class="ans">Un résumé après chaque leçon et un point complet chaque mois.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><path d="M4 19V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2Z"/><path d="M8 7h7"/></svg></span>Quels supports sont utilisés pendant les cours ?<span class="pm"></span></summary><div class="ans">Nous disposons d'une variété de manuels et de supports pédagogiques, et nous choisissons celui qui correspond le mieux aux besoins de votre enfant.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg></span>Quels sont les tarifs et comment payer ?<span class="pm"></span></summary><div class="ans">150 DH / heure (hors taxe). Paiement mensuel réglé à l'avance, avec 100 DH de frais d'inscription la première fois seulement.</div></details>
    <details><summary><span class="qic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6cb4" stroke-width="2"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></span>De quoi mon enfant a-t-il besoin pour suivre le cours en ligne ?<span class="pm"></span></summary><div class="ans">Une bonne connexion internet et un ordinateur, une tablette ou un smartphone.</div></details>
  </div>
  <div style="text-align:center;margin-top:32px" class="reveal"><button class="btn btn-coral">Inscrire mon enfant <svg class="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>
</div></section>
`;

const ADULT_REPLACEMENTS = [
  ["Un cours rien que pour <span class=\"c\">votre enfant", "Un cours rien que pour <span class=\"c\">vous"],
  ["Un professeur dédié, un rythme adapté au niveau et aux objectifs de votre enfant.", "Un professeur dédié, un rythme adapté à votre niveau et à vos objectifs."],
  ["Inscrire mon enfant", "M'inscrire"],
  ["Enfant en cours particulier en ligne", "Adulte en cours particulier en ligne"],
  ["1 élève · 1 prof", "un apprenant · 1 prof"],
  ["/one-to-one/hero-scene.png", "/one-to-one-adults/hero-scene.png"],
  ["/one-to-one/why-scene%2002.57.12.png", "/one-to-one-adults/why-scene.png"],
  ["/one-to-one/how-scene.png", "/one-to-one-adults/how-scene.png"],
  ["Cours d'anglais en ligne pour enfants", "Cours d'anglais en ligne pour adultes"],
  ["Cours d'espagnol en ligne pour enfants", "Cours d'espagnol en ligne pour adultes"],
  ["Cours d'arabe en ligne pour enfants", "Cours d'arabe en ligne pour adultes"],
  ["Cours de français en ligne pour enfants", "Cours de français en ligne pour adultes"],
  ["choisis pour votre enfant", "choisis pour vous"],
  ["Un suivi adapté à chaque enfant.", "Un suivi adapté à chaque apprenant."],
  ["pour révéler tout le potentiel de votre enfant.", "pour révéler tout votre potentiel."],
  ["Un parcours flexible, pensé pour votre enfant.", "Un parcours flexible, pensé pour vous."],
  ["Ce que votre enfant veut atteindre.", "Ce que vous voulez atteindre."],
  ["Construit autour de lui.", "Construit autour de vous."],
  ["Choisissez la langue de votre enfant et nous construisons le parcours idéal.", "Choisissez votre langue et nous construisons le parcours idéal."],
  ["On adapte le programme à l'objectif de votre enfant.", "On adapte le programme à votre objectif."],
  ["Prêt à aider votre enfant à progresser ?", "Prêt à atteindre vos objectifs ?"],
  ["nous choisissons celui qui correspond le mieux aux besoins de votre enfant.", "nous choisissons celui qui correspond le mieux à vos besoins."],
  ["Vous savez où en est votre enfant", "Vous savez exactement où vous en êtes"],
  ["les parents", "nos apprenants"],
  ["des parents", "des adultes"],
  ["À partir de quel âge mon enfant peut-il suivre des cours ?", "Puis-je commencer même si je suis débutant ?"],
  ["Comment choisissez-vous le professeur de mon enfant ?", "Comment choisissez-vous mon professeur ?"],
  ["Mon enfant garde-t-il le même professeur ?", "Est-ce que je garde le même professeur ?"],
  ["Comment choisir les horaires de mon enfant ?", "Comment choisir mes horaires ?"],
  ["Comment puis-je suivre les progrès de mon enfant ?", "Comment puis-je suivre mes progrès ?"],
  ["De quoi mon enfant a-t-il besoin pour suivre le cours en ligne ?", "De quoi ai-je besoin pour suivre le cours en ligne ?"],
  ["votre enfant", "vous"],
  ["Votre enfant", "Vous"],
  ["mon enfant", "moi"],
  ["Mon enfant", "Je"],
  ["son âge, son niveau, ses objectifs et ses disponibilités", "votre niveau, vos objectifs et vos disponibilités"],
  ["À partir de 8 ans.", "Nos cours particuliers sont ouverts aux adultes de tous niveaux."],
  ["avec 1h15 recommandé pour les enfants", "avec des créneaux jusqu'à 2h00 pour les adultes"],
];

const AR_COMMON_REPLACEMENTS = [
  ["Cours particuliers en ligne", "دروس فردية عبر الإنترنت"],
  ["Voir les tarifs", "اطّلع على الأسعار"],
  ["4,8 sur Google · familles satisfaites", "4.8 على Google · عائلات راضية"],
  ["Enfants", "الأطفال"],
  ["Adultes", "الكبار"],
  ["séance en ligne", "حصة عبر الإنترنت"],
  ["Suivi mensuel", "متابعة شهرية"],
  ["progrès visibles", "تقدّم واضح"],
  ["100% en ligne", "100% عبر الإنترنت"],
  ["Apprendre depuis chez vous.", "التعلّم من منزلكم."],
  ["Attention personnalisée", "اهتمام شخصي"],
  ["Résumé des leçons", "ملخص الدروس"],
  ["Après chaque séance pour suivre les progrès.", "بعد كل حصة لمتابعة التقدّم."],
  ["Professeurs qualifiés", "مدرّسون مؤهلون"],
  ["Pédagogues expérimentés et bienveillants.", "خبرة تربوية وتعامل مشجّع."],
  ["Le cours individuel", "الدرس الفردي"],
  ["Pourquoi un cours individuel change tout", "لماذا يصنع الدرس الفردي فرقاً؟"],
  ["Toute l'attention<br>du prof", "كل اهتمام<br>المدرّس"],
  ["On cible ce qui<br>compte", "نركّز على ما<br>يهم فعلاً"],
  ["Un rythme adapté", "وتيرة مناسبة"],
  ["Comment ça se passe", "كيف تسير الدروس؟"],
  ["Vous décidez<br>du rythme", "أنتم تختارون<br>الوتيرة"],
  ["Niveau actuel", "المستوى الحالي"],
  ["On évalue le point de départ.", "نحدّد نقطة الانطلاق."],
  ["Objectifs", "الأهداف"],
  ["Programme personnalisé", "برنامج مخصّص"],
  ["Progression", "التقدّم"],
  ["Étape par étape, séance après séance.", "خطوة بعد خطوة، وحصة بعد حصة."],
  ["Nos langues", "لغاتنا"],
  ["Quatre langues, un cours sur mesure", "أربع لغات، ودرس مصمّم حسب الحاجة"],
  ["Anglais", "الإنجليزية"],
  ["Espagnol", "الإسبانية"],
  ["Arabe · العربية", "العربية"],
  ["Arabe", "العربية"],
  ["Français", "الفرنسية"],
  ["Parler avec aisance, renforcer les bases et progresser à l'école — à l'oral comme à l'écrit.", "التحدّث بطلاقة، وترسيخ الأساسيات، والتقدّم شفهياً وكتابياً."],
  ["Conversation", "محادثة"],
  ["Bases solides", "أساس متين"],
  ["Soutien scolaire", "دعم دراسي"],
  ["L'anglais, la langue internationale des affaires, des études et d'Internet.", "الإنجليزية، اللغة الدولية للأعمال والدراسة والإنترنت."],
  ["Débuter ou progresser en espagnol, en pratiquant l'oral à son rythme et en confiance.", "بدء تعلّم الإسبانية أو تطويرها من خلال ممارسة المحادثة بثقة وبالوتيرة المناسبة."],
  ["Débutants bienvenus", "مناسب للمبتدئين"],
  ["Oral en priorité", "الأولوية للمحادثة"],
  ["À son rythme", "بالوتيرة المناسبة"],
  ["L'espagnol, parlé par plus de 500 millions de personnes.", "الإسبانية، لغة يتحدث بها أكثر من 500 مليون شخص."],
  ["Développer l'expression, la lecture et l'écriture, avec un professeur adapté au niveau de votre enfant.", "تطوير التعبير والقراءة والكتابة مع مدرّس يناسب مستوى طفلكم."],
  ["Développer l'expression, la lecture et l'écriture, avec un professeur adapté au niveau de vous.", "تطوير التعبير والقراءة والكتابة مع مدرّس يناسب مستواكم."],
  ["Expression", "التعبير"],
  ["Lecture", "القراءة"],
  ["Écriture", "الكتابة"],
  ["L'arabe, la langue de la culture et des racines.", "العربية، لغة الثقافة والجذور."],
  ["Gagner en confiance à l'oral et à l'écrit, avec un vrai soutien scolaire au quotidien.", "اكتساب الثقة في التعبير الشفهي والكتابي مع دعم منتظم."],
  ["Oral &amp; écrit", "شفهي وكتابي"],
  ["Confiance", "الثقة"],
  ["Le français, une langue de culture et d'opportunités.", "الفرنسية، لغة الثقافة والفرص."],
  ["Un besoin précis ?", "لديكم هدف محدّد؟"],
  ["Nos professeurs", "مدرّسونا"],
  ["Passionnés, pédagogues et à l'écoute.", "شغوفون بالتعليم، متفهّمون، وحريصون على الاستماع."],
  ["Nous choisissons le professeur", "نختار المدرّس المناسب"],
  ["Bulletin de progrès", "تقرير التقدّم"],
  ["Chaque mois", "كل شهر"],
  ["Expression orale", "التعبير الشفهي"],
  ["Vocabulaire", "المفردات"],
  ["Chaque mois, un point clair : les progrès, les points à renforcer et les prochaines priorités. Et après chaque leçon, un court résumé.", "كل شهر، نقدم صورة واضحة عن التقدّم والجوانب التي تحتاج إلى تعزيز والخطوات المقبلة، مع ملخص قصير بعد كل درس."],
  ["Des progrès suivis", "متابعة التقدّم"],
  ["mois après mois", "شهراً بعد شهر"],
  ["Points à renforcer", "جوانب للتطوير"],
  ["identifiés clairement", "محدّدة بوضوح"],
  ["Un résumé", "ملخص"],
  ["après chaque leçon", "بعد كل درس"],
  ["Avis", "آراء المتعلمين"],
  ["Vos 6 captures WhatsApp viendront ici (carrousel)", "ستظهر هنا شهادات واتساب"],
  ["Tarifs", "الأسعار"],
  ["Un tarif simple et clair", "سعر بسيط وواضح"],
  ["Une seule formule", "صيغة واحدة"],
  ["/ heure", "/ الساعة"],
  ["Tarifs hors taxe · paiement mensuel réglé à l'avance · +100 DH d'inscription (une seule fois)", "الأسعار دون الضريبة · الأداء الشهري مقدماً · 100 درهم رسوم تسجيل تُدفع مرة واحدة"],
  ["Un professeur dédié", "مدرّس مخصّص"],
  ["Un programme personnalisé", "برنامج مخصّص"],
  ["Un résumé après chaque leçon", "ملخص بعد كل درس"],
  ["Un suivi mensuel", "متابعة شهرية"],
  ["Un accompagnement individuel, en anglais, espagnol, arabe ou français.", "مواكبة فردية بالإنجليزية أو الإسبانية أو العربية أو الفرنسية."],
  ["FAQ", "الأسئلة الشائعة"],
  ["Vos questions", "أسئلتكم"],
  ["Combien de temps dure une séance ?", "ما مدة الحصة؟"],
  ["Peut-on changer de professeur si besoin ?", "هل يمكن تغيير المدرّس عند الحاجة؟"],
  ["Oui, bien sûr. Si le courant ne passe pas, nous trouvons un autre professeur.", "نعم بالتأكيد. إذا لم يكن المدرّس مناسباً، نختار مدرّساً آخر."],
  ["Vous choisissez vos jours et vos horaires dans le formulaire d'inscription, puis nous vous contactons pour confirmer.", "تختارون الأيام والأوقات في استمارة التسجيل، ثم نتواصل معكم لتأكيدها."],
  ["Un résumé après chaque leçon et un point complet chaque mois.", "ملخص بعد كل درس وتقرير شامل كل شهر."],
  ["Quels supports sont utilisés pendant les cours ?", "ما الوسائل التعليمية المستخدمة؟"],
  ["Quels sont les tarifs et comment payer ?", "ما الأسعار وكيف يتم الأداء؟"],
  ["150 DH / heure (hors taxe). Paiement mensuel réglé à l'avance, avec 100 DH de frais d'inscription la première fois seulement.", "150 درهماً للساعة دون الضريبة. الأداء شهري ومسبق، مع 100 درهم رسوم تسجيل تُدفع مرة واحدة."],
  ["Une bonne connexion internet et un ordinateur, une tablette ou un smartphone.", "اتصال جيد بالإنترنت وحاسوب أو جهاز لوحي أو هاتف ذكي."],
  ["التعبير orale", "التعبير الشفهي"],
  ["كل شهر, un point clair : les progrès, les points à renforcer et les prochaines priorités. Et بعد كل درس, un court résumé.", "كل شهر، نقدم صورة واضحة عن التقدّم والجوانب التي تحتاج إلى تعزيز والخطوات المقبلة، مع ملخص قصير بعد كل درس."],
  ["الأسعار hors taxe · paiement mensuel réglé à l'avance · +100 DH d'inscription (une seule fois)", "الأسعار دون الضريبة · الأداء الشهري مقدماً · 100 درهم رسوم تسجيل تُدفع مرة واحدة"],
  ["ملخص بعد كل درس et un point complet chaque mois.", "ملخص بعد كل درس وتقرير شامل كل شهر."],
  ["150 DH / الساعة (hors taxe). Paiement mensuel réglé à l'avance, avec 100 DH de frais d'inscription la première fois seulement.", "150 درهماً للساعة دون الضريبة. الأداء شهري ومسبق، مع 100 درهم رسوم تسجيل تُدفع مرة واحدة."],
];

const AR_KIDS_REPLACEMENTS = [
  ["Un cours rien que pour <span class=\"c\">votre enfant", "درس مصمّم خصيصاً <span class=\"c\">لطفلكم"],
  ["Anglais, espagnol, arabe ou français. Un professeur dédié, un rythme adapté au niveau et aux objectifs de votre enfant.", "الإنجليزية أو الإسبانية أو العربية أو الفرنسية، مع مدرّس مخصّص ووتيرة تناسب مستوى طفلكم وأهدافه."],
  ["Inscrire mon enfant", "تسجيل طفلي"],
  ["Enfant en cours particulier en ligne", "طفل يتابع درساً فردياً عبر الإنترنت"],
  ["Cours d'anglais en ligne pour enfants", "دروس الإنجليزية الفردية للأطفال عبر الإنترنت"],
  ["Cours d'espagnol en ligne pour enfants", "دروس الإسبانية الفردية للأطفال عبر الإنترنت"],
  ["Cours d'arabe en ligne pour enfants", "دروس العربية الفردية للأطفال عبر الإنترنت"],
  ["Cours de français en ligne pour enfants", "دروس الفرنسية الفردية للأطفال عبر الإنترنت"],
  ["1 élève · 1 prof", "طفل واحد · مدرّس واحد"],
  ["Un suivi adapté à chaque enfant.", "متابعة تناسب كل طفل."],
  ["Professeur et enfant en cours individuel", "مدرّس وطفل في درس فردي"],
  ["Un accompagnement <b>sur mesure</b> pour révéler tout le potentiel de votre enfant.", "مواكبة <b>مصمّمة خصيصاً</b> لإبراز كامل إمكانات طفلكم."],
  ["Le parcours d'apprentissage de l'enfant", "مسار تعلّم الطفل"],
  ["Un parcours flexible, pensé pour votre enfant.", "مسار مرن مصمّم لطفلكم."],
  ["Ce que votre enfant veut atteindre.", "ما يريد طفلكم الوصول إليه."],
  ["Construit autour de lui.", "مصمّم حول احتياجاته."],
  ["Choisissez la langue de votre enfant et nous construisons le parcours idéal.", "اختاروا لغة طفلكم وسنبني له المسار الأنسب."],
  ["On adapte le programme à l'objectif de votre enfant.", "نكيّف البرنامج مع هدف طفلكم."],
  ["Des professeurs qualifiés,<br>choisis pour votre enfant", "مدرّسون مؤهلون<br>نختارهم لطفلكم"],
  ["selon l'âge, le niveau, les objectifs et les disponibilités.", "حسب العمر والمستوى والأهداف والأوقات المناسبة."],
  ["Vous savez où en est votre enfant", "تعرفون مستوى تقدّم طفلكم"],
  ["Ce que disent <span class=\"c\">les parents</span>", "ما يقوله <span class=\"c\">الآباء والأمهات</span>"],
  ["Des familles qui progressent avec", "عائلات تتقدّم مع"],
  ["Prêt à aider votre enfant à progresser ?", "هل أنتم مستعدون لمساعدة طفلكم على التقدّم؟"],
  ["Retrouvez ici les réponses aux questions les plus fréquentes des parents.", "إليكم إجابات عن أكثر أسئلة الآباء والأمهات شيوعاً."],
  ["À partir de quel âge mon enfant peut-il suivre des cours ?", "ابتداءً من أي عمر يمكن لطفلي متابعة الدروس؟"],
  ["À partir de 8 ans.", "ابتداءً من سن 8 سنوات."],
  ["À partir d'1h00, avec 1h15 recommandé pour les enfants. Vous choisissez la durée.", "ابتداءً من ساعة، ونوصي بساعة و15 دقيقة للأطفال. أنتم تختارون المدة."],
  ["Comment choisissez-vous le professeur de mon enfant ?", "كيف تختارون مدرّس طفلي؟"],
  ["Selon son âge, son niveau, ses objectifs et ses disponibilités.", "حسب عمره ومستواه وأهدافه والأوقات المناسبة له."],
  ["Mon enfant garde-t-il le même professeur ?", "هل يحتفظ طفلي بنفس المدرّس؟"],
  ["Oui, le même professeur à chaque séance.", "نعم، نفس المدرّس في كل حصة."],
  ["Comment choisir les horaires de mon enfant ?", "كيف أختار أوقات طفلي؟"],
  ["Comment puis-je suivre les progrès de mon enfant ?", "كيف يمكنني متابعة تقدّم طفلي؟"],
  ["Nous disposons d'une variété de manuels et de supports pédagogiques, et nous choisissons celui qui correspond le mieux aux besoins de votre enfant.", "نوفر مجموعة متنوعة من الكتب والوسائل التعليمية، ونختار الأنسب لاحتياجات طفلكم."],
  ["De quoi mon enfant a-t-il besoin pour suivre le cours en ligne ?", "ماذا يحتاج طفلي لمتابعة الدرس عبر الإنترنت؟"],
];

const AR_ADULT_REPLACEMENTS = [
  ["Un cours rien que pour <span class=\"c\">vous", "درس مصمّم خصيصاً <span class=\"c\">لكم"],
  ["Anglais, espagnol, arabe ou français. Un professeur dédié, un rythme adapté à votre niveau et à vos objectifs.", "الإنجليزية أو الإسبانية أو العربية أو الفرنسية، مع مدرّس مخصّص ووتيرة تناسب مستواكم وأهدافكم."],
  ["M'inscrire", "سجّل الآن"],
  ["Adulte en cours particulier en ligne", "متعلم راشد يتابع درساً فردياً عبر الإنترنت"],
  ["Cours d'anglais en ligne pour adultes", "دروس الإنجليزية الفردية للراشدين عبر الإنترنت"],
  ["Cours d'espagnol en ligne pour adultes", "دروس الإسبانية الفردية للراشدين عبر الإنترنت"],
  ["Cours d'arabe en ligne pour adultes", "دروس العربية الفردية للراشدين عبر الإنترنت"],
  ["Cours de français en ligne pour adultes", "دروس الفرنسية الفردية للراشدين عبر الإنترنت"],
  ["un apprenant · 1 prof", "متعلم واحد · مدرّس واحد"],
  ["Un suivi adapté à chaque apprenant.", "متابعة تناسب كل متعلم."],
  ["Professeur et enfant en cours individuel", "مدرّس ومتعلم في درس فردي"],
  ["Un accompagnement <b>sur mesure</b> pour révéler tout votre potentiel.", "مواكبة <b>مصمّمة خصيصاً</b> لإبراز كامل إمكاناتكم."],
  ["Le parcours d'apprentissage de l'enfant", "مسار التعلّم الفردي"],
  ["Un parcours flexible, pensé pour vous.", "مسار مرن مصمّم لكم."],
  ["Ce que vous voulez atteindre.", "ما تريدون الوصول إليه."],
  ["Construit autour de vous.", "مصمّم حول احتياجاتكم."],
  ["Choisissez votre langue et nous construisons le parcours idéal.", "اختاروا اللغة وسنبني لكم المسار الأنسب."],
  ["On adapte le programme à votre objectif.", "نكيّف البرنامج مع هدفكم."],
  ["Des professeurs qualifiés,<br>choisis pour vous", "مدرّسون مؤهلون<br>نختارهم لكم"],
  ["selon l'âge, le niveau, les objectifs et les disponibilités.", "حسب المستوى والأهداف والأوقات المناسبة."],
  ["Vous savez exactement où vous en êtes", "تعرفون مستوى تقدّمكم بدقة"],
  ["Ce que disent <span class=\"c\">nos apprenants</span>", "ما يقوله <span class=\"c\">متعلمونا</span>"],
  ["Des familles qui progressent avec", "متعلمون يتقدّمون مع"],
  ["Prêt à atteindre vos objectifs ?", "هل أنتم مستعدون لتحقيق أهدافكم؟"],
  ["Retrouvez ici les réponses aux questions les plus fréquentes des adultes.", "إليكم إجابات عن أكثر أسئلة المتعلمين الراشدين شيوعاً."],
  ["Puis-je commencer même si je suis débutant ?", "هل يمكنني البدء حتى لو كنت مبتدئاً؟"],
  ["Nos cours particuliers sont ouverts aux adultes de tous niveaux.", "دروسنا الفردية مفتوحة للراشدين من جميع المستويات."],
  ["À partir d'1h00, avec des créneaux jusqu'à 2h00 pour les adultes. Vous choisissez la durée.", "ابتداءً من ساعة، مع إمكانية اختيار حصص تصل إلى ساعتين. أنتم تختارون المدة."],
  ["Comment choisissez-vous mon professeur ?", "كيف تختارون مدرّسي؟"],
  ["Selon votre niveau, vos objectifs et vos disponibilités.", "حسب مستواكم وأهدافكم والأوقات المناسبة لكم."],
  ["Est-ce que je garde le même professeur ?", "هل أحتفظ بنفس المدرّس؟"],
  ["Oui, le même professeur à chaque séance.", "نعم، نفس المدرّس في كل حصة."],
  ["Comment choisir mes horaires ?", "كيف أختار أوقاتي؟"],
  ["Comment puis-je suivre mes progrès ?", "كيف يمكنني متابعة تقدّمي؟"],
  ["Nous disposons d'une variété de manuels et de supports pédagogiques, et nous choisissons celui qui correspond le mieux à vos besoins.", "نوفر مجموعة متنوعة من الكتب والوسائل التعليمية، ونختار الأنسب لاحتياجاتكم."],
  ["De quoi ai-je besoin pour suivre le cours en ligne ?", "ماذا أحتاج لمتابعة الدرس عبر الإنترنت؟"],
];

function applyReplacements(html, replacements) {
  replacements.forEach(([from, to]) => {
    html = html.replaceAll(from, to);
  });
  return html;
}

function getPageHtml(audience, locale) {
  let html = KIDS_HTML;

  if (audience === "adults") {
    html = applyReplacements(html, ADULT_REPLACEMENTS);
    html = html.replace(
      '<div class="toggle" role="tablist"><button class="on" role="tab" aria-selected="true">Enfants</button><button role="tab" aria-selected="false">Adultes</button></div>',
      '<div class="toggle" role="tablist"><button role="tab" aria-selected="false">Enfants</button><button class="on" role="tab" aria-selected="true">Adultes</button></div>'
    );
  }

  if (locale === "ar") {
    html = applyReplacements(html, audience === "kids" ? AR_KIDS_REPLACEMENTS : AR_ADULT_REPLACEMENTS);
    html = applyReplacements(html, AR_COMMON_REPLACEMENTS);
  }

  if (audience === "adults") {
    html = html.replace(
      /<div class="reveal price">[\s\S]*?<\/div>\n  <div class="reveal ctapanel">/,
      `${ADULT_PRICING[locale === "ar" ? "ar" : "fr"]}\n  <div class="reveal ctapanel">`
    );
    if (locale === "ar") {
      html = html
        .replace("سعر بسيط وواضح", "ثلاث باقات بأسعار تنازلية")
        .replace("150 درهماً للساعة دون الضريبة. الأداء شهري ومسبق، مع 100 درهم رسوم تسجيل تُدفع مرة واحدة.", "ثلاث باقات: 15 ساعة بسعر 200 درهم للساعة، و20 ساعة بسعر 180 درهماً، و30 ساعة بسعر 160 درهماً. الأداء مقدماً.");
    } else {
      html = html
        .replace("Un tarif simple et clair", "Trois packs, un tarif dégressif")
        .replace("150 DH / heure (hors taxe). Paiement mensuel réglé à l'avance, avec 100 DH de frais d'inscription la première fois seulement.", "Trois packs : 15 heures à 200 DH/h, 20 heures à 180 DH/h ou 30 heures à 160 DH/h. Paiement réglé à l'avance.");
    }
  }

  return html;
}

export default function CoursParticuliersClient({ audience = "kids" }) {
  const locale = useLocale();
  const router = useRouter();
  const [activeLanguage, setActiveLanguage] = useState("en");
  const html = useMemo(() => getPageHtml(audience, locale), [audience, locale]);

  useEffect(() => setActiveLanguage("en"), [audience, locale]);

  useEffect(() => {
    const root = document.querySelector(".cp-root");
    if (!root) return;

    root.querySelectorAll(".ltab").forEach((button) => {
      button.setAttribute("aria-selected", String(button.dataset.l === activeLanguage));
    });
    root.querySelectorAll(".lpanel").forEach((panel) => {
      panel.setAttribute("aria-hidden", String(!panel.classList.contains(activeLanguage)));
    });
  }, [activeLanguage, html]);

  const handleRootClick = (event) => {
    const tab = event.target.closest?.(".ltab");
    const language = tab?.dataset.l;
    if (!tab || !["en", "es", "ar", "fr"].includes(language)) return;

    setActiveLanguage(language);
  };

  useEffect(() => {
    const root = document.querySelector(".cp-root");
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // scroll reveal + one-time counter
    function count(el, from, to, dur) {
      if (reducedMotion) {
        el.textContent = to;
        return;
      }
      const s = performance.now();
      el.textContent = from;
      (function step(t) {
        const p = Math.min(1, (t - s) / dur);
        el.textContent = Math.round(from + (to - from) * p);
        if (p < 1) requestAnimationFrame(step);
      })(s);
    }
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          if (e.target.id === "pricecount") count(e.target, 220, 150, 900);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.16 }
    );
    root.querySelectorAll(".reveal, #report, #pricecount").forEach((el) => {
      if (el.closest(".hero")) return;
      io.observe(el);
    });

    // language selector tabs
    const cleanups = [];

    root.querySelectorAll(".btn-coral").forEach((button) => {
      const onEnroll = () => {
        const pack = button.dataset.packHours;
        const packQuery = audience === "adults" && pack ? `&pack=${pack}` : "";
        router.push(`/cours-particuliers/inscription?audience=${audience}${packQuery}`);
      };
      button.addEventListener("click", onEnroll);
      cleanups.push(() => button.removeEventListener("click", onEnroll));
    });

    root.querySelectorAll('a[href="#pricing"]').forEach((link) => {
      const onPricing = (event) => {
        event.preventDefault();
        root.querySelector("#pricing")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      };
      link.addEventListener("click", onPricing);
      cleanups.push(() => link.removeEventListener("click", onPricing));
    });

    const audienceTabs = [...root.querySelectorAll(".toggle button")];
    audienceTabs.forEach((button, index) => {
      const onAudience = () => router.push(index === 0 ? "/cours-particuliers" : "/cours-particuliers/adultes");
      button.addEventListener("click", onAudience);
      cleanups.push(() => button.removeEventListener("click", onAudience));
    });
    // smooth accordion
    root.querySelectorAll(".faq details").forEach((d) => {
      const ans = d.querySelector(".ans");
      ans.style.overflow = "hidden";
      ans.style.maxHeight = d.open ? "none" : "0px";
      ans.style.transition = "max-height .32s cubic-bezier(.22,1,.36,1)";
      const summary = d.querySelector("summary");
      const onClick = (e) => {
        e.preventDefault();
        if (d.open) {
          ans.style.maxHeight = ans.scrollHeight + "px";
          requestAnimationFrame(() => (ans.style.maxHeight = "0px"));
          setTimeout(() => (d.open = false), 320);
        } else {
          d.open = true;
          ans.style.maxHeight = "0px";
          requestAnimationFrame(() => (ans.style.maxHeight = ans.scrollHeight + "px"));
        }
      };
      summary.addEventListener("click", onClick);
      cleanups.push(() => summary.removeEventListener("click", onClick));
    });

    return () => {
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [audience, locale, router]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="cp-root"
        dir={locale === "ar" ? "rtl" : "ltr"}
        data-audience={audience}
        data-active-language={activeLanguage}
        onClick={handleRootClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
