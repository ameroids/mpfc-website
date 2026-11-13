
(()=>{
const $=id=>document.getElementById(id),R=document.documentElement,
v=$('v'),track=$('track'),scene=$('scene'),giant=$('giant'),strip=$('strip'),speed=$('speed'),
cards=[...document.querySelectorAll('.card')],
HI=window.MPFC_VIDEO_HI||'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/409763c0-95f4-49d3-a601-dc564d55072b.mp4',
LO=window.MPFC_VIDEO_LO||'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b3718419-7a0a-478d-bfb0-0ff8bef7f3f7.mp4',
A=2.4,rec=new URLSearchParams(location.search).has('rec'),
cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
let vw,vh,B,stripW,giantW,cur=0,spd=0,lastY=0,lastT=performance.now(),recSpeed=null,src='';

function layout(){
 vw=innerWidth;vh=scene.clientHeight||innerHeight;
 const mob=vw<768||vw<=vh;
 const u=mob?Math.min(vw/430,1.2):Math.min(vw/1440,vh/960);
 R.style.setProperty('--u',u+'px');
 let w,h,l,t;
 if(!mob){
   const s=Math.max(vw/1920,vh/1080);
   w=1920*s;h=1080*s;
   l=(vw-w)/2;t=(vh-h)/2;
 } else {
   // Mobile / Portrait: Maintain full aspect ratio so the entire vehicle fits on screen
   w=Math.max(vw*1.15, 420);
   h=w*9/16;
   l=(vw-w)/2;
   t=Math.max(70, vh*0.35 - h*0.5);
 }
 Object.assign(v.style,{width:w+'px',height:h+'px',left:l+'px',top:t+'px'});
 R.style.setProperty('--edge-px',Math.round(t+h*0.82)+'px');
 R.style.setProperty('--l',Math.round(t+h)+'px');
 const want=vw<=900?LO:HI;
 if(want!==src){src=want;v.src=want;v.load()}
 stripW=strip.scrollWidth;giantW=giant.scrollWidth;
 B=(stripW+.45*vw)/vw*1.1;
 track.style.height=(1+A+B)*vh+'px';
}

function frame(now){
 const y=scrollY,dt=Math.max(1,now-lastT);
 const inst=recSpeed!=null?recSpeed:Math.abs(y-lastY)/dt*1000/32;
 spd+=(inst-spd)*.15;lastY=y;lastT=now;
 const q=cl(y/(A*vh)),dur=(v.duration||4.04)-1/48,target=q*dur;
 cur+=(target-cur)*.2;
 if(!v.seeking&&Math.abs(v.currentTime-cur)>1/60&&v.readyState>0)v.currentTime=cur;
 R.style.setProperty('--ph',q>=.94?1:0);
 if(speed) speed.textContent=String(Math.min(99,Math.round(spd))).padStart(2,'0')+' KM/H';
 const r=cl((y-A*vh)/(B*vh));
 strip.style.transform=`translateX(${vw-r*(stripW+.45*vw)}px)`;
 giant.style.transform=`translate(${vw-r*(giantW+vw)}px,-100%)`;
 for(const c of cards){
  const s=cl((.98-c.getBoundingClientRect().left/vw)/.3,-.4,1.6)*100+'%';
  c.children[1].style.setProperty('--s',s);c.children[2].style.setProperty('--s',s);
 }
 requestAnimationFrame(frame);
}
v.addEventListener('seeked',()=>{if(Math.abs(v.currentTime-cur)>1/60)v.currentTime=cur});
v.addEventListener('loadedmetadata',layout);
addEventListener('resize',layout);
addEventListener('load',layout);
document.fonts&&document.fonts.ready.then(layout);

if(rec){
 const d=document.createElement('div');d.style.cssText='position:fixed;opacity:0;pointer-events:none';document.body.appendChild(d);
 const an=d.animate([{opacity:0,offset:0,easing:'cubic-bezier(.4,.05,.55,.95)'},{opacity:0,offset:.04},{opacity:1,offset:.96},{opacity:1,offset:1}],{duration:11000,fill:'both'});
 an.pause();let prevP=0;
 window.__recTime=(video,t)=>{
  an.currentTime=t*1000;
  const p=+getComputedStyle(d).opacity,max=track.offsetHeight-vh;
  scrollTo(0,p*max);
  recSpeed=Math.abs(p-prevP)*max/(1/30)/32/32*32;prevP=p;
  const q=cl(p*max/(A*vh)),T=q*((video.duration||4.04)-1/48);
  cur=T;video.currentTime=T;spd=recSpeed;
  if(speed) speed.textContent=String(Math.min(99,Math.round(spd))).padStart(2,'0')+' KM/H';
  return T;
 };
}
layout();requestAnimationFrame(frame);
})();
