(()=> {
  const labels={NOT_ADOPTED:"Chưa nhận nuôi",PENDING_ADOPTION:"Đang chờ nhận nuôi",ADOPTED:"Đã nhận nuôi",NOT_READY:"Chưa sẵn sàng nhận nuôi"};
  const esc=s=>String(s??"—").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let index=0,photos=[];
  function data(){try{return JSON.parse(localStorage.getItem("littlePawsData")||"{}")}catch{return {}}}
  function close(){document.getElementById("cat-profile-modal")?.remove();document.body.style.overflow=""}
  function open(p){
    photos=[p.image,...(Array.isArray(p.images)?p.images:[])].filter(Boolean);
    index=0;
    const status=labels[p.status]||labels.NOT_ADOPTED;
    const modal=document.createElement("div");modal.id="cat-profile-modal";modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-label","Hồ sơ mèo "+p.name);
    modal.innerHTML=`<div class="cat-profile-backdrop"></div><section class="cat-profile-panel"><button class="cat-profile-close" type="button" aria-label="Đóng">×</button><div class="cat-profile-gallery"><button type="button" class="cat-photo-prev" aria-label="Ảnh trước">‹</button><img class="cat-profile-photo" src="${esc(photos[0])}" alt="${esc(p.name)}"><button type="button" class="cat-photo-next" aria-label="Ảnh tiếp">›</button><span class="cat-photo-count"></span></div><div class="cat-profile-info"><span class="cat-profile-status">${status}</span><h2>${esc(p.name)}</h2><p class="cat-profile-id">${esc(p.id)}</p><dl><div><dt>Tuổi</dt><dd>${esc(p.age)}</dd></div><div><dt>Giới tính</dt><dd>${esc(p.gender)}</dd></div><div><dt>Sức khỏe</dt><dd>${esc(p.health)}</dd></div><div><dt>Tiêm phòng</dt><dd>${esc(p.vaccinated)}</dd></div><div><dt>Tính cách</dt><dd>${esc(p.personality)}</dd></div><div><dt>Chăm sóc</dt><dd>${esc(p.care)}</dd></div></dl><p>${esc(p.description)}</p></div></section>`;
    document.body.appendChild(modal);document.body.style.overflow="hidden";
    const update=()=>{const img=modal.querySelector(".cat-profile-photo");img.src=photos[index];modal.querySelector(".cat-photo-count").textContent=(index+1)+" / "+photos.length;modal.querySelector(".cat-photo-prev").disabled=photos.length<2;modal.querySelector(".cat-photo-next").disabled=photos.length<2};
    modal.querySelector(".cat-profile-close").onclick=close;modal.querySelector(".cat-profile-backdrop").onclick=close;
    modal.querySelector(".cat-photo-prev").onclick=()=>{index=(index+photos.length-1)%photos.length;update()};
    modal.querySelector(".cat-photo-next").onclick=()=>{index=(index+1)%photos.length;update()};
    modal.addEventListener("keydown",e=>{if(e.key==="Escape")close();if(e.key==="ArrowLeft")modal.querySelector(".cat-photo-prev").click();if(e.key==="ArrowRight")modal.querySelector(".cat-photo-next").click()});
    update();modal.querySelector(".cat-profile-close").focus();
  }
  document.addEventListener("click",e=>{const card=e.target.closest("[data-cat-id]");if(!card)return;const p=(data().pets||[]).find(x=>x.id===card.dataset.catId);if(p)open(p)});
  document.addEventListener("keydown",e=>{const card=e.target.closest?.("[data-cat-id]");if(card&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const p=(data().pets||[]).find(x=>x.id===card.dataset.catId);if(p)open(p)}});
  const css=document.createElement("style");css.textContent=`
  .pet-card[data-cat-id]{cursor:pointer}.pet-card-hint{display:inline-block;margin-top:8px;color:#a64f72;font-weight:700}
  #cat-profile-modal{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:18px;font-family:inherit}
  .cat-profile-backdrop{position:absolute;inset:0;background:#17131dcc}
  .cat-profile-panel{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(260px,1fr);gap:24px;width:min(900px,100%);max-height:90vh;overflow:auto;background:#fffaf5;border-radius:22px;padding:24px;box-shadow:0 20px 70px #0005}
  .cat-profile-close{position:absolute;right:12px;top:8px;border:0;background:#fff;border-radius:50%;width:38px;height:38px;font-size:28px;z-index:2;cursor:pointer}
  .cat-profile-gallery{position:relative;align-self:start}.cat-profile-photo{width:100%;height:420px;max-height:60vh;object-fit:cover;border-radius:16px}
  .cat-photo-prev,.cat-photo-next{position:absolute;top:48%;border:0;border-radius:50%;width:38px;height:38px;font-size:25px;background:#ffffffdd;cursor:pointer}.cat-photo-prev{left:10px}.cat-photo-next{right:10px}.cat-photo-count{position:absolute;bottom:12px;right:12px;background:#0009;color:white;padding:4px 10px;border-radius:20px;font-size:13px}
  .cat-profile-info{padding:22px 8px 8px}.cat-profile-status{display:inline-block;padding:5px 12px;background:#f7e5ed;border-radius:18px;color:#85405f;font-weight:700}.cat-profile-id{color:#777;font-size:13px}.cat-profile-info dl{display:grid;grid-template-columns:1fr 1fr;gap:12px}.cat-profile-info dl div{background:#fff;padding:10px;border-radius:10px}.cat-profile-info dt{font-size:12px;color:#777}.cat-profile-info dd{margin:3px 0 0;font-weight:600}
  @media(max-width:650px){.cat-profile-panel{grid-template-columns:1fr;gap:10px;padding:14px}.cat-profile-photo{height:280px}.cat-profile-info{padding:8px}.cat-profile-info dl{gap:8px}}
  `;document.head.appendChild(css);
})();