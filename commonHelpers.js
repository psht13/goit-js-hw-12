import{a as F,i as m,S as w}from"./assets/vendor-b0d10f48.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();function b({views:t,downloads:e,likes:s,comments:n,webformatURL:o,largeImageURL:r,tags:i}){return`<li class="card">
      <a class="card-image-wrapper" href="${r}">
        <img class="card-image" src="${o}" alt="${i}" data-full="${r}">
      </a>
      <ul class="card-content">
        <li class="card-content-item">Likes <span data-likes="">${s}</span></li>
        <li class="card-content-item">Comments <span data-comments="">${n}</span></li>
        <li class="card-content-item">Views <span data-views="">${t}</span></li>
        <li class="card-content-item">Downloads <span data-downloads="">${e}</span></li>
      </ul>
    </li>`}function f(t){return t.map(e=>b(e)).join("")}const v=F.create({baseURL:"https://pixabay.com"}),P="/api/";async function h(t,e){t=t.toLowerCase().split(" ").join("+").toString();const s={key:"44424725-c6298a470a26677f9f5105ec2",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:15};return(await v.get(P,{params:s})).data}const a={form:document.querySelector(".entry-form"),input:document.querySelector(".entry-form-input"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".next-page")},S={titleColor:"#FFFFFF",messageColor:"#FFFFFF",backgroundColor:"#EF4040",progressBarColor:"#B51B1B",message:"Sorry, there are no images matching<br>your search query.Please try again!",position:"topRight"},M={captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.8},C=15;let l,c=1,d=10,u="";function g(){a.loader.classList.remove("visually-hidden")}function y(){a.loader.classList.add("visually-hidden")}function O(){a.loadMore.classList.remove("visually-hidden")}function p(){a.loadMore.classList.add("visually-hidden")}function $(){const t=a.gallery.children[0].getBoundingClientRect().height,e=24;window.scrollBy({top:2*t+e,behavior:"smooth"})}function L(){c>=d?(p(),d&&m.info({position:"topRight",messageColor:"#FFFFFF",message:"We're sorry, but you've reached<br> the end of search results."})):O()}async function q(t){g(),p(),c=1,a.gallery.innerHTML="";try{const e=await h(t,c);if(e.hits.length===0){m.error(S);return}d=Math.ceil(e.totalHits/C);const s=f(e.hits);a.gallery.innerHTML=s,L(),l=new w(".gallery a",M),l.refresh(),l.on("show.simplelightbox")}catch(e){console.log(e)}finally{y()}}a.form.addEventListener("submit",t=>{t.preventDefault(),u=a.input.value.trim(),q(u),a.form.reset()});a.loadMore.addEventListener("click",async()=>{c++,p(),g();try{const t=await h(u,c),e=f(t.hits);a.gallery.insertAdjacentHTML("beforeend",e),L(),$(),l.refresh(),l.on("show.simplelightbox")}catch(t){console.log(t)}finally{y()}});
//# sourceMappingURL=commonHelpers.js.map
