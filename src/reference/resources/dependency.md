---
title: Dependency and Copyright
---

## I. ZLMediaKit's List of Dependent Libraries

| Dependent Components |  License Type  |                                                                          Remarks                                                                           |                                Project Address                                 |
| :------------------: | :------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
|      ZLToolKit       |      MIT       |                                       Strong dependency, ZLToolKit also partially depends on some open-source codes                                        |                    https://github.com/ZLMediaKit/ZLToolKit                     |
| ireader/media-server |      MIT       |                    Default dependency, can be removed when ENABLE_HLS, ENABLE_MP4, ENABLE_RTPPROXY are set to disabled at compile time                     |                    https://github.com/ireader/media-server                     |
|       jsoncpp        |      MIT       |                                                                   MediaServer dependency                                                                   |                 https://github.com/open-source-parsers/jsoncpp                 |
|       openssl        |   Apache-2.0   |      Dependency when enabling SSL and WebRTC related features, can be removed when ENABLE_OPENSSL, ENABLE_WEBRTC are set to disabled at compile time       |                       https://github.com/openssl/openssl                       |
|         srtp         | Similar to MIT |                   Dependency when enabling WebRTC related features, can be removed when ENABLE_WEBRTC is set to disabled at compile time                   |                        https://github.com/cisco/libsrtp                        |
|       usrsctp        |  BSD-3-Clause  |              Dependency when enabling WebRTC datachannel related features, can be removed when ENABLE_SCTP is set to disabled at compile time              |                       https://github.com/sctplab/usrsctp                       |
|      mediasoup       |      ISC       |                   Some WebRTC source code extracted from mediasoup, can be removed when ENABLE_WEBRTC is set to disabled at compile time                   |                     https://github.com/versatica/mediasoup                     |
|        ffmpeg        |    GPL/LGPL    | There's minor dependency with the transcoding branch and mk_api, can be removed when ENABLE_FFMPEG is set to disabled at compile time, default is disabled |                        https://github.com/FFmpeg/FFmpeg                        |
|        wepoll        | Similar to MIT |                                  Dependency when ENABLE_WPOLL is enabled during Windows compilation, default is disabled                                   |                     https://github.com/piscisaureus/wepoll                     |
|      SPSParser       |                |                   sps/pps related parsing code, originated from a friend, modified, initially extracted from ffmpeg, copyright doubtful                    | https://github.com/ZLMediaKit/ZLMediaKit/blob/master/src/Extension/SPSParser.h |

## II. Other Dependencies

- SDL dependency when enabling the compilation of the test_player test program.
- Dependencies on libx264 and libfacc when enabling x264/faac related features, default is disabled.
- jemalloc dependency when enabling jemalloc, default is disabled.
- Dependency on libmysql-clinet when enabling mysql connection pool feature, default is disabled.

## III. ZLToolkit Related Dependencies

- [getopt](https://github.com/ZLMediaKit/ZLToolKit/tree/master/src/win32) is a command-line parsing tool for Windows, not needed for other platforms.
- [uv_errno](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/uv_errno.h) some error handling code is derived from libuv.
- [strptime_win](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/strptime_win.cpp) is the strptime porting function code for Windows, sourced from the internet, origin unknown.
- [mini](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/mini.h)

is sourced from [github](https://github.com/r-lyeh-archived/mINI), after arrangement and modification.

- [function_traits](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/function_traits.h) is sourced from the internet, likely from Qi Yu.
- [base64](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/base64.h) is sourced from the internet, modified, likely originated from ffmpeg.
- [SHA1](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/SHA1.h) is arranged from [GitHub](https://github.com/vog/sha1)
- [MD5](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/MD5.h) is arranged from GitHub, the original source is no longer findable.
