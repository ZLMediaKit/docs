const e=JSON.parse('{"key":"v-6e3cc886","path":"/zh/guide/protocol/gb28181/how_to_use_device_id_as_stream_id.html","title":"GB28181怎么用设备ID作为流ID","lang":"zh-CN","frontmatter":{"title":"GB28181怎么用设备ID作为流ID","description":"为了支持RTP流的识别(与摄像头ID产生关联), 必须通过 源地址 或 ssrc 或 本地端口号 来区分. 但是在issue #338 里面有开发者反馈，有些设备不支持设置ssrc，ssrc一直为0. 而源地址端口也会一直变，RTP推流前SIP服务器也不知道摄像头推流端口(甚至IP都不知道) 那么区分流只通过源地址也不现实, 因为一个局域网内也可能多个...","head":[["meta",{"property":"og:url","content":"https://docs.ZLMediaKit.com/zh/guide/protocol/gb28181/how_to_use_device_id_as_stream_id.html"}],["meta",{"property":"og:site_name","content":"ZLMediaKit"}],["meta",{"property":"og:title","content":"GB28181怎么用设备ID作为流ID"}],["meta",{"property":"og:description","content":"为了支持RTP流的识别(与摄像头ID产生关联), 必须通过 源地址 或 ssrc 或 本地端口号 来区分. 但是在issue #338 里面有开发者反馈，有些设备不支持设置ssrc，ssrc一直为0. 而源地址端口也会一直变，RTP推流前SIP服务器也不知道摄像头推流端口(甚至IP都不知道) 那么区分流只通过源地址也不现实, 因为一个局域网内也可能多个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T14:25:10.000Z"}],["meta",{"property":"article:author","content":"ZLMediaKit"}],["meta",{"property":"article:modified_time","content":"2023-11-19T14:25:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GB28181怎么用设备ID作为流ID\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T14:25:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ZLMediaKit\\",\\"url\\":\\"https://docs.ZLMediaKit.com\\"}]}"]]},"headers":[],"git":{"createdTime":1700403910000,"updatedTime":1700403910000,"contributors":[{"name":"Alex","email":"liyu7352@gmail.com","commits":1}]},"readingTime":{"minutes":1.17,"words":352},"filePathRelative":"zh/guide/protocol/gb28181/how_to_use_device_id_as_stream_id.md","localizedDate":"2023年11月19日","autoDesc":true}');export{e as data};
