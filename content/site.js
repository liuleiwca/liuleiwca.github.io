const articles = [
  {id:1,category:'新手入门',title:'新手第一天：先熟悉地图，再规划成长路线',summary:'从角色操作、补给准备到地图探索，把第一次出发需要了解的事情整理清楚。',glyph:'初',tone:'',time:'约 3 分钟',body:[['先了解版本','不同版本的地图、成长节奏与规则可能不同。开始前先阅读当前游戏的基础说明，不把其他版本的经验直接照搬。'],['做好出发准备','先熟悉移动、背包、技能栏和回城方式，再确认补给位置。探索新地图时，先留意返回路线和自身状态。'],['给自己一个小目标','可以先完成一次地图探索，或者熟练使用一个技能。把大目标拆成容易完成的小步骤，更容易找到适合自己的节奏。']]},
  {id:2,category:'职业攻略',title:'战士、法师、道士：如何找到适合自己的职业',summary:'从操作习惯和队伍定位出发，理解三种职业的不同体验，而不只看一张强度排行。',glyph:'职',tone:'red',time:'约 4 分钟',body:[['先看操作偏好','选择职业时，可以先想自己更喜欢近距离操作、远程输出，还是配合与辅助。实际职业能力请以对应版本为准。'],['尝试基础技能','用一段简短的体验了解操作频率、技能衔接与补给消耗，再判断是否适合长期使用。'],['考虑一起玩的伙伴','如果和朋友组队，可以一起讨论分工。职业选择除了个人喜好，也与队伍的游玩方式有关。']]},
  {id:3,category:'地图探索',title:'探索陌生地图之前，先记住这几件事',summary:'记录入口、补给和撤离路线，让每一次地图探索都有准备、有收获。',glyph:'图',tone:'gray',time:'约 3 分钟',body:[['先确认入口与出口','进入新地图后先观察可见路线，记住返回入口。若有传送条件，应先了解清楚。'],['观察环境','根据实际遭遇调整行动，不急着深入。留意补给、背包空间，以及可安全停留的位置。'],['留下自己的记录','把路线与注意事项记下来，下次探索时逐步补充。自己的观察往往比不匹配版本的路线图更有参考价值。']]},
  {id:4,category:'装备养成',title:'装备搭配入门：先看需求，再看属性',summary:'把职业需求、当前玩法和资源投入放在一起考虑，建立自己的装备选择顺序。',glyph:'装',tone:'',time:'约 4 分钟',body:[['先明确当前需求','先判断当前遇到的是操作、补给还是装备问题。明确需求之后，再比较装备能否解决实际问题。'],['比较整体搭配','单件属性之外，也要看技能、其他装备和游玩方式。具体属性作用以对应版本说明为准。'],['控制投入节奏','先体验现有装备的表现，再决定下一步调整。保留选择空间，比频繁更换方向更容易规划。']]},
  {id:5,category:'职业攻略',title:'组队之前，先把配合方式说清楚',summary:'出发前沟通目标、节奏和分工，比到了地图里再临时调整更从容。',glyph:'队',tone:'gray',time:'约 2 分钟',body:[['先对齐目标','队伍是探索地图、练习配合，还是完成某项挑战？先说清目标，才容易控制节奏。'],['约定沟通方式','提前约定集合点、撤离信号和补给时机。及时说明自己的状态，让伙伴有调整的余地。'],['结束后简单复盘','回顾一次配合顺畅的地方和一次可以改进的地方，下次只调整最重要的一点。']]},
  {id:6,category:'新手入门',title:'一份适合收藏的玩家成长记录表',summary:'记录当前目标、地图发现与装备想法，逐步建立属于自己的游戏资料库。',glyph:'记',tone:'red',time:'约 2 分钟',body:[['记下当前目标','每次只记一个最想完成的目标，并附上下一次可以开始的小步骤。'],['区分事实和想法','实际验证过的路线、属性说明与尚未验证的经验分开记录，避免把猜测当成规则。'],['及时整理','定期删除已经不适用的记录，保留当前版本仍然有效的资料。']]}
];
let category='全部',query='';
const container=document.querySelector('#articles');
function render(){
  const rows=articles.filter(a=>(category==='全部'||a.category===category)&&`${a.title}${a.summary}${a.category}`.includes(query));
  document.querySelector('#count').textContent=`${rows.length} 篇示例文章`;
  container.replaceChildren();
  if(!rows.length){const p=document.createElement('p');p.className='empty';p.textContent='没有找到匹配的文章。试试“职业”“地图”或清空搜索。';container.append(p);}
  for(const a of rows){const button=document.createElement('button');button.className='article';button.innerHTML=`<span class="thumb ${a.tone}" aria-hidden="true"><span>${a.glyph}</span></span><span><span class="article-category">${a.category}</span><h3>${a.title}</h3><p>${a.summary}</p><span class="article-meta">玩家手册 · ${a.time}</span></span>`;button.addEventListener('click',()=>openArticle(a.id));container.append(button);}
  document.querySelectorAll('[data-category]').forEach(b=>{const active=b.dataset.category===category;b.classList.toggle(b.closest('.nav')?'active':'selected',active);b.setAttribute('aria-pressed',String(active));});
}
function selectCategory(value,scroll=true){category=value;query='';document.querySelector('#search').value='';render();if(scroll)document.querySelector('#guides').scrollIntoView({block:'start',behavior:'smooth'});}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>selectCategory(b.dataset.category)));
document.querySelector('#search-form').addEventListener('submit',event=>{event.preventDefault();category='全部';query=document.querySelector('#search').value.trim();render();document.querySelector('#guides').scrollIntoView({block:'start'});});
document.querySelector('#search').addEventListener('input',event=>{if(!event.target.value){query='';render();}});
document.querySelectorAll('[data-search]').forEach(b=>b.addEventListener('click',()=>{category='全部';query=b.dataset.search;document.querySelector('#search').value=query;render();document.querySelector('#guides').scrollIntoView({block:'start'});}));
const dialog=document.querySelector('#article-dialog');
function showDialog(title,label,sections){document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-category').textContent=label;const body=document.querySelector('#dialog-body');body.replaceChildren();for(const [heading,text] of sections){const h=document.createElement('h3'),p=document.createElement('p');h.textContent=heading;p.textContent=text;body.append(h,p);}dialog.showModal();dialog.scrollTop=0;}
function openArticle(id){const a=articles.find(a=>a.id===id);showDialog(a.title,a.category,a.body);}
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#start-button').addEventListener('click',()=>selectCategory('新手入门'));
document.querySelector('#checklist-button').addEventListener('click',()=>openArticle(1));
document.querySelector('#about-button').addEventListener('click',()=>showDialog('关于传奇资料站','关于本站',[['一份玩家资料手册','这是一个示例资料网站，提供分类、搜索与文章阅读，用于预览网站效果。所有文章均为示例，并非特定游戏版本的官方指南。'],['后续可以怎样完善','可以把示例文章换成自己的内容，继续增加地图资料、职业指南和玩家经验。当前没有用户登录、投稿或数据保存功能。']]));
document.querySelector('#back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
function sendHeight(){if(parent!==window)parent.postMessage({type:'site-height',height:document.documentElement.scrollHeight},window.location.origin);}
new ResizeObserver(sendHeight).observe(document.body);
window.addEventListener('load',sendHeight);
render();
