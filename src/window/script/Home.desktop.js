/*
**  桌面
*/
Home.deskTop = (function () {
    return {
        init: function () {
            //绑定浏览器resize事件
            $(window).on('resize', function () {
                Home.deskTop.resize();
            });
            $('body').on('click', '#desktop', function () {
                Home.popupMenu.hide();
//				Home.folderView.hide();
//				Home.searchbar.hide();
                Home.startmenu.hide();
            }).on('contextmenu', '#desktop', function (e) {
                Home.popupMenu.hide();
//				Home.folderView.hide();
//				Home.searchbar.hide();
                Home.startmenu.hide();
                var popupmenu = Home.popupMenu.desk();
                var l = ($(window).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
                var t = ($(window).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
                popupmenu.css({
                    left: l,
                    top: t
                }).show();
                return false;
            });
        },
        /*
        * 处理浏览器改变大小后的事件
        *
         * @param time
         */
        resize: function (time) {
            //使用doTimeout插件，防止出现resize两次的bug
            $.doTimeout('resize', time, function () {
                console.log();
                if ($('#desktop').css('display') !== 'none') {
                    // 更新码头位置
                    // Home.dock.setPos();
                    // 更新图标定位
                    // Home.deskTop.appresize();
                    // 更新窗口定位
                    // Home.deskTop.windowresize();
                    // 更新滚动条
                    Home.app.getScrollbar();
                } else {
                    Home.appmanage.resize();
                }
                Home.wallpaper.set(false);
            });
        },
        /*
        **  重新排列图标
        */
        appresize: function () {
            var grid = Home.grid.getAppGrid(), dockGrid = Home.grid.getDockAppGrid();
            $('#dock-bar .dock-applist li').each(function (i) {
                $(this).animate({
                    'left': dockGrid[i]['startX'],
                    'top': dockGrid[i]['startY']
                }, 500);
            });
            for (var j = 1; j <= 5; j++) {
                $('#desk-' + j + ' li').each(function (i) {
                    $(this).animate({
                        'left': grid[i]['startX'] + 16,
                        'top': grid[i]['startY'] + 7
                    }, 500);
                });
            }
        },
        /*
        **  重新定位窗口位置
        */
        windowresize: function () {
            $('#desktop div.window-container').each(function () {
                var windowdata = $(this).data('info');
                currentW = $(window).width() - $(this).width();
                currentH = $(window).height() - $(this).height();
                _l = windowdata['left'] / windowdata['emptyW'] * currentW >= currentW ? currentW : windowdata['left'] / windowdata['emptyW'] * currentW;
                _l = _l <= 0 ? 0 : _l;
                _t = windowdata['top'] / windowdata['emptyH'] * currentH >= currentH ? currentH : windowdata['top'] / windowdata['emptyH'] * currentH;
                _t = _t <= 0 ? 0 : _t;
                $(this).animate({
                    'left': _l,
                    'top': _t
                }, 500);
            });
        }
    }
})();