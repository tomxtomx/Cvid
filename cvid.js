(function(){
    function Cvid(selector, params){


        /*
        播放器设置
        autoplay - 播放器是否自动播放 - boolean - 选填
        sizing - 播放器尺寸 - string - 选填
        position - 视频相对播放器位置 - object - 选填
        */
        var autoplay = params ? params.autoplay ? params.autoplay : false : null;
        var sizing = params ? params.sizing ? params.sizing : 'auto' : null;
        var position = params ? params.position ? params.position : { horizontal: 'center', vertical: 'center'} : null;
        

        /*
        视频源
        params.source - 
        示例：source: [ {src: 'source/myvideo.jpg', width: 375, height: 214, frames: 50, loops: 0} ]
        参数说明：
            src - 视频源路径 - string - 必填 
            width -视频源宽度 - number - 必填
            height - 视频源高度 - number - 必填
            frames - 视频源总帧数 - number - 必填
            fps - 视频播放帧率 - number - 必填
            loops - 视频是否循环 - boolean - 选填
            onComplete - 视频结束回调 - function - 选填
        */
        var source = params ? params.source ? params.source : [] : null;


        // loading动画gif(base64)
        var loadingGifData = 'data:image/gif;base64,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';
        

        var imagelist = []
        , container = document.querySelector(selector)
        , canvas = null
        , ctx = null
        , checkSizeTimer = null
        , checkSizeInterval = 250
        , containerSize = { width: 0, height: 0 }
        , currentFrame = 0
        , playIndex = 0
        , setting = null
        , inteval = 0
        , loops = 0
        , vrow = 0
        , vcol = 0
        , isLandscape = null // 设备是否横屏
        , timer = null
        , status = null // -1：停止、 0：暂停、 1：播放中
        , loading = null
        , pauseBtn = null;


        // --------------------初始化--------------------
        function cssInit(){
            var body = document.getElementsByTagName('body')[0];
            var style = document.createElement('style');
            style.innerHTML = '@keyframes opacityshow{ from{opacity:0;} to{opacity:1;} }';
            body.appendChild(style);
        }
        function canvasInit(){
            canvas = document.createElement('canvas');
            canvas.style['user-select'] = canvas.style['-webkit-user-select'] = 'none';
            ctx = canvas.getContext('2d');
        }
        function containerInit(){
            container.style.position = "relative";
            container.appendChild(canvas);
            var clickHandler = function(e){
                if(status === 1){
                    pause(); 
                    pauseBtn.show();
                }else if(status === 0){
                    play(); 
                    pauseBtn.hide();
                }
                return false;
            }
            container.ontouchend = clickHandler;
            container.onclick = clickHandler;
        }
        


        // --------------------容器操作--------------------
       
        // 检查是否需要重置尺寸
        function checkResize(){
            checkSizeTimer = setInterval(function(){
                if(containerSize.width !== container.clientWidth || containerSize.height !== container.clientHeight) {
                    resize();
                    reposition();
                }
            }, checkSizeInterval);
        }
        // 重置位置
        function reposition(){
            // console.log(position);
            switch(position.horizontal){
                case 'left':
                    canvas.style.float = 'left';
                break;
                case 'center':
                    canvas.style.float = 'none';
                    canvas.style['margin-left'] = (container.clientWidth - canvas.clientWidth) / 2 + 'px';
                break;
                case 'right':
                    canvas.style.float = 'right';
                break;
            }
            switch(position.vertical){
                case 'top':
                    canvas.style['margin-top'] = '0px';
                break;
                case 'center':
                    canvas.style['margin-top'] = (container.clientHeight - canvas.clientHeight) / 2 + 'px';
                break;
                case 'bottom':
                    canvas.style['margin-top'] = (container.clientHeight - canvas.clientHeight) + 'px';
                break;
            }
        }
        // 重置尺寸
        function resize(){
            // 按设定动态调整画布尺寸
            switch(sizing){
                case 'full':
                    canvas.style.width = container.clientWidth + 'px';
                    canvas.style.height = container.clientHeight + 'px';
                break;
                case 'auto':
                    var scaleX = container.clientWidth / setting.width;
                    var scaleY = container.clientHeight / setting.height;
                    var scale = (container.clientWidth >= container.clientHeight) ? scaleY : scaleX;
                    // console.log(scale);
                    canvas.style.width = setting.width * scale + 'px';
                    canvas.style.height = setting.height * scale + 'px';
                break;
                case 'normal ':
                break;
            }
            // 记录屏幕尺寸
            containerSize.width = container.clientWidth;
            containerSize.height = container.clientHeight;
        }
        // 检查是否横屏
        function checkLandscape(){
            isLandscape = window.innerWidth > window.innerHeight;
        }


        // --------------------视频操作--------------------
        // 刷新画布
        function refresh(){
            // console.log('playIndex:' + playIndex + ', currentFrame:' + currentFrame + ', vcol:' + vcol);
            var image = imagelist[playIndex];
            var sx = setting.width * vcol // 开始剪切的 x 坐标位置
            , sy = setting.height * vrow // 开始剪切的 y 坐标位置
            , swidth = setting.width // 被剪切图像的宽度
            , sheight = setting.height // 被剪切图像的高度
            , x = 0 // 在画布上放置图像的 x 坐标位置 
            , y = 0 // 在画布上放置图像的 y 坐标位置
            , width = setting.width // 要使用的图像的宽度
            , height = setting.height; // 要使用的图像的高度
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); // 清除ctx内容
            ctx.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);

            currentFrame++;
            if(currentFrame >= setting.frames) { videoComplete(); return; } // 判断是否播放完成
            vcol++;
            if((setting.width * vcol) >= image.width) { vcol=0; vrow++; } // 判断资源头是否需要换行
            
        }
        // 视频播放中
        function videoProgress(){}
        // 视频播放完成
        function videoComplete(){
            vrow = vcol = 0; // 重置资源头
            currentFrame = 0; // 重置播放头
            pause(); // 暂停视频

            // 判断是否循环播放
            if(loops > 0){ loops--; play(); return; }
            // 判断是否有下一个视频
            if(playIndex < source.length-1) next();
        }
        // 当前视频设置
        function videoSet(){
            setting = source[playIndex]; 
            inteval = 1000 / setting.fps;
            loops = setting.loops;
        }
        // 播放
        function play(){
            timer = setInterval(function(){ refresh(); }, inteval);
            status = 1;
        }
        // 暂停
        function pause(){
            clearInterval(timer);
            timer = null;
            status = 0;
        }
        // 停止
        function stop(){
            status = -1;
        }
        // 播放下一个视频
        function next(){
            playIndex++;
            loadSource();
        }

        // --------------------皮肤--------------------
        // 
        function Skin(){
            this.skin = null;
            this.show = function(){
                container.appendChild(this.skin);
            }
            this.hide = function(){
                var nodes = container.childNodes;
                for(var key in nodes){
                    if(nodes[key] === this.skin) container.removeChild(this.skin);
                }
            }
        }
        // loading
        function Loading(){
            Skin.call(this);
            this.skin = new Image();
            this.skin.src = loadingGifData;
            this.skin.style.position = 'absolute';
            this.skin.style.left = (container.clientWidth - this.skin.width) / 2 + 'px';
            this.skin.style.top = (container.clientHeight - this.skin.height) / 2 + 'px';
            return this;
        }
        // pauseBtn
        function PauseBtn(){
            Skin.call(this);
            this.skin = document.createElement('span');
            this.skin.innerHTML = '▶';
            this.skin.style.fontSize = '50px';
            this.skin.style.lineHeight = '45px';
            this.skin.style.cursor = 'pointer';
            this.skin.style.width = this.skin.style.height = '50px';
            this.skin.style.position = 'absolute';
            this.skin.style.display = 'inline-block';
            this.skin.style.color = 'rgba(255,255,255,0.85)';
            this.skin.style.border = '5px solid rgba(255,255,255,0.85)';
            this.skin.style.animation = 'opacityshow 0.25s forwards';
            this.skin.style['border-radius'] = '50%';
            this.skin.style['text-indent'] = '7px';
            this.skin.style['user-select'] = this.skin.style['-webkit-user-select'] = 'none';
            this.skin.style.left = (container.clientWidth - 50) / 2 + 'px';
            this.skin.style.top = (container.clientHeight - 50) / 2 + 'px';
            return this;
        }


        // --------------------资源加载--------------------
        // 加载资源
        function loadSource(callback){
            loading.show(); // 显示加载
            if(imagelist[playIndex]){
                sourceCompleted();
            }else{
                 var url = source[playIndex].src;
                if(!url.search(/.jpg|.png|.bmp|.gif/)) return; // 判断是否图像格式
                var image = new Image();
                imagelist.push(image);
                image.onload = sourceCompleted;
                image.src = url;
            }
        }
        // 加载资源成功
        function sourceCompleted(){
            setTimeout(function(){
                loading.hide(); // 隐藏加载
                if(autoplay) { videoSet(); resize(); reposition(); play(); } // 判断是否自动播放
            }, 1000);
        }


        // --------------------初始化--------------------
        function init(){
            // 初始化基础元素
            loading = new Loading();
            pauseBtn = new PauseBtn();
            // 初始化样式
            cssInit();
            // 初始化canvas
            canvasInit();
            // 初始化container
            containerInit();
            // 判断是否横屏
            // checkLandscape();
            // 判断是否需要重置尺寸
            checkResize();
            // 获取视频设定
            setting = source[playIndex]; 
            // 加载资源
            if(source) loadSource();
        }
        init();

        this.stop = stop;
        this.pause = pause;
        this.play = play;
        this.status = status;
        return this;
    }

    window.Cvid = Cvid;
})()