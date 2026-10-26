// @ts-nocheck
/* live star: tips sit on the hexagon at every angle. Port of swirl.py star_points + spin("bend", -6) */
var R=360,C=400,INNER=.38,BEND=1.85,BLUNT=.05,AMT=-6*Math.PI/180,NS=48;
function hb(t){var a=(((t%(Math.PI/3))+Math.PI/3)%(Math.PI/3))-Math.PI/6;return R*Math.cos(Math.PI/6)/Math.cos(a);}
function P(t,r){return [C+r*Math.cos(t),C-r*Math.sin(t)];}
export function starD(phi){var out=[],half=15*Math.PI/180;
 for(var i=0;i<12;i++){var a=(i*30+phi)*Math.PI/180;var tip=P(a,hb(a));var vin=P(a-half,INNER*R),vout=P(a+half,INNER*R);
  var cin=P(a-BLUNT*half,BEND*INNER*R),cout=P(a+BLUNT*half,BEND*INNER*R);
  for(var k=0;k<NS;k++){var u=k/NS;out.push(q(vin,cin,tip,u));}
  for(var k=0;k<NS;k++){var u=k/NS;out.push(q(tip,cout,vout,u));}}
 var d="";for(var j=0;j<out.length;j++){var x=out[j][0],y=out[j][1],dx=x-C,dy=C-y,r=Math.hypot(dx,dy),th=Math.atan2(dy,dx),tr=hb(th);
  var t=Math.max(0,Math.min(1,(r-INNER*R)/(tr-INNER*R)));var th2=th+AMT*Math.sin(Math.PI*t);
  /* final turn onto the point: (x,y) -> (y, 800-x) */
  var X=C+r*Math.cos(th2),Y=C-r*Math.sin(th2);d+=(j?"L":"M")+Y.toFixed(1)+" "+(800-X).toFixed(1);}
 return d+"Z";}
function q(p0,c,p1,u){var w=1-u;return [w*w*p0[0]+2*w*u*c[0]+u*u*p1[0],w*w*p0[1]+2*w*u*c[1]+u*u*p1[1]];}
