'use strict';

/*
 * FIXED-STEP GAMEPLAY UPDATE
 * --------------------------
 * `loop()` in 04-ui-input.js feeds this function a fixed 1/60 second timestep. Rendering
 * can vary with display refresh, but movement, spring tuning, enemy timers, and collision
 * behavior stay deterministic enough to reason about and regression-test.
 *
 * The key design choice is that the head is NOT a free 2-D physics body. Arrow keys control
 * `aim`, while the head follows a one-dimensional spring length (`hlen`) along that aim ray.
 * That preserves the playful lag/stretch of the original Frog Foot idea without letting the
 * head wander away from the direction the player is intentionally aiming.
 */
function upd(dt){t+=dt;if(mode==5){winT-=dt;flash=Math.max(0,flash-dt*2);if(winT<=0)mode=4;return}if(mode!=1)return;runT+=dt;flash=Math.max(0,flash-dt*2);luckyT=Math.max(0,luckyT-dt);if(hitstop>0){hitstop-=dt;return}inv=Math.max(0,inv-dt);snapT=Math.max(0,snapT-dt);speed=Math.max(0,speed-dt);gold=Math.max(0,gold-dt);over=Math.max(0,over-dt);msgT=Math.max(0,msgT-dt);comboT-=dt;if(comboT<=0)combo=Math.max(1,combo-dt*.5);if(nextWave){nextWave-=dt;if(nextWave<=0){nextWave=0;wave=Math.min(MAX,wave+1);spawnWave();return}}

 /* INPUT + AIM
  * WASD drives the vulnerable body. Arrow input is converted to a target angle and the
  * current aim rotates toward it at a capped angular speed, so diagonals and partial-angle
  * taps render smoothly instead of snapping between four cardinal directions. */
 let x=(K.d?1:0)-(K.a?1:0),y=(K.s?1:0)-(K.w?1:0),l=ln(x,y),spd=speed>0?1.4:1,ax=(K.ArrowRight?1:0)-(K.ArrowLeft?1:0),ay=(K.ArrowDown?1:0)-(K.ArrowUp?1:0);if(sling>0)aim=slingA;else if(ax||ay){let ta=Math.atan2(ay,ax),d=ad(aim,ta),step=7.2*dt;aim+=cl(d,-step,step)}

 /* SPRING CHARGE
  * `away` is the dot product between movement and the opposite horn direction. Pulling the
  * body away from the horn therefore charges regardless of screen orientation. A forgiving
  * remap produces `wantPull`; charge decays slowly when the player is merely repositioning.
  * Once charge crosses the threshold, `ready` provides a 0.5s grace window and a one-shot
  * boing cue. This makes the signature action frequent and readable instead of frame-perfect. */
 ready=Math.max(0,ready-dt);let mx=x/l||0,my=y/l||0,away=-(mx*Math.cos(aim)+my*Math.sin(aim)),wantPull=(x||y)?cl((away+.04)/.58,0,1):0;pull=Math.max(wantPull,pull-dt*4);
 if(sling>0){sling-=dt;let sx=Math.cos(slingA),sy=Math.sin(slingA);A.vx=sx*880*spd;A.vy=sy*880*spd;inv=Math.max(inv,.1);let px=-sy,py=sx;for(let i=0;i<6;i++)G.push({x:A.x+px*(i-2.5)*4,y:A.y+py*(i-2.5)*4,vx:-sx*(120+rn(90)),vy:-sy*(120+rn(90)),l:.18+rn(.12),c:i})}else{if(x||y){A.vx+=x/l*2350*spd*dt;A.vy+=y/l*2350*spd*dt}A.vx*=.855;A.vy*=.855;if(wantPull>.02)charge=cl(charge+dt*(1.35+wantPull*1.15+(over>0?.55:0)),0,1);else charge=cl(charge-dt*((x||y)?(away<-.2?.58:.11):.14),0,1);let th=over>0?.34:.46;if(charge>th){if(!ready)duo(165,275,'triangle');ready=.5}if(ready>0&&rn()<dt*18){let q=rn();G.push({x:A.x+(P.x-A.x)*q+rn(10)-5,y:A.y+(P.y-A.y)*q+rn(10)-5,vx:rn(50)-25,vy:rn(50)-25,l:.18+rn(.12),c:~~rn(6)})}}

 /* BODY COLLISION
  * The body is accelerated first and resolved axis-by-axis against walls. If a stage change
  * or numerical edge case ever leaves A embedded, safeSpawn() repairs the configuration. */
 if(hitW(A.x,A.y,24))safeSpawn();let nx=cl(A.x+A.vx*dt,28,W-28),ny=cl(A.y+A.vy*dt,105,H-28);if(!hitW(nx,A.y,24))A.x=nx;else A.vx*=-.18;if(!hitW(A.x,ny,24))A.y=ny;else A.vy*=-.18;

 /* ONE-DIMENSIONAL HEAD SPRING
  * Charge lengthens the target rainbow from 52px toward 100px; a Snap compresses it to 44px.
  * `hv` gives the visible elastic overshoot. The head is then projected along the exact aim
  * angle, clamped to arena edges, and shortened by rayW() if geometry blocks the ray.
  * Result: springy motion without sacrificing precise aiming or allowing wall penetration. */
 let targetLen=(sling>0?44:52+charge*48),spring=126,damp=.81;hv+=(targetLen-hlen)*spring*dt;hv*=damp;hlen=cl(hlen+hv*dt,43,104);let cs=Math.cos(aim),sn=Math.sin(aim),lim=hlen;if(cs>0)lim=Math.min(lim,(W-28-A.x)/cs);if(cs<0)lim=Math.min(lim,(28-A.x)/cs);if(sn>0)lim=Math.min(lim,(H-28-A.y)/sn);if(sn<0)lim=Math.min(lim,(105-A.y)/sn);lim=rayW(A.x,A.y,cs,sn,lim,22);lim=Math.max(30,lim);P.x=A.x+cs*lim;P.y=A.y+sn*lim;P.vx=A.vx+cs*hv;P.vy=A.vy+sn*hv;

 /* Attack input is edge-triggered through J, while K is held-key state. Residual charge after
    a horn strike/Snap keeps combat flowing and avoids forcing a full neutral reset every time. */
 if(J[' ']||J.Space)startKick();if(kick>0){kick-=dt;kickCollisions();if(kick<=0&&!sling){charge*=shot>.46?.38:.66;hv-=shot*40}}

 /* POWER-UP ROUTING
  * Power-ups are tested against the closest point on the entire body-head segment, not only
  * the vulnerable body. During a Snap the pickup radius expands, rewarding creative routes
  * through the arena instead of requiring the player to park directly on each item. */
 puT-=dt;if(puT<=0&&U.length<2){drop();puT=6+rn(4)}for(let u of U){u.l-=dt;let dx=P.x-A.x,dy=P.y-A.y,ll=dx*dx+dy*dy||1,q=cl(((u.x-A.x)*dx+(u.y-A.y)*dy)/ll,0,1),px=A.x+dx*q,py=A.y+dy*q;if(Math.hypot(u.x-px,u.y-py)<(sling>0?54:27)){u.dead=1;if(u.type==0){hearts=Math.min(13,hearts+1);say('CANDY HEART +1',.7)}if(u.type==1){shield=1;say('CLOUD PUFF SHIELD',.7)}if(u.type==2){speed=6;say('SUGAR RUSH SPEED',.7)}if(u.type==3){over=6;charge=Math.max(charge,.48);ready=Math.max(ready,.18);say('STAR POWER OVERCHARGE',.7)}if(u.type==4){gold=6;say('GOLD HORSESHOE • 2X',.7)}score+=15;snd(940,.08,.05,'sine')}}for(let i=U.length-1;i>=0;i--)if(U[i].dead||U[i].l<=0)U.splice(i,1);

 /* Progressive onboarding is event/context driven instead of a modal tutorial. The first
    seconds teach the damage model and controls; later hints wait until the player actually
    reaches the corresponding mechanic. */
 if(tip==0&&runT>2.3){tip=1;say('PROTECT THE ♥ BODY • HEAD + RAINBOW CANNOT BE HURT',3)}else if(tip==1&&runT>5.5){tip=2;say('WASD MOVES BODY • ARROWS STEER THE SAFE HEAD',3)}else if(tip==2&&runT>8.5){tip=3;say('PULL AWAY • SHORT STRETCH = SNAP READY',2.7)}else if(tip==3&&ready>0){tip=4;say('PINK FLASH + SPACE = RAINBOW SNAP',2.4)}else if(tip==4&&snapT>0){tip=5;say('SNAP AGAIN QUICKLY = DOUBLE RAINBOW',2.5)}

 /* ENEMY STATE MACHINES
  * Types share one compact update loop:
  *   0/5  chase the vulnerable body;
  *   1/6  telegraph -> charge -> recover, making walls useful weapons;
  *   2/4  maintain range and shoot, with prism birds adding curved spread;
  *   3    boss logic, including health-derived phase escalation.
  */
 for(let e of [...E]){e.hit=Math.max(0,e.hit-dt);if(e.in>0){e.in-=dt;e.y+=(135-e.y)*dt*4;e.cd=1;continue}if(e.type==0||e.type==5){let dx=A.x-e.x,dy=A.y-e.y,d=ln(dx,dy),v=e.type==5?55:95;e.vx+=dx/d*v*dt;e.vy+=dy/d*v*dt}else if(e.type==1||e.type==6){if(e.state==0){e.cd-=dt;if(e.cd<=0){e.state=1;e.tele=e.type==6?.9:.75;e.vx=e.vy=0;e.a=Math.atan2(A.y-e.y,A.x-e.x)}}else if(e.state==1){e.tele-=dt;if(e.tele<=0){let a=e.a,eSp=e.type==6?520:430;e.vx=Math.cos(a)*eSp;e.vy=Math.sin(a)*eSp;e.state=2;e.cd=e.type==6?.8:.55}}else{e.cd-=dt;if(e.cd<=0){e.state=0;e.cd=.8+rn(.7)}}}else if(e.type==2||e.type==4){let dx=A.x-e.x,dy=A.y-e.y,d=ln(dx,dy),want=e.type==4?275:240;if(e.type==4){let tx=-dy/d,ty=dx/d;e.vx+=(tx*90+dx/d*18)*dt;e.vy+=(ty*90+dy/d*18)*dt}else{if(d<want-30){e.vx-=dx/d*80*dt;e.vy-=dy/d*80*dt}else if(d>want+50){e.vx+=dx/d*55*dt;e.vy+=dy/d*55*dt}}e.cd-=dt;if(e.cd<=0){let a=Math.atan2(dy,dx),n=e.type==4?3:1;for(let k=0;k<n;k++){let q=a+(k-(n-1)/2)*.17,cv=e.type==4?(k==1?0:(k?-.9:.9)):0;B.push({x:e.x,y:e.y,vx:Math.cos(q)*210,vy:Math.sin(q)*210,team:2,r:5,l:5,curve:cv})}e.cd=e.type==4?1.15:1.35}}else if(e.type==3){

  /* BOSS PHASE MODEL
   * Phase is derived directly from remaining-health quartile, so no extra scripting table is
   * needed. Each phase increases pursuit, projectile count, curvature, speed, and cadence.
   * The final Voidbow adds radial geometry while reusing the same progression equation.
   */
  let dx=A.x-e.x,dy=A.y-e.y,d=ln(dx,dy),ph=Math.min(3,~~((1-e.hp/e.max)*4)),prime=wave==MAX;if(ph!=e.p){e.p=ph;flash=.15;shake=7;say('BOSS PHASE '+(ph+1),.75);snd(360+ph*140,.09,.055,'sawtooth')}let v=60+ph*14+(prime?20:0);e.vx+=dx/d*v*dt;e.vy+=dy/d*v*dt;e.cd-=dt;if(e.cd<=0){let a=Math.atan2(dy,dx),n=(prime?6:4)+ph,arc=prime?T/n:.18;for(let k=0;k<n;k++){let q=prime?k*arc+t*.4:a+(k-(n-1)/2)*.18,cv=(k%2?1:-1)*(.25+ph*.12+(prime?.2:0)),sp=210+ph*12+(prime?20:0);B.push({x:e.x,y:e.y,vx:Math.cos(q)*sp,vy:Math.sin(q)*sp,team:2,r:6,l:6,curve:cv})}e.state++;if(e.state%3==0&&E.length<(prime?9:7))edge(prime?(e.state%2?4:5):0);e.cd=1.25-ph*.13-(prime?.12:0)}}

  /* Enemy/wall collision doubles as an offensive mechanic: high-speed chargers damage
     themselves when baited into geometry. This lets movement solve combat problems. */
  e.vx*=(e.type==1||e.type==6)&&e.state==2?.99:.96;e.vy*=(e.type==1||e.type==6)&&e.state==2?.99:.96;let ex=cl(e.x+e.vx*dt,e.r,W-e.r),ey=cl(e.y+e.vy*dt,96+e.r,H-e.r),cr=0;if(!hitW(ex,e.y,e.r))e.x=ex;else{e.vx*=-.65;cr=1}if(!hitW(e.x,ey,e.r))e.y=ey;else{e.vy*=-.65;cr=1}if(cr&&Math.hypot(e.vx,e.vy)>150){let dmg=e.type==6?2:1;e.hp-=dmg;score+=20;say(e.type==6?'BULWARK CRASH +20':'WALL SMASH +20',.45);shake=6;snd(110,.06,.05,'square');if(e.type==1||e.type==6){e.state=0;e.cd=1.1}if(e.hp<=0){killE(e,25);continue}}if(ds(e,A)<e.r+25)hurt()}

 /* PROJECTILE RISK LADDER
  * Hostile projectile touching A (<29px) hurts. Passing through the outer 29-54px annulus
  * exactly once marks a Glitter Graze, scoring +13 and restoring spring charge. Reflected
  * (`team==1`) projectiles become player weapons. The same projectile therefore supports
  * dodge, graze, parry, and counterattack decisions with almost no extra data. */
 for(let b of B){b.l-=dt;if(b.curve){let a=b.curve*dt,c=Math.cos(a),s=Math.sin(a),vx=b.vx*c-b.vy*s;b.vy=b.vx*s+b.vy*c;b.vx=vx}b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.l<=0||b.x<0||b.x>W||b.y<80||b.y>H||hitW(b.x,b.y,b.r))b.dead=1;else if(b.team==2){let d=Math.hypot(b.x-A.x,b.y-A.y);if(d<29){b.dead=1;hurt()}else if(d<54&&!b.g){b.g=1;score+=13;charge=cl(charge+.08,0,1);if(charge>.46)ready=Math.max(ready,.25);G.push({x:b.x,y:b.y,vx:-b.vy*.2,vy:b.vx*.2,l:.3,c:~~rn(6)});say('GLITTER GRAZE +13',.35);snd(820,.035,.025,'sine')}}else if(b.team==1){for(let e of [...E])if(Math.hypot(b.x-e.x,b.y-e.y)<e.r+b.r){b.dead=1;e.hp--;if(e.hp<=0)killE(e,20);break}}}for(let i=B.length-1;i>=0;i--)if(B[i].dead)B.splice(i,1);

 /* Particle integration is intentionally tiny and shared. */
 Q.forEach(q=>{q.l-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=.92;q.vy*=.92});for(let i=Q.length-1;i>=0;i--)if(Q[i].l<=0)Q.splice(i,1);G.forEach(g=>{g.l-=dt;g.x+=g.vx*dt;g.y+=g.vy*dt;g.vx*=.94;g.vy*=.94});for(let i=G.length-1;i>=0;i--)if(G[i].l<=0)G.splice(i,1)}
