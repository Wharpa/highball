!function(t){function n(a){if(e[a])return e[a].exports;var r=e[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:a})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=2)}([function(t,n,e){"use strict";var a=function(){for(var t=document.querySelectorAll(".ball"),n=0;n<t.length;n++){var e=new Hammer(t[n]);e.on("press",function(n){var e=n.target,a=Array.from(t),r=Array.from(n.target.classList),s=r[1];e.classList.contains("ball-dead")||e.classList.contains("ball-space")?(e.classList.remove("ball-dead"),a.filter(function(t){return t.classList.contains(s)}).forEach(function(t){return t.classList.remove("ball-dead")})):(e.classList.add("ball-dead"),a.filter(function(t){return t.classList.contains(s)}).forEach(function(t){return t.classList.add("ball-dead")}))}),t[n].addEventListener("click",function(n){var e=n.target;e.classList.contains("ball-space")||n.target.classList.add("ball-inactive");var a=Array.from(t),r=Array.from(n.target.classList),s=r[1];a.filter(function(t){return!t.classList.contains("ball-space")}).filter(function(t){return!t.classList.contains("ball-dead")}).filter(function(t){return t.classList.contains(s)}).forEach(function(t){t.classList.contains("ball-active")?(t.classList.remove("ball-active"),t.classList.add("ball-inactive")):t.classList.contains("ball-inactive")&&(t.classList.add("ball-active"),t.classList.remove("ball-inactive")),t.classList.contains("ball-active")||(t.classList.add("ball-inactive"),t.classList.remove("ball-active"))})})}}();t.exports=a},function(t,n,e){"use strict";var a=function(){for(var t=document.querySelectorAll(".increment"),n=document.querySelectorAll(".decrement"),e=function(t,n){if(t){var e=n.target.nextElementSibling,a=e.innerHTML;a++}else{var e=n.target.previousElementSibling,a=e.innerHTML;if("0"===a)return;a--}e.innerHTML=a},a=0;a<t.length;a++)t[a].addEventListener("click",e.bind(null,!0));for(var r=0;r<n.length;r++)n[r].addEventListener("click",e.bind(null,!1))}();t.exports=a},function(t,n,e){"use strict";e(1),e(0)}]);