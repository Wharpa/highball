!function(e){function t(r){if(n[r])return n[r].exports;var l=n[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";var r=function(){for(var e=document.querySelectorAll(".ball"),t=0;t<e.length;t++){var n=new Hammer(e[t]);n.on("press",function(t){var n=t.target,r=Array.from(e),l=Array.from(t.target.classList),a=l[1];n.classList.contains("ball-dead")||n.classList.contains("ball-space")||n.classList.contains("ball-9")?(n.classList.remove("ball-dead"),r.filter(function(e){return e.classList.contains(a)}).forEach(function(e){return e.classList.remove("ball-dead")})):r.filter(function(e){return e.classList.contains(a)}).forEach(function(e){e.classList.add("ball-dead"),e.classList.remove("ball-active")})}),e[t].addEventListener("click",function(t){var n=t.target;n.classList.contains("ball-space")||t.target.classList.add("ball-inactive");var r=Array.from(e),l=Array.from(t.target.classList),a=l[1];r.filter(function(e){return!e.classList.contains("ball-space")}).filter(function(e){return!e.classList.contains("ball-dead")}).filter(function(e){return e.classList.contains(a)}).forEach(function(e){e.classList.contains("ball-active")?(e.classList.remove("ball-active"),e.classList.add("ball-inactive")):e.classList.contains("ball-inactive")&&(e.classList.add("ball-active"),e.classList.remove("ball-inactive")),e.classList.contains("ball-active")||(e.classList.add("ball-inactive"),e.classList.remove("ball-active"))})})}}();e.exports=r},function(e,t,n){"use strict";var r=function(){for(var e=document.querySelectorAll(".increment"),t=document.querySelectorAll(".decrement"),n=function(e,t){if(e){var n=t.target.previousElementSibling,r=n.innerHTML;r++}else{var n=t.target.nextElementSibling,r=n.innerHTML;if("0"===r)return;r--}n.innerHTML=r},r=0;r<e.length;r++)e[r].addEventListener("click",n.bind(null,!0));for(var l=0;l<t.length;l++)t[l].addEventListener("click",n.bind(null,!1))}();e.exports=r},function(e,t,n){"use strict";var r=function(){for(var e=document.querySelectorAll(".ball"),t=document.querySelector(".player-one-score"),n=document.querySelector(".player-two-score"),r=0;r<e.length;r++)e[r].addEventListener("click",function(){var e=document.querySelectorAll(".diamond-left .ball-active"),r=document.querySelectorAll(".diamond-right .ball-active"),l=document.querySelector(".diamond-left .ball-9"),a=document.querySelector(".diamond-right .ball-9"),c=document.querySelectorAll(".diamond-left .ball-dead"),i=document.querySelector(".dead-ball-score");t.innerHTML=e.length,n.innerHTML=r.length,l.classList.contains("ball-active")?t.innerHTML++:a.classList.contains("ball-active")&&n.innerHTML++,i.innerHTML=c.length})}();e.exports=r},function(e,t,n){"use strict";n(1),n(0),n(2),n(4)},function(e,t,n){"use strict";var r=function(){function e(){for(var e=0;e<n.length;e++)n[e].classList.remove("ball-active"),n[e].classList.remove("ball-inactive"),n[e].classList.remove("ball-dead")}for(var t=document.querySelectorAll(".ball-9"),n=document.querySelectorAll(".ball"),r=(document.querySelector(".reset-rack"),0);r<t.length;r++)t[r].addEventListener("click",function(){function e(){var e=document.createElement("a");return e.innerHTML=["Rack","reset"].join(" "),e.href="#",e.classList="reset-rack",e}document.body.appendChild(e())});document.body.addEventListener("click",function(t){t.target.classList.contains("reset-rack")&&e()})}();e.exports=r}]);