(function(win) {
    var rawHeaderLen = 16;
    var packetOffset = 0;
    var headerOffset = 4;
    var verOffset = 6;
    var opOffset = 8;
    var seqOffset = 12;

    var Client = function(options) {
        var MAX_CONNECT_TIMES = 10;
        var DELAY = 15000;
        this.options = options || {};
        this.createConnect(MAX_CONNECT_TIMES, DELAY);
    }

    function test(str) {
        if (window.TextEncoder) {
            return new TextEncoder('utf-8').encode(str);
        }
        var utf8 = unescape(encodeURIComponent(str));
        var result = new Uint8Array(utf8.length);
        for (var i = 0; i < utf8.length; i++) {
            result[i] = utf8.charCodeAt(i);
        }
        return result;
    }

    function test2(arr) {
        var arr = new Int8Array(arr);
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            str += String.fromCharCode(arr[i]);
        }
        return decodeURIComponent(escape(str));
    }

    Client.prototype.createConnect = function(max, delay) {
        var self = this;
        if (max === 0) {
            return;
        }
        connect();

        if (!IsPC() || IEVersion() == -1) {
            var textDecoder = new TextDecoder();
            var textEncoder = new TextEncoder();
        }
        var heartbeatInterval;

        function connect() {
            var ws = new WebSocket('wss://dm.leqiuba.com:8095/sub');
            ws.binaryType = 'arraybuffer';
            ws.onopen = function() {
                auth();
            }

            ws.onmessage = function(evt) {
                var data = evt.data;
                var dataView = new DataView(data, 0);
                var packetLen = dataView.getInt32(packetOffset);
                var headerLen = dataView.getInt16(headerOffset);
                var ver = dataView.getInt16(verOffset);
                var op = dataView.getInt32(opOffset);
                var seq = dataView.getInt32(seqOffset);

                // console.log("receiveHeader: packetLen=" + packetLen, "headerLen=" + headerLen, "ver=" + ver, "op=" + op, "seq=" + seq);

                switch (op) {
                    case 8:
                        // heartbeat
                        heartbeat();
                        heartbeatInterval = setInterval(heartbeat, 30 * 1000);
                        var text = '{"type":100}';
                        messageReceived('1', text);
                        break;
                    case 3:
                        // heartbeat reply
                        // console.log("receive: heartbeat");
                        break;
                    case 5:
                        // batch message
                        for (var offset = 0; offset < data.byteLength; offset += packetLen) {
                            // parse
                            var packetLen = dataView.getInt32(offset);
                            var headerLen = dataView.getInt16(offset + headerOffset);
                            var ver = dataView.getInt16(offset + verOffset);
                            if (!IsPC() || IEVersion() == -1) {
                                var msgBody = textDecoder.decode(data.slice(offset + headerLen, offset + packetLen));
                            } else {
                                var msgBody = test2(data.slice(offset + headerLen, offset + packetLen));
                            }

                            // callback
                            messageReceived(ver, msgBody);
                        }
                        break;
                }
            }

            ws.onclose = function() {
                if (heartbeatInterval) clearInterval(heartbeatInterval);
                setTimeout(reConnect, delay);
            }

            function heartbeat() {
                var headerBuf = new ArrayBuffer(rawHeaderLen);
                var headerView = new DataView(headerBuf, 0);
                headerView.setInt32(packetOffset, rawHeaderLen);
                headerView.setInt16(headerOffset, rawHeaderLen);
                headerView.setInt16(verOffset, 1);
                headerView.setInt32(opOffset, 2);
                headerView.setInt32(seqOffset, 1);
                ws.send(headerBuf);
                // console.log("send: heartbeat");
            }

            function getQueryVariable(variable) {
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == variable) {
                        return pair[1];
                    }
                }

            }

            function auth() {
                var room_id = $('#room_id').val()
                var user_id = ''
                var token = user_id + ',' + room_id; // userID
                var headerBuf = new ArrayBuffer(rawHeaderLen);
                var headerView = new DataView(headerBuf, 0);
                if (!IsPC() || IEVersion() == -1) {
                    var bodyBuf = textEncoder.encode(token);
                } else {
                    var bodyBuf = test(token);
                }
                headerView.setInt32(packetOffset, rawHeaderLen + bodyBuf.byteLength);
                headerView.setInt16(headerOffset, rawHeaderLen);
                headerView.setInt16(verOffset, 1);
                headerView.setInt32(opOffset, 7);
                headerView.setInt32(seqOffset, 1);
                // console.log(mergeArrayBuffer(headerBuf, bodyBuf));
                ws.send(mergeArrayBuffer(headerBuf, bodyBuf));

            }

            function messageReceived(ver, body) {
                var notify = self.options.notify;
                if (notify) notify(body);
                // console.log("messageReceived:", "ver=" + ver, "body=" + body);
            }

            function mergeArrayBuffer(ab1, ab2) {
                var u81 = new Uint8Array(ab1),
                    u82 = new Uint8Array(ab2),
                    res = new Uint8Array(ab1.byteLength + ab2.byteLength);
                res.set(u81, 0);
                res.set(u82, ab1.byteLength);
                return res.buffer;
            }

            function char2ab(str) {
                var buf = new ArrayBuffer(str.length);
                var bufView = new Uint8Array(buf);
                for (var i = 0; i < str.length; i++) {
                    bufView[i] = str[i];
                }
                return buf;
            }

        }

        function reConnect() {
            self.createConnect(--max, delay * 2);
        }
    }

    win['MyClient'] = Client;
})(window);

//判断手机还是PC
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

/*判断IE版本*/
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //不是ie浏览器
    }
}

if (IsPC()) {
    // var ws2 = new WebSocket("wss://www.qiushengke.com/wss");
    // ws2.onmessage = function (e) {
    //     if (e.data.indexOf('icon') > 0 || e.data.indexOf('type') > 0) {
    //         // json数据转换成js对象
    //         var data = JSON.parse(e.data);
    //         console.log('wm');
    //         console.log(data);
    //     }
    // }
    // ws2.send('{"type":"bind","userId":'+ userId +',"roomId":'+roomId+'}')
}


if (!ArrayBuffer.prototype.slice) {
    //Returns a new ArrayBuffer whose contents are a copy of this ArrayBuffer's
    //bytes from `begin`, inclusive, up to `end`, exclusive
    ArrayBuffer.prototype.slice = function(begin, end) {
        //If `begin` is unspecified, Chrome assumes 0, so we do the same
        if (begin === void 0) {
            begin = 0;
        }

        //If `end` is unspecified, the new ArrayBuffer contains all
        //bytes from `begin` to the end of this ArrayBuffer.
        if (end === void 0) {
            end = this.byteLength;
        }

        //Chrome converts the values to integers via flooring
        begin = Math.floor(begin);
        end = Math.floor(end);

        //If either `begin` or `end` is negative, it refers to an
        //index from the end of the array, as opposed to from the beginning.
        if (begin < 0) {
            begin += this.byteLength;
        }
        if (end < 0) {
            end += this.byteLength;
        }

        //The range specified by the `begin` and `end` values is clamped to the
        //valid index range for the current array.
        begin = Math.min(Math.max(0, begin), this.byteLength);
        end = Math.min(Math.max(0, end), this.byteLength);

        //If the computed length of the new ArrayBuffer would be negative, it
        //is clamped to zero.
        if (end - begin <= 0) {
            return new ArrayBuffer(0);
        }

        var result = new ArrayBuffer(end - begin);
        var resultBytes = new Uint8Array(result);
        var sourceBytes = new Uint8Array(this, begin, end - begin);

        resultBytes.set(sourceBytes);

        return result;
    };
}