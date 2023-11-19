import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o,c as t,e as c}from"./app-4151e1aa.js";const l={},i=c("<ul><li><p>1、所谓直播就是正在发生的事情，流逝多少时间产生多少数据。</p></li><li><p>2、那么直播为什么会有延时？本质是，直播为了提升体验，会给缓存一部分历史数据(比如说为了提高画面打开速度做GOP缓存)。</p></li><li><p>3、那是不是没有GOP缓存就不会有延时呢？答案是错误的，因为不仅仅你的服务器有缓存，播放器也有缓存。播放器在点击<code>开始播放</code>到<code>出现画面</code>会有<strong>时间差</strong>，那么为什么播放器要这么做？原因是播放器为了提高播放流畅度，做了缓存。直播数据传到播放器我们可以认为是一根水管，这跟水管水量时大时小，有时干脆断流，如果不用<code>桶</code>缓存一下，那么画面会卡顿。</p></li><li><p>4、假定我们削掉服务器和播放器所有的缓存，那么是不是就没有延时呢？Too yong too simple!记住，<strong>缓存是永远无法消灭的</strong>。假定网络是根水管，我们掐住它5秒，然后再放开手，那么这5秒的数据会消失吗？并不会！直播是正在发生的事情，它会源源不断产生<code>水量</code>，会把水管涨粗，在这5秒内，播放器就得干等数据，等网络恢复了，那么这5秒的数据会一股脑怼给播放器，然后又是接着的源源不断过来的直播数据，这样播放器就多了5秒的数据，而这多出来5秒的数据要么直接丢弃要么加快播放速度，否则永远都不会凭空消灭掉。</p></li><li><p>5、很遗憾的告诉你，几乎所有标准播放器，都不会直接丢数据或加快播放速度。</p></li><li><p>6、那细心的小伙伴会问我，为什么UDP直播延时更低？原因是UDP这根<code>管子</code>上有很多破洞，水量太大了直接漏了，表现形式就是数据直接丢了，那么播放器就得花屏了。</p></li><li><p>7、TCP水管涨粗可以理解为网络链路缓存的增加(路由器缓存增加)，如果滞留的水量太大了怎么办？那么先是撑满网络链路缓存，然后撑满发送端Socket缓存，然后撑满发送端应用逻辑缓存，如果还放不下，那么对不起，服务器只能掐断TCP了。</p></li></ul>",1),_=[i];function r(d,s){return o(),t("div",null,_)}const a=e(l,[["render",r],["__file","the_nature_of_live_broadcast_delay.html.vue"]]);export{a as default};
