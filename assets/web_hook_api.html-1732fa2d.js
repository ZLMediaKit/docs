const e=JSON.parse('{"key":"v-391db3ba","path":"/zh/guide/media_server/web_hook_api.html","title":"Web Hook 接口","lang":"zh-CN","frontmatter":{"title":"Web Hook 接口","description":"HOOK预览 MediaServer可以把内部的一些事件通过http post 第三方http服务器的方式通知出去，以下是相关的默认配置： 如果是鉴权事件，且访问IP是127.0.0.1或者鉴权url参数与admin_params一致，那么会直接鉴权成功(不会触发鉴权web hook)。 大家也可以参考此issue (https://github.co...","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://docs.ZLMediaKit.com/guide/media_server/web_hook_api.html"}],["meta",{"property":"og:url","content":"https://docs.ZLMediaKit.com/zh/guide/media_server/web_hook_api.html"}],["meta",{"property":"og:site_name","content":"ZLMediaKit"}],["meta",{"property":"og:title","content":"Web Hook 接口"}],["meta",{"property":"og:description","content":"HOOK预览 MediaServer可以把内部的一些事件通过http post 第三方http服务器的方式通知出去，以下是相关的默认配置： 如果是鉴权事件，且访问IP是127.0.0.1或者鉴权url参数与admin_params一致，那么会直接鉴权成功(不会触发鉴权web hook)。 大家也可以参考此issue (https://github.co..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-11-19T14:25:10.000Z"}],["meta",{"property":"article:author","content":"ZLMediaKit"}],["meta",{"property":"article:modified_time","content":"2023-11-19T14:25:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Web Hook 接口\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T14:25:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ZLMediaKit\\",\\"url\\":\\"https://docs.ZLMediaKit.com\\"}]}"]]},"headers":[{"level":2,"title":"HOOK预览","slug":"hook预览","link":"#hook预览","children":[]},{"level":2,"title":"详解","slug":"详解","link":"#详解","children":[{"level":3,"title":"1、enable :","slug":"_1、enable","link":"#_1、enable","children":[]},{"level":3,"title":"2、timeoutSec：","slug":"_2、timeoutsec","link":"#_2、timeoutsec","children":[]},{"level":3,"title":"3、admin_params：","slug":"_3、admin-params","link":"#_3、admin-params","children":[]},{"level":3,"title":"4、on_flow_report：","slug":"_4、on-flow-report","link":"#_4、on-flow-report","children":[]},{"level":3,"title":"5、on_http_access：","slug":"_5、on-http-access","link":"#_5、on-http-access","children":[]},{"level":3,"title":"6、on_play：","slug":"_6、on-play","link":"#_6、on-play","children":[]},{"level":3,"title":"7、on_publish：","slug":"_7、on-publish","link":"#_7、on-publish","children":[]},{"level":3,"title":"8、on_record_mp4:","slug":"_8、on-record-mp4","link":"#_8、on-record-mp4","children":[]},{"level":3,"title":"9、on_rtsp_realm：","slug":"_9、on-rtsp-realm","link":"#_9、on-rtsp-realm","children":[]},{"level":3,"title":"10、on_rtsp_auth：","slug":"_10、on-rtsp-auth","link":"#_10、on-rtsp-auth","children":[]},{"level":3,"title":"11、on_shell_login：","slug":"_11、on-shell-login","link":"#_11、on-shell-login","children":[]},{"level":3,"title":"12、on_stream_changed:","slug":"_12、on-stream-changed","link":"#_12、on-stream-changed","children":[]},{"level":3,"title":"13、on_stream_none_reader：","slug":"_13、on-stream-none-reader","link":"#_13、on-stream-none-reader","children":[]},{"level":3,"title":"14、on_stream_not_found：","slug":"_14、on-stream-not-found","link":"#_14、on-stream-not-found","children":[]},{"level":3,"title":"15、on_server_started","slug":"_15、on-server-started","link":"#_15、on-server-started","children":[]},{"level":3,"title":"16、on_server_keepalive","slug":"_16、on-server-keepalive","link":"#_16、on-server-keepalive","children":[]},{"level":3,"title":"17、on_rtp_server_timeout","slug":"_17、on-rtp-server-timeout","link":"#_17、on-rtp-server-timeout","children":[]}]}],"git":{"createdTime":1700403910000,"updatedTime":1700403910000,"contributors":[{"name":"Alex","email":"liyu7352@gmail.com","commits":1}]},"readingTime":{"minutes":15.71,"words":4714},"filePathRelative":"zh/guide/media_server/web_hook_api.md","localizedDate":"2023年11月19日","autoDesc":true}');export{e as data};
