let profile=SaveSystem.load()||{};let selected=null;let game=null;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function boot(){let bar=document.getElementById("loadBar"),txt=document.getElementById("loadText");for(let i=0;i<=100;i+=4){bar.style.width=i+"%";txt.textContent=i<35?"Preparando o diário...":i<70?"Mapeando os biomas...":"Carregando a expedição...";await sleep(35)}Screens.show(profile.name?"lobby":"profile");if(profile.name)document.getElementById("lobbyName").textContent=profile.name.toUpperCase()}
document.getElementById("profileForm").addEventListener("submit",e=>{e.preventDefault();const name=document.getElementById("profileName").value.trim();if(!name)return;profile={name,completed:false};SaveSystem.save(profile);document.getElementById("lobbyName").textContent=name.toUpperCase();Screens.show("lobby")});
document.getElementById("startButton").addEventListener("click",()=>{const box=document.getElementById("characterCards");box.innerHTML="";CHARACTERS.forEach(ch=>{const el=document.createElement("button");el.type="button";el.className="char-card";el.innerHTML=`<div class="char-art">${ch.emoji}</div><div><h3>${ch.name}</h3><p>${ch.role}<br>${ch.desc}</p></div>`;el.addEventListener("click",()=>{selected=ch;document.querySelectorAll(".char-card").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");document.getElementById("confirmCharacter").disabled=false});box.appendChild(el)});Screens.show("select")});
document.getElementById("confirmCharacter").addEventListener("click",()=>{if(!selected)return;Screens.show("game");game=new Game();game.start(selected)});
document.getElementById("dialogueNext").addEventListener("click",()=>{
 const b=document.getElementById("dialogueNext");
 if(b.textContent.includes("TENTAR")){game.dialogue.active=false;document.getElementById("dialogue").classList.add("hidden");return;}
 game.dialogue.close();
});
document.getElementById("pauseBtn").addEventListener("click",()=>game.togglePause(true));
document.getElementById("resumeBtn").addEventListener("click",()=>game.togglePause(false));
document.getElementById("restartBtn").addEventListener("click",()=>{game=new Game();game.start(selected);document.getElementById("pause").classList.add("hidden")});
document.getElementById("backLobby").addEventListener("click",()=>Screens.show("lobby"));
boot();