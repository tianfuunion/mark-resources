$(function () {
    /**
     * =================== 树形列表 ===============
     * Mark TreeView JavaScript
     */
    var that = $('.treeview .tree-item.active[data-view="tree-item"][data-node="root"]');

    //文档宽度		-->		有待改善	！ ！ ！
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // 文档高度
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (width > 640 || true) {
        that.siblings(".treeview li[data-node='main'][data-parentid='" + that.data("selfid") + "']")
            .slideToggle(80)
            .end()
            .find('i.tree-left-more-icon')
            .toggleClass('tree-left-more-icon-rotate');
    }
    $('.treeview .tree-item[data-view="tree-item"]').on("click", function () {
        // $(this).find("i.tree-left-more-icon").toggleClass("am-icon-chevron-right").toggleClass("am-icon-chevron-down");

        var that = $(this);

        switch (that.data("node")) {
            case "root":
                if (that.hasClass("active")) {
                    that.siblings("li[data-node='main'][data-parentid='" + that.data("selfid") + "']")
                        .slideUp(80)
                        .removeClass("active")
                        .end()
                        .find('i.tree-left-more-icon')
                        .removeClass('tree-left-more-icon-rotate');
                    that.siblings("li[data-node='sub']")
                        .slideUp(80)
                        .removeClass("active")
                        .end()
                        .find('i.tree-left-more-icon')
                        .removeClass('tree-left-more-icon-rotate');
                    that.siblings("li[data-node='aux']")
                        .slideUp(80)
                        .removeClass("active")
                        .end()
                        .find('i.tree-left-more-icon')
                        .removeClass('tree-left-more-icon-rotate');
                } else {
                    that.siblings("li[data-node='main'][data-parentid='" + that.data("selfid") + "']")
                        // .addClass("active")
                        .slideToggle(80)
                        .end()
                        .find('i.tree-left-more-icon')
                        .toggleClass('tree-left-more-icon-rotate');
                }
                try {
                    if (typeof rootNodeCallback === "function") {
                        rootNodeCallback(this);
                    } else {
                        // console.error("rootNodeCallback not is function");
                    }
                } catch (e) {
                    console.error(e);
                }
                break;
            case "main":
                that.siblings("li[data-node='sub'][data-parentid='" + that.data("selfid") + "']")
                    .toggleClass('active')
                    .slideToggle(80)
                    .end()
                    .find('i.tree-left-more-icon')
                    .toggleClass('tree-left-more-icon-rotate');
                try {
                    if (typeof mainNodeCallback === "function") {
                        mainNodeCallback(this);
                    } else {
                        // console.info("mainNodeCallback not is function");
                    }
                } catch (e) {
                    console.error(e);
                }
                break;
            case "sub":
                that.siblings("li[data-node='aux'][data-parentid='" + that.data("selfid") + "']")
                    .toggleClass('active')
                    .slideToggle(80)
                    .end()
                    .find('i.tree-left-more-icon')
                    .toggleClass('tree-left-more-icon-rotate');
                try {
                    if (typeof subNodeCallback === "function") {
                        subNodeCallback(this);
                    } else {
                        // console.info("subNodeCallback not is function");
                    }
                } catch (e) {
                    console.error(e);
                }
                break;
            case "aux":
                try {
                    if (typeof auxNodeCallback === "function") {
                        auxNodeCallback(this);
                    } else {
                        // console.info("auxNodeCallback not is function");
                    }
                } catch (e) {
                    console.error(e);
                }
                break;
            default:

                break;
        }
        that.toggleClass('active');
    });
    /** Mark TreeView End **/
});