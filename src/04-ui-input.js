'use strict';

/* TITLE / ONBOARDING
 * The title screen front-loads only the rules that prevent confusion: vulnerable body,
 * safe head/rainbow, movement, steering, and the pull->Snap relationship. Advanced systems
 * are intentionally discovered during play so the game still has surprise and mastery. */
function title(){X.fillStyle='#17191e';X.fillRect(0,0,W,H);for(let i=0;i<6;i++){X.strokeStyle=RC[i];X.lineWidth=9;X.beginPath();X.arc(W/2,265+i*5,250+i*4+Math.sin(t*2+i)*2,Math.PI,2*Math.PI);X.stroke()}txt('STRETCHICORN',W/2,132,42,'#fff8ff','center');txt('RAINBOW ETERNAL',W/2,172,24,'#ffb4df','center');txt('13 HEARTS • 13 TRIALS • RESTORE THE SKY.',W/2,235,18,'#ffe767','center');txt('ONLY THE ♥ BODY TAKES DAMAGE • HEAD + RAINBOW ARE SAFE',W/2,274,13,'#ff9dbc','center');txt('WASD = MOVE ♥ BODY • ARROWS = STEER SAFE HEAD',W/2,316,15,'#dff','center');txt('SPACE = HORN STRIKE / SLINGSHOT',W/2,349,15,'#dff','center');txt('PULL AWAY FROM THE HORN • SHORT STRETCH = SNAP READY',W/2,382,14,'#ffe767','center');txt('SNAP AGAIN FAST = DOUBLE RAINBOW + SAFE BURST',W/2,414,15,'#9bffca','center');txt('GRAZE ORBS FOR SPRING • EVERY 13 KILLS = LUCKY BURST',W/2,446,13,'#cbbce4','center');txt('SPACE / ENTER  •  RIDE THE STORM',W/2,500,18,'#fff','center');txt('Best '+best+'   •   v0.15.0 STORMBREAK',W/2,550,12,'#7e6f9a','center')}
function panel(a,b){X.fillStyle='#000c';X.fillRect(200,220,560,190);txt(a,W/2,280,30,'#fff','center');b.split('\n').forEach((s,i)=>txt(s,W/2,330+i*30,15,i?'#9abbb2':'#9bffca','center'))}

/* Final victory deliberately lasts several seconds instead of switching instantly to a menu.
   It reuses happy-cloud, rainbow-ring, and particle primitives so the ending feels bespoke
   while remaining consistent with the tiny-system design philosophy. */
function victory(){scene();let q=cl((3.4-winT)/3.4,0,1),z=cl(q*2.6,0,1);if(q<.55){happy(voidX,voidY,1+z*1.8,1-q*1.6);X.globalAlpha=1-q;for(let i=0;i<6;i++){X.strokeStyle=RC[i];X.lineWidth=5;X.beginPath();X.arc(voidX,voidY,25+z*(110+i*11),0,T);X.stroke()}X.globalAlpha=1}X.fillStyle='rgba(255,255,255,'+cl((q-.12)*.78,0,.68)+')';X.fillRect(0,0,W,H);X.globalAlpha=.08+.26*q;for(let i=0;i<6;i++){X.fillStyle=RC[i];X.fillRect(i*W/6,0,W/6,H)}for(let i=0;i<32;i++){X.fillStyle=RC[i%6];X.fillRect((i*97)%W,(t*95+i*61)%H,3,9)}X.globalAlpha=1;if(q>.22){txt(winT>1.45?'THE STORM IS BROKEN':'RAINBOW ETERNAL',W/2,H/2-20,34,'#fff','center');txt('FINAL SCORE: '+score,W/2,H/2+35,22,'#fff','center')}}
function draw(){if(mode==0)return title();if(mode==5)return victory();scene();if(mode==2)panel('PAUSED','P RESUME   •   M MENU');if(mode==3)panel('GAME OVER','SPACE RETRY   •   M MENU\nScore '+score+'   Best '+best);if(mode==4)panel('RAINBOW ETERNAL','[ SPACE ] PLAY AGAIN\nFINAL SCORE '+score+'   Best '+best)}

/* Fixed-step loop: browser frame time is accumulated, gameplay advances in 1/60s quanta,
   then one frame is drawn. J is cleared every rendered frame because it represents key edges;
   K persists until keyup because it represents held movement/aim state. */
function loop(n){let dt=Math.min((n-last)/1000,.05);last=n;acc+=dt;while(acc>=1/60){upd(1/60);acc-=1/60}draw();for(let k in J)delete J[k];requestAnimationFrame(loop)}

/* Desktop-first input. Arrow/default scrolling is suppressed only for game controls.
   Window blur clears held keys to avoid "stuck movement" after Alt-Tab or focus changes. */
onkeydown=e=>{let k=e.key.length==1?e.key.toLowerCase():e.key;K[k]=1;J[k]=1;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();if(mode==0&&(e.key==' '||k=='enter'))reset();else if(k=='p'&&mode==1)mode=2;else if(k=='p'&&mode==2)mode=1;else if(k=='m')mode=0;else if((mode==3||mode==4)&&e.key==' ')reset()};onkeyup=e=>K[e.key.length==1?e.key.toLowerCase():e.key]=0;onblur=()=>{for(let k in K)delete K[k]};

/* Small debug/regression surface used during development. It exposes state without changing
   normal play and makes deterministic tests possible for spawning, spring charge, boss phases,
   collision safety, Lucky 13, and victory transitions. */
window.__SR={reset,upd,startKick,get:()=>({mode,wave,score,hearts,kills,charge,ready,snap,snapT,hlen,hv,pull,shot,kick,sling,aim,enemies:E.length,queen,shield,speed,gold,over,pickups:U.length,walls:R.length,head:{...P},rear:{...A},rearBlocked:!!hitW(A.x,A.y,24),headBlocked:!!hitW(P.x,P.y,21),luckyT,flash,winT,boss:E.find(e=>e.type==3)?.p,bossIn:E.find(e=>e.type==3)?.in,fx:G.length,voidX,voidY}),setKeys:o=>Object.assign(K,o),clear:()=>{for(let k in K)delete K[k]},wave:n=>{wave=n;spawnWave()},pos:(x,y)=>{A.x=x;A.y=y;P.x=x+Math.cos(aim)*hlen;P.y=y+Math.sin(aim)*hlen}};requestAnimationFrame(loop);
