(this["webpackJsonpxstate-react-typescript-template"]=this["webpackJsonpxstate-react-typescript-template"]||[]).push([[0],{22:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return parse}));var _srgs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9);function LOG(t){}function clone(t){if(null==t||"object"!=typeof t)return t;var e=new t.constructor;for(var n in t)e[n]=clone(t[n]);return e}function isEmpty(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}function Chart(t){this.numberOfWords=t,this.passives=new Array(t),this.actives=new Array(t);for(var e=0;e<=t;e++)this.passives[e]={},this.actives[e]={};this.add=function(t){var e,n;return t.isPassive?(e=this.passives[t.start],n=t.lhs):(e=this.actives[t.end],n=t.next.content),n in e||(e[n]={}),!(t in e[n])&&(e[n][t]=t,!0)},this.resultsForRule=function(e,n,o){n=n||0,o=o||t;var r=[],a=this.passives[n][e];for(var i in a)a[i].end==o&&r.push(a[i].out);return r},this.allEdges=function(){return this.allPassiveEdges().concat(this.allActiveEdges())},this.allPassiveEdges=function(){var t=[];for(var e in this.passives)for(var n in this.passives[e])for(var o in this.passives[e][n])t.push(this.passives[e][n][o]);return t},this.allActiveEdges=function(){var t=[];for(var e in this.actives)for(var n in this.actives[e])for(var o in this.actives[e][n])t.push(this.actives[e][n][o]);return t},this.statistics=function(){var t=this.allPassiveEdges().length,e=this.allActiveEdges().length;return{nrEdges:t+e,nrPassiveEdges:t,nrActiveEdges:e}}}function PassiveEdge(t,e,n,o){this.start=t,this.end=e,this.lhs=n,this.out=o,this.isPassive=!0;var r="["+t+"-"+e+"] $"+n+" := "+o;this._string=r,this.toString=function(){return this._string}}function ActiveEdge(t,e,n,o,r,a,i,s){this.start=t,this.end=e,this.lhs=n,this.next=o,this.rest=r,this.out=a,this.rules=i,this.text=s,this.isPassive=!1;var c="<"+t+"-"+e+"> $"+n+" -> "+o+", "+r+" := "+a+" <- "+i;this._string=c,this.toString=function(){return this._string}}function parse(words,grammar,root,filter){root||(root=grammar.$root);var chart=new Chart(words.length),agenda=[],leftCornerFilter;function addToChart(inference,start,end,lhs,rhs,out,rules,text){var edge;if(rhs.length>0){var next=rhs[0],rest=rhs.slice(1);switch(next.constructor){case Array:return void addToChart(inference+",SEQUENCE",start,end,lhs,next.concat(rest),out,rules,text);case _srgs__WEBPACK_IMPORTED_MODULE_0__.g:var min=next.min,max=next.max;if(min<=0&&addToChart(inference+",SKIP",start,end,lhs,rest,out,rules,text),max>0){var content=next.content,rhs=1==max?[content]:[content,_srgs__WEBPACK_IMPORTED_MODULE_0__.f(min?min-1:min,max-1,content)];addToChart(inference+",REPEAT",start,end,lhs,rhs.concat(rest),out,rules,text)}return;case _srgs__WEBPACK_IMPORTED_MODULE_0__.c:var oneof=next.content;for(var i in oneof){var rhs=oneof[i].concat(rest);addToChart(inference+",ONEOF",start,end,lhs,rhs,out,rules,text)}return;case _srgs__WEBPACK_IMPORTED_MODULE_0__.i:return out=clone(out),rules=clone(rules),eval(next.content),void addToChart(inference+",TAG",start,end,lhs,rest,out,rules,text)}edge=new ActiveEdge(start,end,lhs,next,rest,out,rules,text)}else edge=new PassiveEdge(start,end,lhs,out);chart.add(edge)&&(LOG("+ "+inference+": "+edge),agenda.push(edge))}for(leftCornerFilter=void 0==filter?function(){return!0}:function(t,e){var n=filter[t];return!n||words[e]in n},addToChart("INIT",0,0,root,grammar[root],{},{},{});agenda.length>0;){var edge=agenda.pop(),start=edge.start,end=edge.end,lhs=edge.lhs,next=edge.next;if(LOG(edge),edge.isPassive){var actives=chart.actives[start][lhs];for(var i in actives){var active=actives[i],rules=clone(active.rules),text=active.text;text[edge.lhs]=words.slice(start,end).join(" "),"object"==typeof edge.out&&isEmpty(edge.out)?rules[edge.lhs]=text[edge.lhs]:rules[edge.lhs]=clone(edge.out),addToChart("COMBINE",active.start,end,active.lhs,active.rest,active.out,rules,text)}}else if(next.constructor==_srgs__WEBPACK_IMPORTED_MODULE_0__.e){var ref=next.content,passives=chart.passives[end][ref];for(var i in passives){var passive=passives[i],rules=clone(edge.rules),text=edge.text;rules[passive.lhs]=clone(passive.out),text[passive.lhs]=passive.text,addToChart("COMBINE",start,passive.end,lhs,edge.rest,edge.out,rules,text)}ref in grammar&&leftCornerFilter(ref,end)&&addToChart("PREDICT",end,end,ref,grammar[ref],{},{},{})}else next==words[end]&&addToChart("SCAN",start,end+1,lhs,edge.rest,edge.out,edge.rules,edge.text)}return chart}},26:function(t,e,n){},37:function(t,e,n){"use strict";n.r(e),n.d(e,"say",(function(){return _})),n.d(e,"listen",(function(){return k})),n.d(e,"promptAndAsk",(function(){return x})),n.d(e,"misUnderstood",(function(){return w})),n.d(e,"misUnderstood2",(function(){return j})),n.d(e,"Endings",(function(){return C})),n.d(e,"nluRequest",(function(){return T}));var o=n(25),r=n(6),a=(n(26),n(8),n(21)),i=n(4),s=n(43),c=n(42),l=n(19),u=n(41);const d={hairdresser:{person:"hairdresser"},doctor:{person:"doctor"},dentist:{person:"dentist"},lawyer:{person:"lawyer"},psychotherapist:{person:"psychotherapist"},John:{person:"John Appleseed"},Peter:{person:"Peter Horter"},Jack:{person:"Jack Tomerson"},Tom:{person:"Tom Peterson"},Jill:{person:"Jill Panele"},Jane:{person:"Jane Mayer"},Anna:{person:"Anna Pana"},Lora:{person:"Lora Cat"},"on Monday":{day:"Monday"},"on Tuesday":{day:"Tuesday"},"on Wednesday":{day:"Wednesday"},"on Thursday":{day:"Thursday"},"on Friday":{day:"Friday"},"on Saturday":{day:"Saturday"},"on Sunday":{day:"Sunday"},"on Monday next week":{day:"Monday next week"},"on Tuesday next week":{day:"Tuesday next week"},"on Wednesday next week":{day:"Wednesday next week"},"on Thursday next week":{day:"Thursday next week"},"on Friday next week":{day:"Friday next week"},"on Saturday next week":{day:"Saturday next week"},"on Sunday next week":{day:"Sunday next week"},8:{time:"eight"},9:{time:"nine"},10:{time:"ten"},11:{time:"eleven"},"at noon":{time:"twelve"},12:{time:"twelve"},1:{time:"thirteen"},2:{time:"fourteen"},3:{time:"fifteen"},4:{time:"sixteen"},5:{time:"seventeen"},6:{time:"six"},7:{time:"seven"},"8 15":{time:"eight fifteen"},"9 15":{time:"nine fifteen"},"10 15":{time:"ten fifteen"},"11 15":{time:"eleven fifteen"},"12 15":{time:"twelve fifteen"},"1 15":{time:"one fifteen"},"2 15":{time:"two fifteen"},"3 15":{time:"three fifteen"},"4 15":{time:"four fifteen"},"5 15":{time:"five fifteen"},"6 15":{time:"six fifteen"},"7 15":{time:"seven fifteen"},"8 30":{time:"half past eight"},"9 30":{time:"half past nine"},"10 30":{time:"half past ten"},"11 30":{time:"half past eleven"},"half past twelve":{time:"half past twelve"},"12 30 ":{time:"half past twlve"},"1 30":{time:"half past one"},"2 30":{time:"half past two"},"3 30":{time:"half past three"},"4 30":{time:"half past four"},"5 30":{time:"half past five"},"6 30":{time:"half past six"},"7 30":{time:"half past seven"},"of course":{approval:!0},yes:{approval:!0},yeah:{approval:!0},yup:{approval:!0},sure:{approval:!0},no:{approval:!1},nah:{approval:!1},nope:{approval:!1}},p={initial:"idle",states:{idle:{},who:Object(r.a)({initial:"prompt",on:{RECOGNISED:[{cond:t=>"person"in(d[t.recResult]||{}),actions:Object(i.b)((t=>({person:d[t.recResult].person}))),target:"day"},{cond:t=>"help"===t.recResult},{target:".nomatch"}]}},w("Who are you meeting with?",["#root.dm1.idle","#root.init.help"])),day:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"day"in(d[t.recResult]||{}),actions:Object(i.b)((t=>({day:d[t.recResult].day}))),target:"approval"},{cond:t=>"help"===t.recResult,target:".help"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"OK. ".concat(t.person," it is. On which day is your meeting?")}))),on:{ENDSPEECH:"ask"}},ask:{entry:k()},nomatch:{entry:_("Sorry, I do not understand"),on:{ENDSPEECH:"prompt"}},help:{entry:_("We may be miscommunicating. Let's take a step back"),on:{ENDSPEECH:"#root.dm1.who"}}}},approval:{initial:"prompt",on:{RECOGNISED:[{cond:t=>void 0!==d[t.recResult]&&!0===d[t.recResult].approval,actions:Object(i.b)((t=>({approval:!0}))),target:"summary_whole"},{cond:t=>void 0!==d[t.recResult]&&!1===d[t.recResult].approval,actions:Object(i.b)((t=>({approval:!1}))),target:"time"},{cond:t=>"help"===t.recResult,target:".help"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Ok, meeting on ".concat(t.day,". Will it take the whole day?")}))),on:{ENDSPEECH:"ask"}},ask:{entry:k()},nomatch:{entry:_("Sorry, I do not understand"),on:{ENDSPEECH:"prompt"}},help:{entry:_("We may be miscommunicating. Let's take a step back"),on:{ENDSPEECH:"#root.dm1.day"}}}},time:Object(r.a)({initial:"prompt",on:{RECOGNISED:[{cond:t=>"time"in(d[t.recResult]||{}),actions:Object(i.b)((t=>({time:d[t.recResult].time}))),target:"summary_time"},{cond:t=>"help"===t.recResult,target:".help"},{target:".nomatch"}]}},w("What time is your meeting?","#root.dm1.approval")),summary_time:{initial:"prompt",on:{RECOGNISED:[{cond:t=>void 0!==d[t.recResult]&&!0===d[t.recResult].approval,actions:Object(i.b)((t=>({approval:!0}))),target:"created"},{cond:t=>void 0!==d[t.recResult]&&!1===d[t.recResult].approval,actions:Object(i.b)((t=>({approval:!1}))),target:"who"},{cond:t=>"help"===t.recResult,target:".help"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Do you want me to create an appointment with ".concat(t.person," on ").concat(t.day," at ").concat(t.time,"?")}))),on:{ENDSPEECH:"ask"}},ask:{entry:k()},nomatch:{entry:_("Sorry, I do not understand"),on:{ENDSPEECH:"prompt"}},help:{entry:_("We may be miscommunicating. Let's take a step back"),on:{ENDSPEECH:"#root.dm1.approval"}}}},summary_whole:{initial:"prompt",on:{RECOGNISED:[{cond:t=>void 0!==d[t.recResult]&&!0===d[t.recResult].approval,actions:Object(i.b)((t=>({approval:!0}))),target:"created"},{cond:t=>void 0!==d[t.recResult]&&!1===d[t.recResult].approval,actions:Object(i.b)((t=>({approval:!1}))),target:"who"},{cond:t=>"help"===t.recResult,target:".help"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Do you want me to create an appointment with ".concat(t.person," on ").concat(t.day," for the whole day?")}))),on:{ENDSPEECH:"ask"}},ask:{entry:k()},nomatch:{entry:_("Sorry, I do not understand"),on:{ENDSPEECH:"prompt"}},help:{entry:_("We may be miscommunicating. Let's take a step back"),on:{ENDSPEECH:"#root.dm1.approval"}}}},created:Object(r.a)({},C("Your appoinment has been created","#root.init.goodbye"))}};let h=0;const m={initial:"idle",states:{idle:{},timer:{initial:"prompt",on:{RECOGNISED:{target:"other",actions:Object(i.b)((t=>({option:t.recResult})))},WAIT:{target:"annoy",actions:Object(i.b)((()=>h++))}},states:{prompt:{entry:_("Say something."),on:{ENDSPEECH:"ask"}},ask:{entry:[Object(i.k)("LISTEN"),Object(i.k)("WAIT",{delay:2e3})]}}},annoy:{entry:_("No input. Try again"),on:{ENDSPEECH:[{cond:()=>0===h,target:"#root.dm2.timer"},{cond:()=>1===h,target:"#root.dm2.timer"},{cond:()=>2===h,target:"#root.dm2.timer"},{target:"#root.dm2.other"}]}},other:{entry:_("Understood. Try silent"),on:{ENDSPEECH:"#root.dm2.idle"}}}},g={initial:"idle",states:{idle:{},denial:Object(r.a)({},C("Welcome to To-do. It will be improved later.","#root.dm3.idle"))}};var f=n(9);function v(t){for(var e=function(t){if("undefined"!=typeof DOMParser)return(new DOMParser).parseFromString(t,"application/xml");if("undefined"!=typeof ActiveXObject){var e=XML.newDocument();return e.loadXML(t),e}var n="data:text/xml;charset=utf-8,"+encodeURIComponent(t),o=new XMLHttpRequest;return o.open("GET",n,!1),o.send(null),o.responseXML}(t),n=e.getElementsByTagName("grammar")[0].getAttribute("root"),o=new f.a(n),r=e.getElementsByTagName("rule"),a=0;a<r.length;a++){var i=r[a];o[i.getAttribute("id")]=y(i)}return o}function y(t){for(var e=t.childNodes,n=[],o=0;o<e.length;o++)if(3==e[o].nodeType){var r=e[o].textContent.trim();""!=r&&n.push(r.split(/ +/))}else if(1==e[o].nodeType)if("token"==e[o].nodeName)n.push(f.h(e[o].textContent));else if("ruleref"==e[o].nodeName){var a=e[o].getAttribute("uri");n.push(f.d(a.slice(1)))}else if("tag"==e[o].nodeName)n.push(f.h(e[o].textContent.trim()));else if("one-of"==e[o].nodeName)n.push(f.b(y(e[o])));else if("item"==e[o].nodeName){var i=e[o].getAttribute("repeat");if(i){var s=i.split("-"),c=parseInt(s[0]),l=parseInt(s[1]);l=l||1/0,n.push(f.f(c,l,y(e[o])))}else n.push(y(e[o]))}else console.log(e[o]);return n}var E=n(22);const b=t=>{const e=v('\n<grammar root="smarthome">\n    <rule id="smarthome">\n\n        <ruleref uri="#order"/>\n            <tag>out.order= new Object(); out.order.object=rules.order.entity; out.order.action=rules.order.event;</tag>\n        </rule>\n\n    <item repeat="0-">please</item>\n\n    <rule id="verb">\n        <one-of>\n            <item>open<tag>out=\'open\';</tag></item>\n            <item>close<tag>out=\'close\';</tag></item>\n        </one-of>\n        </rule>\n\n    <rule id="on_off">\n            <one-of>\n                <item></item>\n                <item>turn on</item>\n                <item>turn off</item>\n                <item>turn up</item>\n                <item>turn down</item>\n            </one-of>\n        </rule>\n\n    <rule id="appliance">\n        the\n        <one-of>\n            <item>light<tag>out=\'light\';</tag></item>\n            <item>AC<tag>out=\'air conditioning\';</tag></item>\n            <item>A C<tag>out=\'air conditioning\';</tag></item>\n            <item>air conditioning</item>\n            <item>heat<tag> out=\'heat\';</tag></item>\n        </one-of>\n        </rule>\n\n    <rule id="opening">\n        the\n        <one-of>\n            <item>door</item>\n            <item>window</item>\n        </one-of>\n        </rule>\n    \n <rule id="order">\n\n  <one-of>\n   \n      <item>\n      <ruleref uri="#on_off"/>\n      <ruleref uri="#appliance"/>\n        <tag> out.event=rules.on_off; out.entity=rules.appliance;</tag>\n      </item>\n\n      <item>\n      <ruleref uri="#verb"/>\n      <ruleref uri="#opening"/>\n        <tag> out.event=rules.verb; out.entity=rules.opening;</tag>\n      </item>\n\n  </one-of>\n</rule>\n</grammar>\n'),n=Object(E.a)(t.split(/\s+/),e).resultsForRule(e.$root)[0];return n.order.action+n.order.object},O={initial:"idle",states:{idle:{},welcome:{initial:"prompt",on:{ENDSPEECH:"task"},states:{prompt:{entry:_("Welcome to Smart Home")}}},task:Object(r.a)({initial:"prompt",on:{RECOGNISED:[{cond:t=>void 0!=={order:b(t.recResult)},actions:Object(i.b)((t=>({order:b(t.recResult)}))),target:"perform"},{target:"perform.nomatch"}]}},x("I await for your orders.")),perform:{initial:"prompt",states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"The task ".concat(t.order," has been accomplished")})))},nomatch:{entry:_("Sorry, I do not understand"),on:{ENDSPEECH:"prompt"}}}}}};var S=n(14);function _(t){return Object(i.k)((e=>({type:"SPEAK",value:t})))}function k(){return Object(i.k)("LISTEN")}function x(t){return{initial:"prompt",states:{prompt:{entry:_(t),on:{ENDSPEECH:"ask"}},ask:{entry:Object(i.k)("LISTEN")}}}}function w(t,e){return{initial:"prompt",states:{prompt:{entry:_(t),on:{ENDSPEECH:"ask"}},ask:{entry:k()},nomatch:{entry:_("Sorry, I do not understand."),on:{ENDSPEECH:"prompt"}},help:{entry:_("We may be miscommunicating. Let's take a step back"),on:{ENDSPEECH:e}}}}}function j(t,e,n){return{initial:"prompt",states:{prompt:{entry:Object(i.k)((e=>({type:"SPEAK",value:t}))),on:{ENDSPEECH:"ask"}},ask:{entry:k()},nomatch:{entry:_("Sorry, I do not understand."),on:{ENDSPEECH:"prompt"}},help:{entry:_("We may be miscommunicating. Let's take a step back"),on:{ENDSPEECH:e}}}}}function C(t,e){return{initial:"prompt",states:{idle:{},prompt:{entry:_(t),on:{ENDSPEECH:e}}}}}Object(u.a)({url:"https://statecharts.io/inspect",iframe:!1});Object(i.k)((t=>({type:"SPEAK",value:"".concat(t.snippet)})));const R={"of course":{approval:!0},yes:{approval:!0},yeah:{approval:!0},yup:{approval:!0},sure:{approval:!0},no:{approval:!1},nah:{approval:!1},nope:{approval:!1}},P=Object(s.a)({id:"root",type:"parallel",states:{init:{initial:"idle",states:{idle:{on:{CLICK:"welcome"}},welcome:Object(r.a)({on:{RECOGNISED:{target:"query",actions:Object(i.b)((t=>({option:t.recResult})))}}},x("What do you want to do?")),query:{invoke:{id:"rasa",src:(t,e)=>T(t.option),onDone:{actions:[Object(i.b)(((t,e)=>({option:e.data.intent.name}))),(t,e)=>console.log(e.data)],target:"distributor"},onError:{target:"welcome",actions:(t,e)=>console.log(e.data)}}},distributor:{initial:"prompt",on:{ENDSPEECH:[{cond:t=>"todo_on"===t.option||"todo_off"===t.option,target:["#root.dm3.denial","idle"]},{cond:t=>"timer_on"===t.option||"timer_off"===t.option,target:["#root.dm2.timer","idle"]},{cond:t=>"appointment_on"===t.option,target:["#root.dm1.who","idle"]},{cond:t=>"smart_on"===t.option,target:["#root.dm4.welcome","idle"]},{cond:t=>"help_on"===t.option,target:"help"},{cond:t=>"appointment_off"===t.option,target:"other"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Understood."})))}}},help:Object(r.a)({on:{RECOGNISED:[{cond:t=>void 0!==R[t.recResult]&&!0===R[t.recResult].approval,actions:Object(i.b)((t=>({approval:!0}))),target:"welcome"},{cond:t=>void 0!==R[t.recResult]&&!1===R[t.recResult].approval,actions:Object(i.b)((t=>({approval:!1}))),target:"goodbye"}]}},x("Would you like to start over?")),other:Object(r.a)({},C("This function has not been developed","#root.init.help")),goodbye:Object(r.a)({},C("Thank you for using Bot Chatbotterson. Goodbye.","#root.init"))}},dm1:Object(r.a)({},p),dm2:Object(r.a)({},m),dm3:Object(r.a)({},g),dm4:Object(r.a)({},O),asrtts:{initial:"idle",states:{idle:{on:{LISTEN:"recognising",SPEAK:{target:"speaking",actions:Object(i.b)(((t,e)=>({ttsAgenda:e.value})))}}},recognising:{initial:"progress",entry:"recStart",exit:"recStop",on:{ASRRESULT:{actions:["recLogResult",Object(i.b)(((t,e)=>({recResult:e.value})))],target:".match"},RECOGNISED:"idle"},states:{progress:{},match:{entry:Object(i.k)("RECOGNISED")}}},speaking:{entry:"ttsStart",on:{ENDSPEECH:"idle"}}}}}},{actions:{recLogResult:t=>{console.log("<< ASR: "+t.recResult)},test:()=>{console.log("test")},logIntent:t=>{console.log("<< NLU intent: "+t.nluData.intent.name)}}}),N=t=>{switch(!0){case t.state.matches({asrtts:"recognising"}):return Object(S.jsx)("button",Object(r.a)(Object(r.a)({type:"button",className:"glow-on-hover",style:{animation:"glowing 20s linear"}},t),{},{children:"Listening..."}));case t.state.matches({asrtts:"speaking"}):return Object(S.jsx)("button",Object(r.a)(Object(r.a)({type:"button",className:"glow-on-hover",style:{animation:"bordering 1s infinite"}},t),{},{children:"Speaking..."}));default:return Object(S.jsx)("button",Object(r.a)(Object(r.a)({type:"button",className:"glow-on-hover"},t),{},{children:"Click to start"}))}};function D(){const t=Object(l.useSpeechSynthesis)({onEnd:()=>{p("ENDSPEECH")}}),e=t.speak,n=t.cancel,r=(t.speaking,Object(l.useSpeechRecognition)({onResult:t=>{p({type:"ASRRESULT",value:t})}})),a=r.listen,i=(r.listening,r.stop),s=Object(c.b)(P,{devTools:!0,actions:{recStart:Object(c.a)((()=>{console.log("Ready to receive a command."),a({interimResults:!1,continuous:!0})})),recStop:Object(c.a)((()=>{console.log("Recognition stopped."),i()})),ttsStart:Object(c.a)(((t,n)=>{console.log("Speaking..."),e({text:t.ttsAgenda})})),ttsCancel:Object(c.a)(((t,e)=>{console.log("TTS STOP..."),n()}))}}),u=Object(o.a)(s,3),d=u[0],p=u[1];u[2];return Object(S.jsx)("div",{className:"App",children:Object(S.jsx)(N,{state:d,onClick:()=>p("CLICK")})})}const T=t=>fetch(new Request("https://cors-anywhere.herokuapp.com/https://ap-ti-do.herokuapp.com/model/parse",{method:"POST",headers:{Origin:"http://localhost:3000/"},body:'{"text": "'.concat(t,'"}')})).then((t=>t.json())),A=document.getElementById("root");a.render(Object(S.jsx)(D,{}),A)},9:function(t,e,n){"use strict";function o(t){this.$root=t,this.VOID=[i([])],this.NULL=[],this.GARBAGE=[],this.$check=function(){for(var t in this)if("$root"!==t&&"$check"!==t)try{h(this[t])}catch(e){p("When checking grammar rule '"+t+"'",e)}}}function r(t){return new c(t)}function a(t){return new l(t)}function i(t){return new u(t)}function s(t,e,n){return new d(t,e,n)}function c(t){this.content=t,this._string="$"+t,this.toString=function(){return this._string}}function l(t){this.content=t,this._string="{"+t+"}",this.toString=function(){return this._string}}function u(t){this.content=t,this._string="("+t.join("|")+")",this.toString=function(){return this._string}}function d(t,e,n){this.min=t,this.max=e,this.content=n,this._string=this.content+"<"+this.min+"-"+(this.max==1/0?"":this.max)+">",this.toString=function(){return this._string}}function p(t,e){throw void 0==e?TypeError(t):TypeError(t+"; "+e.message)}function h(t){try{for(var e in t.constructor!==Array&&p("Expected Array, found "+t.constructor.name),t)t[e].constructor==Array?h(t[e]):t[e].constructor!=String&&t[e].checkExpansion()}catch(n){p("When checking sequence expansion",n)}}n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return r})),n.d(e,"h",(function(){return a})),n.d(e,"b",(function(){return i})),n.d(e,"f",(function(){return s})),n.d(e,"e",(function(){return c})),n.d(e,"i",(function(){return l})),n.d(e,"c",(function(){return u})),n.d(e,"g",(function(){return d})),c.prototype.checkExpansion=function(){this.content.constructor!==String&&p("When checking Ref content; Expected String, found "+this.content.constructor.name)},l.prototype.checkExpansion=function(){this.content.constructor!==String&&p("When checking Tag content; Expected String, found "+this.content.constructor.name)},u.prototype.checkExpansion=function(){try{for(var t in this.content.constructor!==Array&&p("Expected Array, found "+this.content.constructor.name),this.content)h(this.content[t])}catch(e){p("When checking OneOf content",e)}},d.prototype.checkExpansion=function(){try{this.min.constructor===Number&&this.max.constructor===Number||p("Expected min/max to be Number, found "+this.min.constructor.name+"/"+this.max.constructor.name),0<=this.min&&this.min<=this.max||p("Expected 0 <= min <= max, found "+this.min+"/"+this.max),h(this.content)}catch(t){p("When checking Repeat content",t)}}}},[[37,1,2]]]);
//# sourceMappingURL=main.9cfae3b9.chunk.js.map