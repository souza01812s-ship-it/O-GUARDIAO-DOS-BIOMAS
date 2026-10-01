class DialogueSystem{
constructor(){
 this.active=false;this.question=null;this.answered=false;this.onFinish=null;this.onWrong=null;
}
open(q,onFinish,onWrong){
 this.active=true;this.question=q;this.onFinish=onFinish;this.onWrong=onWrong;this.answered=false;
 document.getElementById("dialogue").classList.remove("hidden");
 document.getElementById("dialogueTag").textContent="ENCONTRO · "+q.name;
 document.getElementById("dialoguePortrait").textContent=q.animal;
 document.getElementById("dialogueName").textContent=q.name;
 document.getElementById("dialogueText").textContent=q.text;
 const box=document.getElementById("answers"); box.innerHTML="";
 q.answers.forEach((a,i)=>{
   const b=document.createElement("button"); b.type="button";
   b.textContent=String.fromCharCode(65+i)+"  "+a;
   b.addEventListener("click",()=>this.answer(i,b)); box.appendChild(b);
 });
 document.getElementById("dialogueNext").style.display="none";
}
answer(i,btn){
 if(this.answered)return;
 const q=this.question;
 if(i!==q.correct){
   btn.classList.add("wrong");
   document.querySelectorAll("#answers button").forEach((b,j)=>{if(j===q.correct)b.classList.add("correct")});
   document.getElementById("dialogueText").textContent="✕ Resposta incorreta. "+q.explain;
   this.answered=true;
   document.getElementById("dialogueNext").textContent="TENTAR NOVAMENTE";
   document.getElementById("dialogueNext").style.display="block";
   if(this.onWrong)this.onWrong();
   return;
 }
 this.answered=true;
 document.querySelectorAll("#answers button").forEach((b,j)=>{if(j===q.correct)b.classList.add("correct")});
 document.getElementById("dialogueText").textContent="✓ "+q.explain;
 document.getElementById("dialogueNext").textContent="CONTINUAR →";
 document.getElementById("dialogueNext").style.display="block";
}
close(){
 if(!this.active)return;
 const wasCorrect=this.answered && document.getElementById("dialogueNext").textContent.includes("CONTINUAR");
 this.active=false;
 document.getElementById("dialogue").classList.add("hidden");
 if(wasCorrect && this.onFinish)this.onFinish();
 else if(this.onWrong)this.onWrong(true);
}
}
window.DialogueSystem=DialogueSystem;